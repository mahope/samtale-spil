/**
 * The languages of the Snakkespil app (dk.snakkespil.app): one list that everything else reads.
 * scripts/build-app.sh builds one Next export per entry under out/<code>/, src/lib/appLang.ts
 * picks one at start and lets the player switch on Mere / More, next.config.ts refuses unknown
 * codes, and the tests check that every language has the same decks and card ids as English.
 *
 * Danish builds the *.app.tsx tree from src/data; every other language builds the shared
 * *.intlapp.tsx tree from src/locales/<code>/. A new app language is a new folder there
 * (see docs/app-butikker.md, "Et nyt sprog i appen") and an entry here.
 *
 * `web: true` languages also have a website (snakkespil.dk, goodtalkcards.com, src/locales/sites.ts).
 * The others exist in the app only: they cannot be built as a website (assertBuildLocale), so they
 * get no domain, no sitemap and no hreflang.
 *
 * No imports and plain syntax: next.config.ts and scripts/build-app.sh (Node's type stripping) read it too.
 */
export interface AppLocale {
  /** Folder in src/locales/, basePath in the app (/da, /sv) and value of SITE_LOCALE */
  code: string;
  /** The language's own name, in the language switch */
  label: string;
  /** Home screen name on a phone in this language (ios/App/Sprog, android/app/src/sprog) */
  appName: string;
  /**
   * Device languages (BCP 47 primary subtags) that open this language. A device language
   * no entry lists opens English.
   */
  device: string[];
  /** Has a website (and may be built without APP_BUILD) */
  web: boolean;
  /** The More tab, where the language switch is: switching lands there */
  more: string;
}

export const APP_LOCALES: AppLocale[] = [
  { code: "da", label: "Dansk", appName: "Snakkespil", device: ["da"], web: true, more: "/mere/" },
  { code: "en", label: "English", appName: "Goodtalk", device: ["en"], web: true, more: "/more/" },
  { code: "sv", label: "Svenska", appName: "Pratspel", device: ["sv"], web: false, more: "/more/" },
  // Norwegian Bokmål also opens on Nynorsk and plain "no" phones: closer than Danish or English
  { code: "nb", label: "Norsk", appName: "Pratespill", device: ["nb", "nn", "no"], web: false, more: "/more/" },
];

/** The language a device language that no entry lists opens */
export const FALLBACK_APP_LOCALE = "en";

export const APP_LOCALE_CODES: string[] = APP_LOCALES.map((l) => l.code);

/** The languages with a website: the only ones SITE_LOCALE may build without APP_BUILD */
export const WEB_LOCALE_CODES: string[] = APP_LOCALES.filter((l) => l.web).map((l) => l.code);

/**
 * Throws unless SITE_LOCALE can be built this way: a typo must never turn snakkespil.dk into
 * another site, and an app-only language must never become a website (no domain, no sitemap).
 */
export function assertBuildLocale(locale: string, appBuild: boolean): void {
  if (!APP_LOCALE_CODES.includes(locale)) throw new Error(`SITE_LOCALE must be one of ${APP_LOCALE_CODES.join(", ")}, got "${locale}"`);
  if (!appBuild && !WEB_LOCALE_CODES.includes(locale)) {
    throw new Error(`SITE_LOCALE=${locale} is an app-only language (src/locales/appLocales.ts): build it with APP_BUILD=1, see scripts/build-app.sh`);
  }
}
