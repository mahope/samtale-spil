"use client";

import { motion } from "framer-motion";
import { getCategory } from "@/data/categories";
import type { FavoriteQuestion } from "@/hooks/useLocalStorage";

export interface FavoritePreviewCardProps {
  /** The favorite question to display */
  favorite: FavoriteQuestion;
  /** Index for staggered animation delay */
  index: number;
}

/**
 * FavoritePreviewCard - Preview card for a favorite question
 * 
 * Displays the question text with category emoji.
 * 
 * @example
 * <FavoritePreviewCard
 *   favorite={{
 *     id: "q1",
 *     categoryId: "parforhold",
 *     text: "Hvad er dit yndlingsminde med mig?",
 *     depth: "medium",
 *     savedAt: Date.now()
 *   }}
 *   index={0}
 * />
 */
export function FavoritePreviewCard({
  favorite,
  index,
}: FavoritePreviewCardProps) {
  const category = getCategory(favorite.categoryId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <div className="flex items-start gap-2">
        {category && (
          <span className="text-lg shrink-0" aria-hidden="true">
            {category.emoji}
          </span>
        )}
        <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed line-clamp-2">
          {favorite.text}
        </p>
      </div>
    </motion.div>
  );
}

export default FavoritePreviewCard;
