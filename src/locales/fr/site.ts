import type { site as da } from "../da/site";

/**
 * Goodtalk in French exists in the Snakkespil app only (no website, src/locales/appLocales.ts); shared links
 * and card reports go to Goodtalk's site, and visits are counted with Goodtalk's analytics ids under /fr/.
 */
export const site: typeof da = {
  url: "https://goodtalkcards.com",
  name: "Goodtalk",
  lang: "fr",
  ogLocale: "fr_FR",
  report: true,
  favorites: true,
  ogTagline: "Cartes de conversation gratuites dans l'appli Goodtalk",
  apps: { ios: null, android: null },
  umamiId: "07eee0ac-ee63-44b5-a850-6f36a089dd5e",
  plausibleScript: "https://analytics.holstjensen.eu/js/pa-ddNmoGtRKcppQoHKWvCnL.js",
};
