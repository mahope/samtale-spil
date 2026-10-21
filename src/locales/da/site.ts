/** Brand and address of the Danish site; src/locales/en/site.ts has the same keys (issue #30) */
export const site = {
  url: "https://snakkespil.dk",
  name: "Snakkespil",
  lang: "da",
  ogLocale: "da_DK",
  /** The report worker (worker/) serves this site under /api */
  report: true,
  /** Favourites page exists (/favoritter/) */
  favorites: true,
  ogTagline: "Gratis samtalekort på snakkespil.dk",
  /** Store pages of the app; shown only once APPS_LIVE in src/config/site.ts is true */
  apps: {
    ios: "https://apps.apple.com/dk/app/id6825365746",
    android: "https://play.google.com/store/apps/details?id=dk.snakkespil.app",
  } as { ios: string | null; android: string | null },
  /** Plausible CE tracker for this site (analytics.holstjensen.eu) */
  plausibleScript: "https://analytics.holstjensen.eu/js/pa-yk0peyirQvnSBppLjWJYB.js",
};
