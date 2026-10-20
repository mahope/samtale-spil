import { categories } from "@/data/categories";

export const SITE_URL = "https://snakkespil.dk";

/** Totals derived from the question data, so copy never drifts from reality. */
export const CATEGORY_COUNT = categories.length;
export const QUESTION_COUNT = categories.reduce((sum, c) => sum + c.questions.length, 0);

/** Rounded down to the nearest hundred, for copy like "500+ spørgsmål". */
export const QUESTION_COUNT_LABEL = `${Math.floor(QUESTION_COUNT / 100) * 100}+`;
