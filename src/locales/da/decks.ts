import type { LocaleDeck } from "../types";

/** The Danish site reads its decks from src/data directly; only international sites use this (issue #30) */
export const localeDecks: Record<string, LocaleDeck> = {};
