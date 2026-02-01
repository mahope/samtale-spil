"use client";

import { motion } from "framer-motion";

export interface CategoryProgressItemProps {
  /** Emoji representing the category */
  emoji: string;
  /** Category name */
  name: string;
  /** Number of questions answered */
  answered: number;
  /** Total questions in category */
  total: number;
  /** Tailwind gradient color classes for the progress bar */
  color: string;
  /** Index for staggered animation delay */
  index: number;
}

/**
 * CategoryProgressItem - Displays progress for a single category
 * 
 * Features an animated progress bar and completion indicator.
 * 
 * @example
 * <CategoryProgressItem
 *   emoji="💑"
 *   name="Parforhold"
 *   answered={15}
 *   total={20}
 *   color="from-rose-400 to-pink-500"
 *   index={0}
 * />
 */
export function CategoryProgressItem({
  emoji,
  name,
  answered,
  total,
  color,
  index,
}: CategoryProgressItemProps) {
  const percent = Math.round((answered / total) * 100);
  const isCompleted = answered >= total;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white dark:bg-slate-800 rounded-xl p-3 sm:p-4 shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          <span className="text-lg sm:text-xl shrink-0" aria-hidden="true">
            {emoji}
          </span>
          <span className="font-medium text-sm sm:text-base text-slate-800 dark:text-slate-100 truncate">
            {name}
          </span>
          {isCompleted && (
            <span className="text-emerald-500 text-sm shrink-0">✓</span>
          )}
        </div>
        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 shrink-0 tabular-nums">
          {answered}/{total}
        </span>
      </div>
      <div className="h-1.5 sm:h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ delay: 0.2 + 0.1 * index, duration: 0.5 }}
        />
      </div>
      <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mt-1 text-right tabular-nums">
        {percent}%
      </p>
    </motion.div>
  );
}

export default CategoryProgressItem;
