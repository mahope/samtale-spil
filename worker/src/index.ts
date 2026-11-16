/**
 * snakkespil-api: a small Cloudflare Worker on snakkespil.dk/api/* and goodtalkcards.com/api/*.
 * The host decides the language of replies and which Plausible site the stats come from.
 *
 * POST /api/flag   a player reports a card; mails Mads via Resend.
 *                  Spam protection: Turnstile, honeypot, rate limit per IP,
 *                  only known card ids, fixed reasons, short comment without links.
 * GET  /api/stats  public totals from Plausible, cached for an hour, so the
 *                  Plausible key never reaches the browser.
 *
 * Nothing about the player is stored. The IP is only used by the rate limiter.
 */
import cards from "./cards.json";

interface Env {
  TURNSTILE_SECRET: string;
  RESEND_API_KEY: string;
  PLAUSIBLE_API_KEY: string;
  FLAG_LIMIT: RateLimit;
  MAIL_TO: string;
  MAIL_FROM: string;
  PLAUSIBLE_HOST: string;
}

interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

/**
 * t/c: Danish text and deck; e/ce: English text and deck on Goodtalk, when it has the card;
 * l: text and deck per app-only language (Pratspel = sv, Pratespill = nb, Plauderspiel = de), which reports on goodtalkcards.com name with `sprog`
 */
type Card = { t: string; c: string; d: string; a?: 1; e?: string; ce?: string; l?: Record<string, { t: string; c: string }> };
const CARDS = cards as Record<string, Card>;
const DECK_IDS = new Set(Object.values(CARDS).map((c) => c.d));
/** Decks Goodtalk shows: those with English cards */
const DECK_IDS_EN = new Set(Object.values(CARDS).filter((c) => c.e).map((c) => c.d));
/** 18+ decks (web and app) never show up in the public stats */
const ADULT_DECKS = new Set(Object.values(CARDS).filter((c) => c.a).map((c) => c.d));
const cardFor = (id: string): Card | undefined => (Object.hasOwn(CARDS, id) ? CARDS[id] : undefined);

const REASONS: Record<string, string> = {
  stavefejl: "Stavefejl eller sprog",
  upassende: "Upassende eller sårende",
  dublet: "Dublet af et andet kort",
  dybde: "Forkert dybde",
  forslag: "Forslag til en bedre formulering",
  andet: "Andet",
};

type Site = "da" | "en";
const siteOf = (request: Request): Site => (new URL(request.url).hostname === "goodtalkcards.com" ? "en" : "da");
const PLAUSIBLE_SITE: Record<Site, string> = { da: "snakkespil.dk", en: "goodtalkcards.com" };

