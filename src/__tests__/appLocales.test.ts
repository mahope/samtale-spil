import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { APP_LOCALES, APP_LOCALE_CODES, assertBuildLocale, FALLBACK_APP_LOCALE, WEB_LOCALE_CODES } from "@/locales/appLocales";
import { homeLanguages, SITES } from "@/locales/sites";
import { categories } from "@/data/categories";
import { legeSider } from "@/data/lege";
import { ui as daUi } from "@/locales/da/ui";
import type { AppLocaleDeck, AppLocaleGamePage } from "@/locales/types";

/**
 * Every language of the Snakkespil app (src/locales/appLocales.ts): the same decks, card ids,
 * games and screens as English, no empty or leftover text, a home screen name on both platforms,
 * and no website for the app-only languages.
 */
const ROOT = join(__dirname, "../..");
const INTL = APP_LOCALES.filter((l) => l.code !== "da");
const OTHERS = INTL.filter((l) => l.code !== "en");

interface Locale {
  decks: Record<string, AppLocaleDeck>;
  games: Record<string, AppLocaleGamePage>;
  marks: Record<string, string>;
  year: Record<string, string>;
  followUps: string[];
  screens: Record<string, unknown>;
  ui: Record<string, unknown>;
}

async function load(code: string): Promise<Locale> {
  const dir = `../locales/${code}`;
  const [decks, games, marks, year, followUps, screens, ui] = await Promise.all([
    import(`${dir}/decks/index.ts`),
    import(`${dir}/games.ts`),
    import(`${dir}/marks.ts`),
    import(`${dir}/aaret.ts`),
    import(`${dir}/followUps.ts`),
    import(`${dir}/screens.ts`),
    import(`${dir}/ui.ts`),
  ]);
  return {
    decks: decks.localeDecks,
    games: games.localeGames,
    marks: marks.deckMarks,
    year: year.yearInReview,
    followUps: followUps.followUps,
    screens: screens.screens,
    ui: ui.ui,
  };
}

const locales = new Map(await Promise.all(INTL.map(async (l) => [l.code, await load(l.code)] as const)));
const en = locales.get("en")!;

/** Key paths of an object, functions and arrays as leaves */
const keys = (o: object, prefix = ""): string[] =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]));

/** Every human-readable string in a value; functions are called with sample arguments */
function strings(v: unknown): string[] {
  if (typeof v === "string") return [v];
  if (typeof v === "function") return strings(v(...Array.from({ length: v.length }, (_, i) => (i === 0 ? "Alice" : 2))));
  if (Array.isArray(v)) return v.flatMap(strings);
  if (v && typeof v === "object") return Object.values(v).flatMap(strings);
  return [];
}

/** Code, not text: paths, locale tags and ids in ui/screens */
const NOT_TEXT = /^(\/[a-z/-]*|[a-z]{2}(-[A-Z]{2})?|[A-Za-z]{2}_[A-Z]{2})$/;

/** Every text a language shows in the app */
function texts(l: Locale): string[] {
  return [
    ...Object.values(l.decks).flatMap((d) => [d.name, d.description, ...Object.values(d.cards)]),
    ...Object.values(l.games).flatMap((g) => [g.h1, g.intro, ...g.lege.flatMap((x) => [x.navn, x.antal, x.tid, x.alder, ...x.saadan, ...(x.variant === undefined ? [] : [x.variant])]), ...Object.values(g.kort)]),
    ...Object.values(l.year),
    ...l.followUps,
    ...strings(l.screens),
    ...strings(l.ui),
  ].filter((t) => !NOT_TEXT.test(t));
}

const word = (alternatives: string) => new RegExp(`(?<!\\p{L})(?:${alternatives})(?!\\p{L})`, "iu");
// Simple leftovers checks: words that only English or only Danish has. Norwegian (phase 2) shares the
// Danish words and letters, so it gets its own list there.
const ENGLISH = word("the|and|you|your|what|which|would|with|have|about|this|that|from|when|where|card|cards|play");
const DANISH = word("hvad|hvordan|hvem|hvilken|hvilke|ikke|jeg|og|noget|nogen|også|være|spørgsmål");
const DANISH_LETTERS = /[æøÆØ]/;

/**
 * No alcohol anywhere (as Goodtalk, src/__tests__/localeEn.test.ts), and nothing adult outside the
 * couples' decks. A new app language must add its words here; the test fails until it does.
 */
type Rule = Pick<RegExp, "test">;
const anyOf = (...rules: Rule[]): Rule => ({ test: (t) => rules.some((r) => r.test(t)) });

