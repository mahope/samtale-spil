/** Brand and address of the Danish site; src/locales/en/site.ts has the same keys (issue #30) */
export const site = {
  url: "https://snakkespil.dk",
  name: "Snakkespil",
  lang: "da",
  ogLocale: "da_DK",
  /** The report worker (snakkespil.dk/api) only serves this site */
  report: true,
  /** Favourites page exists (/favoritter/) */
  favorites: true,
  ogTagline: "Gratis samtalekort på snakkespil.dk",
  /** Plausible CE tracker for this site (analytics.holstjensen.eu) */
  plausibleScript: "https://analytics.holstjensen.eu/js/pa-yk0peyirQvnSBppLjWJYB.js",
};
