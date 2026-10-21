import { categories } from "@/data/categories";
import type { Category, Question } from "@/types";
import { danishDateKey, vaelgForDato, tidligereDatoer } from "@/lib/dagDato";

/**
 * "Dagens spørgsmål": one card per Danish calendar day, the same on the website
 * (/dagens-spoergsmaal/) and in the app's reminders (src/lib/native.ts).
 * Light and medium cards from decks that suit anyone, so a stranger can read it too.
 */
export const DAILY_DECKS = [
  "familie",
  "venner",
  "sjove",
  "dilemmaer",
  "tak",
  "gode-nyheder",
  "fremtid",
  "droemme",
  "filosofiske",
  "barndom",
  "fortid",
  "dybe",
  "selvindsigt",
];

type Pick = { q: Question; c: Category };

const pool: Pick[] = categories
  .filter((c) => DAILY_DECKS.includes(c.id))
  .flatMap((c) => c.questions.filter((q) => q.depth !== "dyb").map((q) => ({ q, c })));

export { danishDateKey, vaelgForDato, tidligereDatoer };

/** The card for a Danish date (YYYY-MM-DD) */
export function dagensKortForDato(key: string): Pick {
  return vaelgForDato(key, pool);
}

export function dagensKort(date: Date): Pick {
  return dagensKortForDato(danishDateKey(date));
}