const CONTENT_RULES: Record<string, { alcohol: Rule; adult: Rule }> = {
  sv: {
    // not "full" or "fylla": full lön, fylla år, fylla i
    alcohol: word("öl|vin|vinet|sprit|snaps|nubbe|skål|skåla|berusad|packad|bakfull|fyllan|drinkar?|shots?|krogrunda|alkohol\\p{L}*|cider|champagne|bubbel"),
    // "sex" is also six in Swedish, so the cards write the digit
    adult: word("sex|sexig\\p{L}*|naken|nakna|kåt|orgasm\\p{L}*"),
  },
  de: {
    alcohol: anyOf(
      // German glues words together (Feierabendbier, Glühweine, Stammkneipe), so most words match inside
      // compounds too. Not "Kater" (also a tomcat), not verbs on -bieren (probieren, buchstabieren, absorbieren), "Schwein" or "Insekt".
      word(
        "\\p{L}*(?<!pro|sta|sor)bier\\p{L}*|\\p{L}+(?<!sch|be)wein(?:e|es|s)?|sekt(?:e?s|glas|gläser|flaschen?|empfang|laune)?|" +
          "\\p{L}*schn[aä]ps\\p{L}*|\\p{L}*likör\\p{L}*|\\p{L}*cocktail\\p{L}*|\\p{L}*champagner\\p{L}*|\\p{L}*alkohol\\p{L}*|" +
          "\\p{L}*kneipe\\p{L}*|kneipentour|prost|zuprosten|zugeprostet|betrunken\\p{L}*|besoffen\\p{L}*|beschwipst\\p{L}*|verkatert|" +
          "(?:be|ver)?sauf\\p{L}*|gesoffen|\\p{L}*säufer\\p{L}*|bowle|schampus|aperol\\p{L}*|wodka|whiske?y|gin|tequila|cognac|shots?|drinks?",
      ),
      // the noun is capitalised; lower-case "weine", "weinen" and "weinte" are crying
      /(?<!\p{L})Wein(?!en|end|t)\p{L}*/u,
    ),
    // "geil" is also youth slang for cool, which the cards never use
    adult: word("sex|sexy|sexuell\\p{L}*|nackt\\p{L}*|geil\\p{L}*|erotisch\\p{L}*|orgasmus|orgasmen"),
  },
};
const ADULT_OK = new Set(["intimitet", "parforhold", "foerste-date", "kend-din-partner", "nyt-og-ukendt"]);

describe("the German alcohol check", () => {
  const { alcohol } = CONTENT_RULES.de;

  it("catches inflected words and compounds", () => {
    for (const t of [
      "Magst du Bier?",
      "Welche Weine magst du?",
      "Was ist dein liebstes Feierabendbier?",
      "Wo gibt es den besten Biergarten?",
      "Trinkst du Glühwein auf dem Weihnachtsmarkt?",
      "Rotweine oder Weißweine?",
      "Welcher Wein passt zu Pizza?",
      "Gehst du oft in deine Stammkneipe?",
      "Wann hast du zuletzt Sektgläser gespült?",
      "Wer hat am meisten gesoffen?",
    ])
      expect(alcohol.test(t), t).toBe(true);
  });

  it("lets crying, trying and pigs through", () => {
    for (const t of [
      "Wann hast du zuletzt geweint?",
      "Ich weine bei jedem Film.",
      "Weinen ist okay.",
      "Was würdest du gern ausprobieren?",
      "Probierst du gern Neues?",
      "Buchstabiere deinen Namen rückwärts.",
      "Welches Tier magst du lieber: Schwein oder Kuh?",
      "Hast du Angst vor Insekten?",
      "Was machst du nach den Hausaufgaben?",
      "Wann hast du zuletzt gestaunt?",
      "Weihnachten mit Adventskalender",
    ])
      expect(alcohol.test(t), t).toBe(false);
  });
});

