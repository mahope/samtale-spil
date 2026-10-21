import { ui as site } from "./ui";

/**
 * UI words for the Snakkespil app (*.app.tsx) and the 18+ app (*.voksen.tsx). next.config.ts aliases "@/locale/ui"
 * here for those builds only. Same words as the site; only the games' way back differs, because
 * the decks live on the Spil tab ("/") instead of /spil/.
 */
export const ui = { ...site, play: { ...site.play, backHref: "/" } };
