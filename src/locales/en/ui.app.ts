import { ui as site } from "./ui";

/**
 * UI words for the Goodtalk app (the *.intlapp.tsx tree). next.config.ts aliases "@/locale/ui"
 * here for that build only. Same words as the site; only the games' way back differs, because
 * the decks live on the Play tab ("/") instead of /play/.
 */
export const ui = { ...site, play: { ...site.play, backHref: "/" } };
