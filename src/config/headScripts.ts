/** Inline <head> scripts shared by the site's and the app's root layouts. */

// Sets the theme class before hydration (prevents a flash)
export const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    var isDark = theme === 'dark' ||
      (theme === 'system' || !theme) && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.add(isDark ? 'dark' : 'light');
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

// Plausible CE (analytics.holstjensen.eu): cookieless, self-hosted in the EU.
// The pa-<id>.js script only sends events once plausible.init() has run. Inside the
// apps the page host is localhost, which Plausible skips unless captureOnLocalhost is set.
export const plausibleInitScript =
  "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init(window.Capacitor?{captureOnLocalhost:true}:undefined)";

export const PLAUSIBLE_SRC = "https://analytics.holstjensen.eu/js/pa-yk0peyirQvnSBppLjWJYB.js";
