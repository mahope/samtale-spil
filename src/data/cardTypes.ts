import type { CardType } from "@/types";
import { ui } from "@/locale/ui";

/** Label shown on the card face for every type except plain questions */
export const CARD_TYPE_LABEL: Record<Exclude<CardType, "spoergsmaal">, string> = ui.cardType.label;

/** One line of instruction under the label */
export const CARD_TYPE_HINT: Record<Exclude<CardType, "spoergsmaal">, string> = ui.cardType.hint;

/**
 * Decks that work with children at the table. Used by "Kun familievenlige" on /spil/.
 * cardTypes.test.ts checks that these decks never mention alcohol, sex or nudity.
 */
export const FAMILY_FRIENDLY_DECKS = new Set([
  "familie",
  "boern",
  "foelelseskort",
  "familiehistorier",
  "barndom",
  "hoejtider",
  "sjove",
  "dilemmaer",
  "tak",
  "gode-nyheder",
  "fremtid",
  "droemme",
  "filosofiske",
  "indskolingen",
  "mellemtrinnet",
  "udskolingen",
  "spejder",
]);

/** Decks that suit colleagues: nothing about partners, family secrets or the body */
export const WORK_SAFE_DECKS = new Set([
  "kollegaer",
  "sjove",
  "dilemmaer",
  "tak",
  "gode-nyheder",
  "fremtid",
  "droemme",
  "filosofiske",
  "hoejtider",
  "studieliv",
  "gilwell",
]);
