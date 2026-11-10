/**
 * Every Danish card text in the Snakkespil app by card id: decks, party games and Året der gik.
 * Loaded on demand by the app's Favoritter tab (useCardTexts). The English half has src/intl/app/cardTexts.ts.
 */
import { categories } from "@/data/categories";
import { legeSider } from "@/data/lege";
import { AAR_KORT } from "@/data/aaretDerGik";

export const cardTexts: ReadonlyMap<string, string> = new Map([
  ...categories.flatMap((c) => c.questions.map((q) => [q.id, q.text] as const)),
  ...legeSider.flatMap((s) => s.kort.map((k) => [k.id, k.text] as const)),
  ...AAR_KORT.map((q) => [q.id, q.text] as const),
]);
