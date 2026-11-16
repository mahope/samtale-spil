import type { AppLocaleDeck } from "../../types";
import { couples } from "./couples";
import { deep } from "./deep";
import { family } from "./family";
import { friends } from "./friends";
import { more } from "./more";
import { school } from "./school";

/** Charlando's decks: Danish deck id -> Spanish deck, the same decks and card ids as Goodtalk (src/locales/en/decks) */
export const localeDecks: Record<string, AppLocaleDeck> = { ...couples, ...family, ...friends, ...deep, ...more, ...school };
