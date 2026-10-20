/**
 * Visual identity of each deck (category). The single source for deck colours:
 * UI, OG images and app icons all read from here.
 */

export type DeckPattern = "prikker" | "striber" | "tern" | "zigzag" | "buer" | "ruder";

export interface Deck {
  /** Deck colour (card back, tiles, corner marks) */
  bg: string;
  /** Text colour on top of bg; chosen so the pair passes WCAG AA (4.5:1) */
  ink: string;
  pattern: DeckPattern;
  /** Short mark printed in the card corners, like the rank on a playing card */
  mark: string;
}

const LIGHT = "#ffffff";
const DARK = "#15201b";

export const decks: Record<string, Deck> = {
  parforhold: { bg: "#c8384f", ink: LIGHT, pattern: "ruder", mark: "P" },
  familie: { bg: "#e07a26", ink: DARK, pattern: "striber", mark: "F" },
  intimitet: { bg: "#7e1f3e", ink: LIGHT, pattern: "buer", mark: "I" },
  fremtid: { bg: "#2457c5", ink: LIGHT, pattern: "zigzag", mark: "Fr" },
  fortid: { bg: "#7f6140", ink: LIGHT, pattern: "tern", mark: "Fo" },
  sjove: { bg: "#f4c04e", ink: DARK, pattern: "prikker", mark: "S" },
  dybe: { bg: "#155a70", ink: LIGHT, pattern: "buer", mark: "D" },
  filosofiske: { bg: "#4b3fa6", ink: LIGHT, pattern: "ruder", mark: "Fi" },
  barndom: { bg: "#26805c", ink: LIGHT, pattern: "prikker", mark: "B" },
  droemme: { bg: "#a2457f", ink: LIGHT, pattern: "zigzag", mark: "Dr" },
  venner: { bg: "#5bb8d1", ink: DARK, pattern: "tern", mark: "V" },
  "foerste-date": { bg: "#ee7b6f", ink: DARK, pattern: "prikker", mark: "1" },
  boern: { bg: "#9ccc52", ink: DARK, pattern: "striber", mark: "Bø" },
  kollegaer: { bg: "#3e4c5e", ink: LIGHT, pattern: "striber", mark: "K" },
  hoejtider: { bg: "#a3271e", ink: LIGHT, pattern: "tern", mark: "H" },
  selvindsigt: { bg: "#a9bfad", ink: DARK, pattern: "buer", mark: "Se" },
  dilemmaer: { bg: "#13777a", ink: LIGHT, pattern: "zigzag", mark: "?" },
  tak: { bg: "#e8b33c", ink: DARK, pattern: "prikker", mark: "T" },
  "kend-din-partner": { bg: "#3a5fa8", ink: LIGHT, pattern: "tern", mark: "Kp" },
  "gode-nyheder": { bg: "#5aa84a", ink: DARK, pattern: "striber", mark: "G" },
  "nyt-og-ukendt": { bg: "#8b3fa0", ink: LIGHT, pattern: "zigzag", mark: "N" },
  "svaere-samtaler": { bg: "#465a63", ink: LIGHT, pattern: "buer", mark: "Sv" },
  familiehistorier: { bg: "#c8743a", ink: DARK, pattern: "ruder", mark: "Fh" },
  voksne: { bg: "#1d1820", ink: LIGHT, pattern: "ruder", mark: "18" },
  /** Mixed deck for "Bland alle" */
  blandet: { bg: "#1d4a38", ink: LIGHT, pattern: "tern", mark: "A" },
  /** The player's own questions */
  egne: { bg: "#f2f4f1", ink: DARK, pattern: "striber", mark: "E" },
};

const FALLBACK: Deck = { bg: "#1d4a38", ink: LIGHT, pattern: "tern", mark: "?" };

export function getDeck(categoryId: string): Deck {
  return decks[categoryId] ?? FALLBACK;
}

/** Relative luminance per WCAG 2.x */
function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Colour for deck marks printed on the white card face: the deck colour when it is
 * legible on white (3:1, the bold marks count as large text), otherwise dark ink. */
export function markColorOnWhite(deck: Deck): string {
  return contrastRatio(deck.bg, "#ffffff") >= 3 ? deck.bg : DARK;
}
