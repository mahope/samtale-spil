/**
 * Stand-in for voksne.ts in the app builds (APP_BUILD=1, see next.config.ts).
 * The apps are rated 12+ and ship without the adult deck; the website keeps it (issue #54).
 */

import type { Question } from "@/types";

export const ADULT_CATEGORY_ID = "voksne";

export const adultQuestions: Question[] = [];

export const adultCategory = {
  id: ADULT_CATEGORY_ID,
  name: "Voksne",
  emoji: "🔞",
  description: "Intime spørgsmål kun for voksne par (18+)",
  color: "from-red-600 to-rose-800",
  questions: adultQuestions,
  isAdult: true,
};