const TEXT = {
  da: {
    tooMany: "For mange rapporter lige nu. Prøv igen om lidt.",
    tooBig: "For stor besked.",
    invalid: "Ugyldig forespørgsel.",
    unknown: "Ukendt kort eller årsag.",
    tooLong: "Kommentaren må højst være 300 tegn.",
    links: "Kommentaren må ikke indeholde links.",
    human: "Vi kunne ikke bekræfte, at du er et menneske. Prøv igen.",
    sendFailed: "Rapporten kunne ikke sendes. Prøv igen senere.",
    statsFailed: "Tallene kunne ikke hentes lige nu.",
    error: "Noget gik galt. Prøv igen senere.",
    notFound: "Findes ikke.",
  },
  en: {
    tooMany: "Too many reports right now. Please try again in a moment.",
    tooBig: "That message is too long.",
    invalid: "Invalid request.",
    unknown: "Unknown card or reason.",
    tooLong: "The comment can be at most 300 characters.",
    links: "The comment can't contain links.",
    human: "We couldn't confirm that you're human. Please try again.",
    sendFailed: "The report could not be sent. Please try again later.",
    statsFailed: "The numbers could not be loaded right now.",
    error: "Something went wrong. Please try again later.",
    notFound: "Not found.",
  },
  sv: {
    tooMany: "För många rapporter just nu. Försök igen om en stund.",
    tooBig: "Meddelandet är för långt.",
    invalid: "Ogiltig förfrågan.",
    unknown: "Okänt kort eller orsak.",
    tooLong: "Kommentaren får vara högst 300 tecken.",
    links: "Kommentaren får inte innehålla länkar.",
    human: "Vi kunde inte bekräfta att du är en människa. Försök igen.",
    sendFailed: "Rapporten kunde inte skickas. Försök igen senare.",
    statsFailed: "Siffrorna kunde inte hämtas just nu.",
    error: "Något gick fel. Försök igen senare.",
    notFound: "Hittades inte.",
  },
  nb: {
    tooMany: "For mange rapporter akkurat nå. Prøv igjen om litt.",
    tooBig: "Meldingen er for lang.",
    invalid: "Ugyldig forespørsel.",
    unknown: "Ukjent kort eller årsak.",
    tooLong: "Kommentaren kan være på høyst 300 tegn.",
    links: "Kommentaren kan ikke inneholde lenker.",
    human: "Vi kunne ikke bekrefte at du er et menneske. Prøv igjen.",
    sendFailed: "Rapporten kunne ikke sendes. Prøv igjen senere.",
    statsFailed: "Tallene kunne ikke hentes akkurat nå.",
    error: "Noe gikk galt. Prøv igjen senere.",
    notFound: "Finnes ikke.",
  },
  de: {
    tooMany: "Gerade kommen zu viele Meldungen. Versuch es gleich noch einmal.",
    tooBig: "Die Nachricht ist zu lang.",
    invalid: "Ungültige Anfrage.",
    unknown: "Unbekannte Karte oder unbekannter Grund.",
    tooLong: "Der Kommentar darf höchstens 300 Zeichen lang sein.",
    links: "Der Kommentar darf keine Links enthalten.",
    human: "Wir konnten nicht bestätigen, dass du ein Mensch bist. Versuch es noch einmal.",
    sendFailed: "Die Meldung konnte nicht gesendet werden. Versuch es später noch einmal.",
    statsFailed: "Die Zahlen konnten gerade nicht geladen werden.",
    error: "Etwas ist schiefgelaufen. Versuch es später noch einmal.",
    notFound: "Nicht gefunden.",
  },
};

/** App-only languages (no website of their own): their reports go to goodtalkcards.com with `sprog` */
type AppLang = "sv" | "nb" | "de";
const APP_LANGS: Record<AppLang, { brand: string; name: string }> = {
  sv: { brand: "Pratspel", name: "Svensk" },
  nb: { brand: "Pratespill", name: "Norsk" },
  de: { brand: "Plauderspiel", name: "Tysk" },
};
const appLangOf = (value: unknown): AppLang | undefined =>
  typeof value === "string" && Object.hasOwn(APP_LANGS, value) ? (value as AppLang) : undefined;

const ALLOWED_ORIGINS = new Set([
  "https://snakkespil.dk",
  "https://goodtalkcards.com",
  "capacitor://localhost", // iOS app
  "https://localhost", // Android app
]);

// Hostnames Turnstile may report for a solved challenge: the site and the apps
const TURNSTILE_HOSTS = new Set(["snakkespil.dk", "goodtalkcards.com", "localhost"]);

function cors(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin") ?? "";
  return ALLOWED_ORIGINS.has(origin)
    ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", Vary: "Origin" }
    : {};
}

function json(request: Request, status: number, body: unknown, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...cors(request), ...extra },
  });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function verifyTurnstile(token: string, ip: string, secret: string) {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const data = (await res.json()) as { success: boolean; hostname?: string };
  return data.success === true && TURNSTILE_HOSTS.has(data.hostname ?? "");
}

