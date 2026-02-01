"use client";

import { motion } from "framer-motion";

export interface StatCardProps {
  /** Emoji icon displayed at the top */
  icon: string;
  /** Label text describing the stat */
  label: string;
  /** Main value to display */
  value: string | number;
  /** Optional subtext below the value */
  subtext?: string;
  /** Tailwind gradient classes (e.g., "from-violet-500 to-purple-600") */
  gradient: string;
  /** Animation delay in seconds */
  delay?: number;
}

/**
 * StatCard - A card component for displaying statistics
 * 
 * Features mobile-optimized sizing with decorative background circles.
 * 
 * @example
 * <StatCard
 *   icon="💬"
 *   label="Spørgsmål besvaret"
 *   value={42}
 *   subtext="af 100 total"
 *   gradient="from-violet-500 to-purple-600"
 *   delay={0.1}
 * />
 */
export function StatCard({
  icon,
  label,
  value,
  subtext,
  gradient,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-3 sm:p-5 text-white shadow-lg`}
    >
      {/* Decorative circles - smaller on mobile */}
      <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-14 h-14 sm:w-20 sm:h-20 bg-white/10 rounded-full" />
      <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full" />
      <div className="relative">
        <span className="text-2xl sm:text-3xl mb-1 sm:mb-2 block" aria-hidden="true">
          {icon}
        </span>
        <p className="text-white/80 text-xs sm:text-sm font-medium leading-tight">{label}</p>
        <p className="text-2xl sm:text-3xl font-bold mt-0.5 sm:mt-1">{value}</p>
        {subtext && (
          <p className="text-white/70 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-tight">{subtext}</p>
        )}
      </div>
    </motion.div>
  );
}

export default StatCard;