describe("the list of app languages", () => {
  it("has unique codes, Danish and English first, and English as the fallback", () => {
    expect(new Set(APP_LOCALE_CODES).size).toBe(APP_LOCALE_CODES.length);
    expect(APP_LOCALE_CODES.slice(0, 3)).toEqual(["da", "en", "sv"]);
    expect(FALLBACK_APP_LOCALE).toBe("en");
    for (const l of APP_LOCALES) expect(l.code, l.code).toMatch(/^[a-z]{2}$/);
  });

  it("gives each device language to one app language at most", () => {
    const device = APP_LOCALES.flatMap((l) => l.device);
    expect(new Set(device).size).toBe(device.length);
  });

  it("has a folder with every file the app's international screens need", () => {
    const files = ["ui.ts", "ui.app.ts", "site.ts", "site.app.ts", "screens.ts", "content.tsx", "aaret.ts", "followUps.ts", "marks.ts", "games.ts", "decks/index.ts"];
    for (const l of INTL) for (const f of files) expect(existsSync(join(ROOT, "src/locales", l.code, f)), `${l.code}/${f}`).toBe(true);
  });
});

describe("app-only languages get no website", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("are the only ones without web, and only Danish and English have a site", () => {
    expect(WEB_LOCALE_CODES).toEqual(["da", "en"]);
    expect(Object.keys(SITES)).toEqual(WEB_LOCALE_CODES);
    expect(Object.keys(homeLanguages)).toEqual(WEB_LOCALE_CODES);
  });

  it("refuse SITE_LOCALE without APP_BUILD, and unknown codes always", () => {
    for (const l of APP_LOCALES) {
      expect(() => assertBuildLocale(l.code, true), l.code).not.toThrow();
      if (l.web) expect(() => assertBuildLocale(l.code, false), l.code).not.toThrow();
      else expect(() => assertBuildLocale(l.code, false), l.code).toThrow(/app-only/);
    }
    expect(() => assertBuildLocale("xx", true)).toThrow(/SITE_LOCALE must be one of/);
  });

  it("make next.config.ts itself fail for a website build in an app-only language", async () => {
    for (const l of OTHERS) {
      vi.resetModules();
      vi.stubEnv("SITE_LOCALE", l.code);
      vi.stubEnv("APP_BUILD", "");
      await expect(import("../../next.config"), l.code).rejects.toThrow(/app-only/);
      vi.resetModules();
      vi.stubEnv("APP_BUILD", "1");
      const config = (await import("../../next.config")).default;
      expect(config.basePath, l.code).toBe(`/${l.code}`);
      expect(config.pageExtensions, l.code).toEqual(["intlapp.tsx", "intlapp.ts"]);
    }
  });

  it("never reach the sitemaps, hreflang or the share links of the websites", () => {
    const sources = ["src/locales/sites.ts", "src/locales/alternates.ts", "src/app/sitemap.xml/route.intl.ts"].map((f) => readFileSync(join(ROOT, f), "utf8"));
    for (const l of OTHERS) for (const s of sources) expect(s, l.code).not.toMatch(new RegExp(`["'/]${l.code}["'/]`));
  });
});

