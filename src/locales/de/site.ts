import type { site as da } from "../da/site";

/**
 * Plauderspiel exists in the Snakkespil app only (no website, src/locales/appLocales.ts); shared links
 * and card reports go to Goodtalk's site, and visits are counted with Goodtalk's analytics ids under /de/.
 */
export const site: typeof da = {
  url: "https://goodtalkcards.com",
  name: "Plauderspiel",
  lang: "de",
  ogLocale: "de_DE",
  report: true,
  favorites: true,
  ogTagline: "Kostenlose Gesprächskarten in der Plauderspiel-App",
  apps: { ios: null, android: null },
  umamiId: "07eee0ac-ee63-44b5-a850-6f36a089dd5e",
  plausibleScript: "https://analytics.holstjensen.eu/js/pa-ddNmoGtRKcppQoHKWvCnL.js",
};
