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

/** The n-th joker (0-based), cycling through the texts */
export function jokerCard(n: number, categoryId: string): Question {
  const i = n % JOKER_TEXTS.length;
  return { id: `joker-${i + 1}`, categoryId, text: JOKER_TEXTS[i], depth: "let", type: "joker" };
}
