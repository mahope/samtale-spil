import { categories } from "@/data/categories";
import type { Category, Question } from "@/types";

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

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" });

/** The date in Denmark as YYYY-MM-DD, whatever the device's time zone */
export function danishDateKey(date: Date): string {
  const part = (type: string) => fmt.formatToParts(date).find((p) => p.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

/** FNV-1a, 32 bit */
function hash(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Rendezvous hashing: the card with the highest hash of date + card id wins. A new card
 * only takes over the days it wins itself, so an app with slightly older data still
 * shows the same card as the website on almost every day.
 */
export function vaelgForDato(key: string, from: Pick[]): Pick {
  let best = from[0];
  let bestScore = -1;
  for (const p of from) {
    const score = hash(`${key}|${p.q.id}`);
    if (score > bestScore) {
      best = p;
      bestScore = score;
    }
  }
  return best;
}

/** The card for a Danish date (YYYY-MM-DD) */
export function dagensKortForDato(key: string): Pick {
  return vaelgForDato(key, pool);
}

export function dagensKort(date: Date): Pick {
  return dagensKortForDato(danishDateKey(date));
}

/** The n dates before a date key (YYYY-MM-DD), newest first; whole calendar days, so DST cannot skip or repeat one */
export function tidligereDatoer(key: string, n: number): string[] {
  const noon = Date.parse(`${key}T12:00:00Z`);
  return Array.from({ length: n }, (_, i) => new Date(noon - (i + 1) * 86_400_000).toISOString().slice(0, 10));
}
