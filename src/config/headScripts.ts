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

// The 18+ app starts dark: with no stored choice it stores "dark", so Indstillinger shows it too
export const voksenThemeInitScript = `try{if(!localStorage.getItem('theme'))localStorage.setItem('theme','dark')}catch(e){}${themeInitScript}`;

// The apps' shell: data-platform picks the iOS or Material look before the first paint. In a
// browser preview ?platform=ios|android forces one for the rest of the session.
export const appPlatformScript = `(function(){try{var d=document.documentElement,s=sessionStorage,q=new URLSearchParams(location.search).get('platform');if(q==='ios'||q==='android'||q==='web')s.setItem('app-platform',q);var c=window.Capacitor,p=c&&c.getPlatform?c.getPlatform():'web';if(p==='web')p=s.getItem('app-platform')||'web';d.dataset.platform=p;}catch(e){}})();`;

// Plausible CE (analytics.holstjensen.eu): cookieless, self-hosted in the EU.
// The pa-<id>.js script only sends events once plausible.init() has run. Inside the
// apps the page host is localhost, which Plausible skips unless captureOnLocalhost is set.
export const plausibleInitScript =
  "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init(window.Capacitor?{captureOnLocalhost:true}:undefined)";

export const PLAUSIBLE_SRC = "https://analytics.holstjensen.eu/js/pa-yk0peyirQvnSBppLjWJYB.js";
