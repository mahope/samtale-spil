import type { LocaleDeck } from "../../types";
import { couples } from "./couples";
import { deep } from "./deep";
import { family } from "./family";
import { friends } from "./friends";

/** Goodtalk's decks: Danish deck id -> English deck (issue #30) */
export const localeDecks: Record<string, LocaleDeck> = { ...couples, ...family, ...friends, ...deep };
