import type { site as da } from "../da/site";

/**
 * Pratespill exists in the Snakkespil app only (no website, src/locales/appLocales.ts); shared links
 * and card reports go to Goodtalk's site, and visits are counted with Goodtalk's analytics ids under /nb/.
 */
export const site: typeof da = {
  url: "https://goodtalkcards.com",
  name: "Pratespill",
  lang: "nb",
  ogLocale: "nb_NO",
  report: true,
  favorites: true,
  ogTagline: "Gratis samtalekort i Pratespill-appen",
  apps: { ios: null, android: null },
  umamiId: "07eee0ac-ee63-44b5-a850-6f36a089dd5e",
  plausibleScript: "https://analytics.holstjensen.eu/js/pa-ddNmoGtRKcppQoHKWvCnL.js",
};