describe.each(OTHERS.map((l) => l.code))("app language %s", (code) => {
  const l = locales.get(code)!;
  const byId = new Map(categories.map((c) => [c.id, c]));

  it("has the same decks, slugs and card ids as English", () => {
    expect(Object.keys(l.decks).sort()).toEqual(Object.keys(en.decks).sort());
    for (const [id, deck] of Object.entries(l.decks)) {
      expect(deck.slug, id).toBe(en.decks[id].slug);
      expect(Object.keys(deck.cards).sort(), id).toEqual(Object.keys(en.decks[id].cards).sort());
      expect(byId.has(id), id).toBe(true);
      expect(deck.description.length, id).toBeLessThanOrEqual(90);
    }
  });

  it("has the same party games, games per page, steps and card ids as English", () => {
    expect(Object.keys(l.games).sort()).toEqual(Object.keys(en.games).sort());
    for (const [slug, g] of Object.entries(l.games)) {
      const e = en.games[slug];
      expect(g.slug, slug).toBe(e.slug);
      expect(Object.keys(g.kort).sort(), slug).toEqual(Object.keys(e.kort).sort());
      expect(g.lege.length, slug).toBe(e.lege.length);
      g.lege.forEach((leg, i) => {
        expect(leg.saadan.length, `${slug} ${leg.navn}`).toBe(e.lege[i].saadan.length);
        // a language may add a local variant (Swedish New Year's: "Ring klocka ring"), never drop one
        if (e.lege[i].variant) expect(leg.variant, `${slug} ${leg.navn}`).toBeTruthy();
      });
      // the app titles the page with the part before the colon, and counts must be true
      expect(g.h1.split(":").length, slug).toBe(2);
      for (const n of g.h1.match(/\d+/g) ?? []) expect([g.lege.length, Object.keys(g.kort).length], `${slug}: ${g.h1}`).toContain(Number(n));
    }
    expect(Object.keys(l.games).every((s) => legeSider.some((p) => p.slug === s))).toBe(true);
  });

  it("has Year in review, follow-ups, screens and UI words for every English key", () => {
    expect(Object.keys(l.year).sort()).toEqual(Object.keys(en.year).sort());
    expect(l.followUps.length).toBe(en.followUps.length);
    expect(keys(l.screens).sort()).toEqual(keys(en.screens).sort());
    expect(keys(l.ui).sort()).toEqual(keys(daUi).sort());
    expect((l.screens.settings as { weekdays: string[] }).weekdays).toHaveLength(7);
    expect((l.screens.year as { rounds: string[] }).rounds).toHaveLength(4);
  });

  it("has unique card-back marks for every deck and Year in review", () => {
    const ids = [...Object.keys(l.decks), "aaret"];
    expect(Object.keys(l.marks).sort()).toEqual(ids.sort());
    expect(new Set(Object.values(l.marks)).size).toBe(ids.length);
    for (const [id, d] of Object.entries(l.decks)) expect(l.marks[id], id).toBe(d.mark);
    for (const m of Object.values(l.marks)) expect(m).toMatch(/^\p{Lu}\p{Ll}?$/u);
  });

  it("has no empty texts, em dashes or emoji", () => {
    for (const t of texts(l)) {
      expect(t.trim(), JSON.stringify(t)).not.toBe("");
      expect(t, t).not.toMatch(/[—\p{Extended_Pictographic}]/u);
    }
    // only the games without a variant leave it out; an empty one is a slip
    for (const g of Object.values(l.games)) for (const leg of g.lege) if (leg.variant !== undefined) expect(leg.variant.trim()).not.toBe("");
  });

  it("has no English or Danish words left", () => {
    const left = texts(l).filter((t) => ENGLISH.test(t) || DANISH.test(t) || DANISH_LETTERS.test(t));
    expect(left).toEqual([]);
  });

  it("has no alcohol, and nothing adult outside the couples' decks", () => {
    const rules = CONTENT_RULES[code];
    expect(rules, `add ${code} to CONTENT_RULES`).toBeDefined();
    for (const t of texts(l)) expect(rules.alcohol.test(t), t).toBe(false);
    for (const [id, d] of Object.entries(l.decks)) {
      if (ADULT_OK.has(id)) continue;
      for (const t of Object.values(d.cards)) expect(rules.adult.test(t), `${id}: ${t}`).toBe(false);
    }
    for (const g of Object.values(l.games)) for (const t of Object.values(g.kort)) expect(rules.adult.test(t), t).toBe(false);
  });
});

describe("home screen names", () => {
  const ios = (code: string) => readFileSync(join(ROOT, `ios/App/Sprog/${code}.lproj/InfoPlist.strings`), "utf8");
  const android = (code: string) => readFileSync(join(ROOT, `android/app/src/sprog/res/values-${code}/strings.xml`), "utf8");

  it("exist on iOS for exactly the app's languages", () => {
    const dirs = readdirSync(join(ROOT, "ios/App/Sprog")).filter((d) => d.endsWith(".lproj")).map((d) => d.replace(/\.lproj$/, ""));
    expect(dirs.sort()).toEqual([...APP_LOCALE_CODES].sort());
    for (const l of APP_LOCALES) {
      expect(ios(l.code), l.code).toContain(`"CFBundleDisplayName" = "${l.appName}";`);
      expect(ios(l.code), l.code).toContain(`"CFBundleName" = "${l.appName}";`);
    }
    // the build phase takes the languages from the folders, not from a list of its own
    expect(readFileSync(join(ROOT, "ios/App/Sprog/localize-name.sh"), "utf8")).toContain('"${SRCROOT}"/Sprog/*.lproj');
  });

  it("exist on Android for every language but Danish, whose name is the default", () => {
    const dirs = readdirSync(join(ROOT, "android/app/src/sprog/res")).map((d) => d.replace(/^values-/, ""));
    expect(dirs.sort()).toEqual(APP_LOCALE_CODES.filter((c) => c !== "da").sort());
    for (const l of INTL) {
      expect(android(l.code), l.code).toContain(`<string name="app_name">${l.appName}</string>`);
      expect(android(l.code), l.code).toContain(`<string name="title_activity_main">${l.appName}</string>`);
    }
    expect(readFileSync(join(ROOT, "android/app/build.gradle"), "utf8")).toContain(`?: "${APP_LOCALES[0].appName}"`);
  });
});
