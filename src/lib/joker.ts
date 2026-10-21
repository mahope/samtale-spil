import type { Question } from "@/types";
import { ui } from "@/locale/ui";

/** localStorage key for the "Jokerkort" setting (on by default) */
export const JOKER_KEY = "samtale-spil-joker";

const JOKER_TEXTS = ui.joker;

/**
 * A joker on about every 10th card (issue #41): every tenth turn shows a joker in the
 * deck's colours instead of the drawn card.
 */
export function jokerAt(turn: number, categoryId: string, enabled: boolean): Question | null {
  if (!enabled || (turn + 1) % 10 !== 0) return null;
  return jokerCard(Math.floor(turn / 10), categoryId);
}

/** Where a deck player stands: pos is the next card in the pile, turn counts cards and jokers shown */
export interface DeckTurn {
  pos: number;
  turn: number;
}

/**
 * Moves one step on. A joker turn only advances the turn, so it sits between two cards and
 * no question is skipped; after the last card the pile starts over (wrapped = reshuffle).
 */
export function stepDeck({ pos, turn }: DeckTurn, size: number, jokersOn: boolean, categoryId = ""): DeckTurn & { wrapped: boolean } {
  if (jokerAt(turn, categoryId, jokersOn)) return { pos, turn: turn + 1, wrapped: false };
  if (pos + 1 >= size) return { pos: 0, turn: 0, wrapped: true };
  return { pos: pos + 1, turn: turn + 1, wrapped: false };
}

/** The n-th joker (0-based), cycling through the texts */
export function jokerCard(n: number, categoryId: string): Question {
  const i = n % JOKER_TEXTS.length;
  return { id: `joker-${i + 1}`, categoryId, text: JOKER_TEXTS[i], depth: "let", type: "joker" };
}
