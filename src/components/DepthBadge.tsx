"use client";

/**
 * DepthBadge - Unified depth indicator component
 *
 * Replaces duplicated depth indicators from:
 * - CategoryPlayClient.tsx (DepthIndicator with dots)
 * - favoritter/page.tsx (DepthBadge)
 * - SearchOverlay.tsx (DEPTH_CONFIG)
 * - mine-spoergsmaal/page.tsx (DEPTH_OPTIONS)
 */

import { motion } from "framer-motion";

export type DepthLevel = "let" | "medium" | "dyb";

export interface DepthConfig {
  id: DepthLevel;
  label: string;
  shortLabel: string;
  emoji: string;
  color: string;
  dotColor: string;
  dots: number;
}

/**
 * Central depth configuration - single source of truth
 */
export const DEPTH_CONFIG: Record<DepthLevel, DepthConfig> = {
  let: {
    id: "let",
    label: "Let",
    shortLabel: "Let",
    emoji: "🟢",
    color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    dotColor: "bg-green-400",
    dots: 1,
  },
  medium: {
    id: "medium",
    label: "Medium",
    shortLabel: "Mid",
    emoji: "🟡",
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
    dotColor: "bg-yellow-400",
    dots: 2,
  },
  dyb: {
    id: "dyb",
    label: "Dyb",
    shortLabel: "Dyb",
    emoji: "🔴",
    color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    dotColor: "bg-red-400",
    dots: 3,
  },
};

/**
 * Array of depth options for selectors/forms
 */
export const DEPTH_OPTIONS = Object.values(DEPTH_CONFIG);

/**
 * Get depth config by level
 */
export function getDepthConfig(depth: DepthLevel): DepthConfig {
  return DEPTH_CONFIG[depth];
}

// ============================================
// Component Variants
// ============================================

interface BaseDepthProps {
  depth: DepthLevel;
  className?: string;
}

/**
 * DepthBadge - Simple badge with label (no emoji)
 * Used in: favoritter/page.tsx
 */
export function DepthBadge({ depth, className = "" }: BaseDepthProps) {
  const config = DEPTH_CONFIG[depth];

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}
    >
      {config.label}
    </span>
  );
}

/**
 * DepthBadgeWithEmoji - Badge with emoji prefix
 * Used in: SearchOverlay.tsx, mine-spoergsmaal/page.tsx
 */
export function DepthBadgeWithEmoji({ depth, className = "" }: BaseDepthProps) {
  const config = DEPTH_CONFIG[depth];

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}
    >
      {config.emoji} {config.label}
    </span>
  );
}

/**
 * DepthIndicator - Dots indicator with label
 * Used in: CategoryPlayClient.tsx (game card)
 */
export function DepthIndicator({ depth, className = "" }: BaseDepthProps) {
  const config = DEPTH_CONFIG[depth];

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="img"
      aria-label={`Sværhedsgrad: ${config.label}`}
    >
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i <= config.dots ? config.dotColor : "bg-slate-300 dark:bg-slate-600"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {config.label}
      </span>
    </div>
  );
}

/**
 * DepthSelector - Interactive selector for forms
 * Used in: mine-spoergsmaal/page.tsx (form)
 */
interface DepthSelectorProps {
  value: DepthLevel;
  onChange: (depth: DepthLevel) => void;
  className?: string;
}

export function DepthSelector({ value, onChange, className = "" }: DepthSelectorProps) {
  return (
    <div className={`flex gap-2 sm:gap-3 ${className}`}>
      {DEPTH_OPTIONS.map((option) => (
        <motion.button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          whileTap={{ scale: 0.95 }}
          className={`flex-1 py-3 sm:py-2 px-2 sm:px-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1 sm:gap-1.5 min-h-[44px] ${
            value === option.id
              ? option.color + " ring-2 ring-offset-2 ring-slate-400 dark:ring-slate-600"
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 active:bg-slate-300 dark:active:bg-slate-500"
          }`}
        >
          <span className="text-base">{option.emoji}</span>
          <span className="hidden xs:inline">{option.label}</span>
          <span className="xs:hidden">{option.shortLabel}</span>
        </motion.button>
      ))}
    </div>
  );
}

// Default export for backwards compatibility
export default DepthBadge;
