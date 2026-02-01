/**
 * Daily question utilities for the Samtale-Spil app.
 * Provides deterministic daily question selection and formatting helpers.
 * @module utils/dailyQuestion
 */

import { categories } from "@/data/categories";
import { Question, Category } from "@/types";

/**
 * The result of getting a daily question.
 */
interface DailyQuestionResult {
  question: Question;
  category: Category;
}

/**
 * Får et deterministisk dagligt spørgsmål baseret på datoen.
 * Samme spørgsmål vises hele dagen.
 */
export function getDailyQuestion(): DailyQuestionResult {
  // Få alle spørgsmål samlet
  const allQuestions = categories.flatMap((cat) =>
    cat.questions.map((q) => ({ question: q, category: cat }))
  );

  // Brug datoen som seed for deterministisk valg
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  // Simpel hash-funktion til at konvertere dato til tal
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Konverter til 32-bit integer
  }

  // Brug hash til at vælge et spørgsmål
  const index = Math.abs(hash) % allQuestions.length;

  return allQuestions[index];
}

/**
 * Formats a depth level to Danish text for display.
 * 
 * @param {"let" | "medium" | "dyb"} depth - The depth level to format
 * @returns {string} The formatted Danish text ("Let", "Medium", or "Dyb")
 * 
 * @example
 * formatDepth('let'); // Returns "Let"
 * formatDepth('dyb'); // Returns "Dyb"
 */
export function formatDepth(depth: "let" | "medium" | "dyb"): string {
  const depthMap = {
    let: "Let",
    medium: "Medium",
    dyb: "Dyb",
  };
  return depthMap[depth];
}

/**
 * Gets the Tailwind CSS classes for styling a depth level badge.
 * Includes both light and dark mode colors.
 * 
 * @param {"let" | "medium" | "dyb"} depth - The depth level
 * @returns {string} Tailwind CSS classes for background and text colors
 * 
 * @example
 * // Returns "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
 * getDepthColor('let');
 */
export function getDepthColor(depth: "let" | "medium" | "dyb"): string {
  const colorMap = {
    let: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    dyb: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };
  return colorMap[depth];
}
