import type { site as da } from "../da/site";

/** Goodtalk, the English site (issue #30) */
export const site: typeof da = {
  url: "https://goodtalkcards.com",
  name: "Goodtalk",
  lang: "en",
  ogLocale: "en_US",
  report: true,
  favorites: false,
  ogTagline: "Free conversation cards at goodtalkcards.com",
  // The Goodtalk app (com.goodtalkcards.app, #74) has no store ids yet
  apps: { ios: null, android: null },
  plausibleScript: "https://analytics.holstjensen.eu/js/pa-ddNmoGtRKcppQoHKWvCnL.js",
};
