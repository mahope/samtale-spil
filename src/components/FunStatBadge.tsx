"use client";

import { motion } from "framer-motion";

export interface FunStatBadgeProps {
  /** Emoji icon */
  icon: string;
  /** Title describing the stat */
  title: string;
  /** Value to display */
  value: string;
  /** Tailwind gradient color classes */
  color: string;
  /** Animation delay in seconds */
  delay?: number;
}

/**
 * FunStatBadge - A badge component for displaying fun statistics
 * 
 * Mobile-optimized with gradient background and icon.
 * 
 * @example
 * <FunStatBadge
 *   icon="🏆"
 *   title="Total fremskridt"
 *   value="75% udforsket"
 *   color="from-emerald-400 to-green-500"
 *   delay={0.5}
 * />
 */
export function FunStatBadge({
  icon,
  title,
  value,
  color,
  delay = 0,
}: FunStatBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 150 }}
      className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r ${color} shadow-md min-h-[60px] sm:min-h-[72px]`}
    >
      <span className="text-xl sm:text-2xl shrink-0" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs text-white/70 font-medium leading-tight">{title}</p>
        <p className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5 break-words">{value}</p>
      </div>
    </motion.div>
  );
}

export default FunStatBadge;