async function handleFlag(request: Request, env: Env): Promise<Response> {
  const site = siteOf(request);
  let T = TEXT[site];
  const ip = request.headers.get("CF-Connecting-IP") ?? "";
  const { success: underLimit } = await env.FLAG_LIMIT.limit({ key: ip || "ukendt" });
  if (!underLimit) return json(request, 429, { fejl: T.tooMany });

  if (Number(request.headers.get("Content-Length") ?? 0) > 4000) return json(request, 413, { fejl: T.tooBig });
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 4000) return json(request, 413, { fejl: T.tooBig });
    body = JSON.parse(raw);
  } catch {
    return json(request, 400, { fejl: T.invalid });
  }

  // Only on goodtalkcards.com: the app-only languages share its worker and card ids
  const lang = site === "en" ? appLangOf(body.sprog) : undefined;
  if (lang) T = TEXT[lang];

  // Honeypot: a hidden field real people never fill in. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") return json(request, 200, { ok: true });

  const id = typeof body.id === "string" ? body.id : "";
  const reason = typeof body.aarsag === "string" ? body.aarsag : "";
  const comment = typeof body.kommentar === "string" ? body.kommentar.trim() : "";
  const token = typeof body.token === "string" ? body.token : "";
  const card = cardFor(id);

  const local = lang ? card?.l?.[lang] : undefined;
  if (!card || !REASONS[reason] || (site === "en" && !card.e) || (lang && !local)) return json(request, 400, { fejl: T.unknown });
  if (comment.length > 300) return json(request, 400, { fejl: T.tooLong });
  if (/https?:\/\/|www\.|\b[a-z0-9-]+\.(dk|com|net|org|io|ru|xyz|info|biz|top|site|online|shop|app|me|co|eu|de|se|no|uk)\b/i.test(comment)) return json(request, 400, { fejl: T.links });
  if (!token || !(await verifyTurnstile(token, ip, env.TURNSTILE_SECRET))) {
    return json(request, 403, { fejl: T.human });
  }

  const brand = lang ? APP_LANGS[lang].brand : site === "en" ? "Goodtalk" : "Snakkespil";
  const subject = `${brand}: ${REASONS[reason].toLowerCase()} (${id})`;
  const html = `<p><strong>Kort:</strong> ${escapeHtml(id)} i bunken ${escapeHtml(site === "en" ? `${card.ce} (dansk: ${card.c})` : card.c)}</p>
${local ? `<p><strong>${APP_LANGS[lang!].name} tekst:</strong> ${escapeHtml(local.t)} (bunken ${escapeHtml(local.c)})</p>\n` : ""}${site === "en" ? `<p><strong>Engelsk tekst:</strong> ${escapeHtml(card.e ?? "")}</p>\n` : ""}<p><strong>${site === "en" ? "Dansk tekst" : "Tekst"}:</strong> ${escapeHtml(card.t)}</p>
<p><strong>Årsag:</strong> ${escapeHtml(REASONS[reason])}</p>
${comment ? `<p><strong>Kommentar:</strong> ${escapeHtml(comment)}</p>` : "<p>Ingen kommentar.</p>"}
<p style="color:#666">Sendt fra rapportér-knappen på ${lang ? `${brand} i appen` : site === "en" ? "goodtalkcards.com" : "snakkespil.dk"}. Afsenderen er anonym.</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.MAIL_FROM, to: [env.MAIL_TO], subject, html }),
  });
  if (!res.ok) return json(request, 502, { fejl: T.sendFailed });
  return json(request, 200, { ok: true });
}

interface PlausibleRow {
  dimensions: string[];
  metrics: number[];
}

async function plausible(env: Env, siteId: string, query: Record<string, unknown>): Promise<PlausibleRow[]> {
  const res = await fetch(`${env.PLAUSIBLE_HOST}/api/v2/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.PLAUSIBLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ site_id: siteId, ...query }),
  });
  if (!res.ok) throw new Error(`plausible ${res.status}`);
  return ((await res.json()) as { results: PlausibleRow[] }).results;
}

