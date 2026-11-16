import { afterEach, describe, expect, it, vi } from "vitest";
import worker from "./index";
import cards from "./cards.json";
import { localeDecks } from "../../src/locales/sv/decks";

const deck = Object.values(localeDecks)[0];
const [id, text] = Object.entries(deck.cards)[0];
const env = () => ({
  TURNSTILE_SECRET: "test", RESEND_API_KEY: "test", PLAUSIBLE_API_KEY: "test",
  MAIL_TO: "test@example.com", MAIL_FROM: "test@example.com", PLAUSIBLE_HOST: "https://example.com",
  FLAG_LIMIT: { limit: vi.fn().mockResolvedValue({ success: true }) },
});
const request = (body: unknown = {}, query = "?sprog=sv", host = "goodtalkcards.com") =>
  new Request(`https://${host}/api/flag${query}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, aarsag: "stavefejl", token: "test", ...body as object }),
  });
const run = (req: Request, bindings = env()) => worker.fetch(req, bindings, {} as ExecutionContext);
afterEach(() => vi.unstubAllGlobals());

describe("card report language", () => {
  it("exports the actual Swedish card and deck and includes them in the mail", async () => {
    expect(cards[id].l.sv).toEqual({ t: text, c: deck.name });
    const fetch = vi.fn()
      .mockResolvedValueOnce(Response.json({ success: true, hostname: "localhost" }))
      .mockResolvedValueOnce(Response.json({ id: "mail" }));
    vi.stubGlobal("fetch", fetch);
    expect((await run(request({ sprog: "sv" }))).status).toBe(200);
    const mail = JSON.parse(fetch.mock.calls[1][1].body);
    expect(mail.subject).toContain("Pratspel");
    expect(mail.html).toContain(text);
    expect(mail.html).toContain(deck.name);
  });

  it("localizes rate limiting before reading the body", async () => {
    const bindings = env();
    bindings.FLAG_LIMIT.limit.mockResolvedValue({ success: false });
    const response = await run(request(), bindings);
    expect(response.status).toBe(429);
    expect(await response.json()).toEqual({ fejl: "För många rapporter just nu. Försök igen om en stund." });
  });

  it("localizes oversized and malformed requests", async () => {
    for (const [body, status, fejl] of [
      ["x".repeat(4001), 413, "Meddelandet är för långt."],
      ["{", 400, "Ogiltig förfrågan."],
      ["null", 400, "Ogiltig förfrågan."],
      ["[]", 400, "Ogiltig förfrågan."],
    ] as const) {
      const response = await run(new Request("https://goodtalkcards.com/api/flag?sprog=sv", { method: "POST", body }));
      expect(response.status).toBe(status);
      expect(await response.json()).toEqual({ fejl });
    }
  });

  it("localizes an oversized Content-Length before reading the body", async () => {
    const req = request();
    req.headers.set("Content-Length", "4001");
    const response = await run(req);
    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ fejl: "Meddelandet är för långt." });
  });

  it.each([
    [{ id: "unknown" }, 400, "Okänt kort eller orsak."],
    [{ aarsag: "unknown" }, 400, "Okänt kort eller orsak."],
    [{ kommentar: "x".repeat(301) }, 400, "Kommentaren får vara högst 300 tecken."],
    [{ kommentar: "https://example.com" }, 400, "Kommentaren får inte innehålla länkar."],
    [{ token: "" }, 403, "Vi kunde inte bekräfta att du är en människa. Försök igen."],
  ])("localizes validation errors for %j", async (body, status, fejl) => {
    const response = await run(request(body));
    expect(response.status).toBe(status);
    expect(await response.json()).toEqual({ fejl });
  });

  it("localizes a rejected mail delivery", async () => {
    vi.stubGlobal("fetch", vi.fn()
      .mockResolvedValueOnce(Response.json({ success: true, hostname: "localhost" }))
      .mockResolvedValueOnce(new Response(null, { status: 503 })));
    const response = await run(request());
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ fejl: "Rapporten kunde inte skickas. Försök igen senare." });
  });

  it("localizes unexpected upstream errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const response = await run(request());
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ fejl: "Något gick fel. Försök igen senare." });
  });

  it("still accepts the body locale from older apps", async () => {
    const response = await run(request({ sprog: "sv", token: "" }, ""));
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ fejl: "Vi kunde inte bekräfta att du är en människa. Försök igen." });
  });

  it.each(["", "?sprog=xx", "?sprog=constructor"])("keeps English fallback for %s", async (query) => {
    const response = await run(request({ token: "" }, query));
    expect(await response.json()).toEqual({ fejl: "We couldn't confirm that you're human. Please try again." });
  });

  it("keeps the Danish website in Danish", async () => {
    const response = await run(request({ token: "" }, "?sprog=sv", "snakkespil.dk"));
    expect(await response.json()).toEqual({ fejl: "Vi kunne ikke bekræfte, at du er et menneske. Prøv igen." });
  });
});
