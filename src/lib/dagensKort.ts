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

const pool: { q: Question; c: Category }[] = categories
  .filter((c) => DAILY_DECKS.includes(c.id))
  .flatMap((c) => c.questions.filter((q) => q.depth !== "dyb").map((q) => ({ q, c })));

const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" });

/** The date in Denmark as YYYY-MM-DD, whatever the device's time zone */
export function danishDateKey(date: Date): string {
  return fmt.format(date);
}

/** The card for a Danish date (YYYY-MM-DD) */
export function dagensKortForDato(key: string): { q: Question; c: Category } {
  const [y, m, d] = key.split("-").map(Number);
  return pool[(y * 400 + (m - 1) * 31 + d) % pool.length];
}

export function dagensKort(date: Date): { q: Question; c: Category } {
  return dagensKortForDato(danishDateKey(date));
}

/** The n Danish dates before `date`, newest first */
export function tidligereDatoer(date: Date, n: number): string[] {
  return Array.from({ length: n }, (_, i) => danishDateKey(new Date(date.getTime() - (i + 1) * 86_400_000)));
}
