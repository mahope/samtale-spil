import type { CardType } from "@/types";

/** Label shown on the card face for every type except plain questions */
export const CARD_TYPE_LABEL: Record<Exclude<CardType, "spoergsmaal">, string> = {
  opgave: "Opgave",
  peg: "Peg",
  "jeg-har-aldrig": "Jeg har aldrig",
};

/** One line of instruction under the label */
export const CARD_TYPE_HINT: Record<Exclude<CardType, "spoergsmaal">, string> = {
  opgave: "Den, der trækker kortet, gør det.",
  peg: "Tæl ned, og peg alle på samme tid.",
  "jeg-har-aldrig": "Ræk hånden op, hvis du har.",
};

/**
 * Decks that work with children at the table. Used by "Kun familievenlige" on /spil/.
 * cardTypes.test.ts checks that these decks never mention alcohol, sex or nudity.
 */
export const FAMILY_FRIENDLY_DECKS = new Set([
  "familie",
  "boern",
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
