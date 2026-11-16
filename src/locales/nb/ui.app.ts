import { ui as base } from "./ui";

/**
 * UI words for Pratespill in the app (the *.intlapp.tsx tree). next.config.ts aliases "@/locale/ui"
 * here. Only the games' way back differs from ui.ts: the decks live on the Spill tab ("/").
 */
export const ui = { ...base, play: { ...base.play, backHref: "/" } };
