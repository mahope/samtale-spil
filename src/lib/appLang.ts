/**
 * The Snakkespil app speaks Danish and English (Goodtalk became its English half after Apple's
 * 4.3 rejection, 10/11-26). scripts/build-app.sh exports the Danish app shell under out/da/ and
 * the English one under out/en/ (basePath, next.config.ts) and writes out/index.html from
 * appIndexHtml(), which picks a half at start. Both halves share one origin, so favourites,
 * history and settings in localStorage are shared too; the card ids are the same in both.
 *
 * The app's web server (Capacitor on iOS and Android) answers every path without a file
 * extension with out/index.html. So moving between the halves always goes to a file
 * (/en/more/index.html), and the app layouts strip "index.html" from the address before the
 * router starts (stripIndexScript).
 */
export type AppLang = "da" | "en";

/** The language picked under Mere / More. Without it the device language decides. */
export const APP_LANG_KEY = "samtale-spil-app-sprog";

/** "/da" or "/en" in the app, "" on the websites and in the 18+ app */
export const APP_BASE: string = process.env.APP_BASE_PATH || "";

/** The half of the app this code runs in, or null outside the Snakkespil app */
export function currentAppLang(base: string = APP_BASE): AppLang | null {
  return base === "/da" ? "da" : base === "/en" ? "en" : null;
}

/** A browser path (window.location.pathname) as the router sees it, without the base path */
export function withoutBase(path: string, base: string = APP_BASE): string {
  if (!base) return path;
  if (path === base) return "/";
  return path.startsWith(`${base}/`) ? path.slice(base.length) : path;
}

/** Where switching language lands: the other half's More tab, where the switch is */
export const LANG_SWITCH_TARGET: Record<AppLang, string> = { da: "/da/mere/index.html", en: "/en/more/index.html" };

/** Stores the choice and loads the other half. replace(): no way back into the old language. */
export function switchAppLang(lang: AppLang) {
  try {
    window.localStorage.setItem(APP_LANG_KEY, lang);
  } catch {
    // private mode: the switch still works for this session
  }
  window.location.replace(LANG_SWITCH_TARGET[lang]);
}

/** A page path ("/da/spil/x/?question=1") as a file the app's web server serves ("/da/spil/x/index.html?question=1") */
export function asFile(url: string): string {
  const m = /^([^?#]*)(.*)$/.exec(url)!;
  const path = m[1].endsWith("/") ? m[1] : `${m[1]}/`;
  return `${path}index.html${m[2]}`;
}

/**
 * What tapping a reminder does. Reminders carry the full path with the language ("/en/daily-question/").
 * In the same half the router opens it; a reminder from the other half (scheduled before a
 * language switch) loads that half. Reminders from 2.0.0 have no language and are Danish.
 */
export function notificationTarget(url: string, base: string = APP_BASE): { push: string } | { load: string } | null {
  if (!url.startsWith("/") || url.startsWith("//")) return null;
  const full = /^\/(da|en)(\/|$)/.test(url) ? url : `/da${url}`;
  if (!base) return { push: url };
  if (full.startsWith(`${base}/`)) return { push: full.slice(base.length) };
  return { load: asFile(full) };
}

interface StartWindow {
  location: { pathname: string; search: string; hash: string; replace(url: string): void };
  localStorage: { getItem(key: string): string | null };
  navigator: { language?: string; languages?: readonly string[] };
}

/**
 * The script in out/index.html. Runs as a string in the web view, so it must not use anything
 * outside itself. At the root it opens the stored language, or else the device language:
 * Danish for Danish, Norwegian and Swedish, English for everyone else. On a deeper path (the
 * web view reloaded a screen, and the server answered with this file) it reopens that screen.
 */
export function appStart(w: StartWindow, key: string) {
  const langs = ["da", "en"];
  let stored: string | null = null;
  try {
    stored = w.localStorage.getItem(key);
  } catch {
    stored = null;
  }
  let lang = stored && langs.indexOf(stored) >= 0 ? stored : "";
  if (!lang) {
    const nav = w.navigator;
    const first = String((nav.languages && nav.languages[0]) || nav.language || "").toLowerCase().split(/[-_]/)[0];
    lang = ["da", "nb", "nn", "no", "sv"].indexOf(first) >= 0 ? "da" : "en";
  }
  const loc = w.location;
  const deep = /^\/(da|en)(\/.*)?$/.exec(loc.pathname);
  let path = deep && deep[1] === lang ? loc.pathname : "/" + lang + "/";
  if (path.charAt(path.length - 1) !== "/") path += "/";
  loc.replace(path + "index.html" + loc.search + loc.hash);
}

/** out/index.html: nothing to see, it only opens one of the halves */
export function appIndexHtml(): string {
  return `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>Snakkespil</title>
<style>html,body{margin:0;height:100%;background:#1d4a38}</style>
<script>(${appStart.toString()})(window, ${JSON.stringify(APP_LANG_KEY)});</script>
</head>
<body></body>
</html>
`;
}

/** In the app layouts' <head>: "/da/mere/index.html" becomes "/da/mere/" before the router reads the address */
export const stripIndexScript = `(function(){try{var l=location,p=l.pathname;if(/\\/index\\.html$/.test(p))history.replaceState(history.state,'',p.slice(0,-10)+l.search+l.hash)}catch(e){}})();`;
