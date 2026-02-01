"use client";

import { motion } from "framer-motion";
import { getCategory } from "@/data/categories";
import type { HistoryEntry } from "@/hooks/useLocalStorage";

export interface HistoryItemCardProps {
  /** The history entry to display */
  entry: HistoryEntry;
  /** Index for staggered animation delay */
  index: number;
}

/** Emoji indicators for question depth */
const depthEmoji = {
  let: "🟢",
  medium: "🟡",
  dyb: "🔴",
} as const;

/**
 * HistoryItemCard - Card displaying a question from history
 * 
 * Shows the question text, category, depth indicator, and timestamp.
 * 
 * @example
 * <HistoryItemCard
 *   entry={{
 *     id: "q1",
 *     categoryId: "parforhold",
 *     text: "Hvad er dit yndlingsminde med mig?",
 *     depth: "medium",
 *     answeredAt: Date.now()
 *   }}
 *   index={0}
 * />
 */
export function HistoryItemCard({
  entry,
  index,
}: HistoryItemCardProps) {
  const category = getCategory(entry.categoryId);
  const date = new Date(entry.answeredAt);
  const formattedDate = date.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index }}
      className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <div className="flex items-start gap-3">
        {category && (
          <span className="text-xl shrink-0" aria-hidden="true">
            {category.emoji}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed line-clamp-2">
            {entry.text}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 dark:text-slate-500">
            <span aria-label={`Dybde: ${entry.depth}`}>{depthEmoji[entry.depth]}</span>
            <span>•</span>
            <span>{formattedDate}</span>
            {category && (
              <>
                <span>•</span>
                <span>{category.name}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HistoryItemCard;