const statsKey = (site: Site) => new Request(`https://${PLAUSIBLE_SITE[site]}/api/stats?v=1`);

async function handleStats(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const site = siteOf(request);
  const siteId = PLAUSIBLE_SITE[site];
  const cache = caches.default;
  const key = statsKey(site);
  const hit = await cache.match(key);
  if (hit) {
    const r = new Response(hit.body, hit);
    for (const [k, v] of Object.entries(cors(request))) r.headers.set(k, v);
    return r;
  }

  // Plausible's "30d" ends yesterday; an explicit range includes today
  const day = (d: Date) => d.toISOString().slice(0, 10);
  const today = new Date();
  const range = [day(new Date(today.getTime() - 29 * 86_400_000)), day(today)];
  const goal = (name: string) => [["is", "event:goal", [name]]];
  const [totals, perDeck, topCards, perDay, flipped] = await Promise.all([
    plausible(env, siteId, { metrics: ["visitors", "pageviews"], date_range: range }),
    plausible(env, siteId, { metrics: ["events"], date_range: range, filters: goal("Spil startet"), dimensions: ["event:props:kategori"] }),
    plausible(env, siteId, { metrics: ["events"], date_range: range, filters: goal("Kort vendt"), dimensions: ["event:props:kort"], pagination: { limit: 40 } }),
    plausible(env, siteId, { metrics: ["events"], date_range: range, filters: goal("Spil startet"), dimensions: ["time:day"] }),
    plausible(env, siteId, { metrics: ["events"], date_range: range, filters: goal("Kort vendt") }),
  ]);

  const body = {
    periode: site === "en" ? "30 days" : "30 dage",
    opdateret: new Date().toISOString(),
    besoegende: totals[0]?.metrics[0] ?? 0,
    sidevisninger: totals[0]?.metrics[1] ?? 0,
    spilStartet: perDeck.reduce((s, r) => s + r.metrics[0], 0),
    kortVendt: flipped[0]?.metrics[0] ?? 0,
    // Event props can be sent by anyone, so only known decks and cards are shown
    bunker: perDeck
      .filter((r) => (site === "en" ? DECK_IDS_EN : DECK_IDS).has(r.dimensions[0]) && !ADULT_DECKS.has(r.dimensions[0]))
      .map((r) => ({ id: r.dimensions[0], spil: r.metrics[0] }))
      .sort((a, b) => b.spil - a.spil),
    kort: topCards
      .filter((r) => cardFor(r.dimensions[0]) && !cardFor(r.dimensions[0])!.a && (site === "da" || cardFor(r.dimensions[0])!.e))
      .slice(0, 15)
      .map((r) => {
        const c = cardFor(r.dimensions[0])!;
        return { id: r.dimensions[0], tekst: site === "en" ? c.e! : c.t, bunke: site === "en" ? c.ce! : c.c, vendt: r.metrics[0] };
      }),
    perDag: perDay.map((r) => ({ dato: r.dimensions[0], spil: r.metrics[0] })),
  };

  const response = new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
  ctx.waitUntil(cache.put(key, response.clone()));
  const out = new Response(response.body, response);
  for (const [k, v] of Object.entries(cors(request))) out.headers.set(k, v);
  return out;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(request) });
    try {
      if (url.pathname === "/api/flag" && request.method === "POST") return await handleFlag(request, env);
      if (url.pathname === "/api/stats" && request.method === "GET") {
        try {
          return await handleStats(request, env, ctx);
        } catch {
          // cache the failure for a minute, so an outage upstream does not multiply calls
          const r = json(request, 503, { fejl: TEXT[siteOf(request)].statsFailed }, { "Cache-Control": "public, max-age=60" });
          ctx.waitUntil(caches.default.put(statsKey(siteOf(request)), r.clone()));
          return r;
        }
      }
    } catch {
      return json(request, 500, { fejl: TEXT[siteOf(request)].error });
    }
    return json(request, 404, { fejl: TEXT[siteOf(request)].notFound });
  },
};
