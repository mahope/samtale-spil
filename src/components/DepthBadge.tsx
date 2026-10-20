"use client";

/**
 * Depth (let / medium / dyb) shown the same way everywhere: one to three pips,
 * like the rank on a playing card. The pips themselves live in deck/DeckParts.
 */

import { motion } from "motion/react";
import { DepthPips } from "@/components/deck/DeckParts";

export type DepthLevel = "let" | "medium" | "dyb";

export interface DepthConfig {
  id: DepthLevel;
  label: string;
  shortLabel: string;
  /** Kept for older callers; always empty, depth is drawn with pips */
  emoji: string;
  color: string;
  dotColor: string;
  dots: number;
}

const NEUTRAL = "bg-flade-2 text-blaek";

export const DEPTH_CONFIG: Record<DepthLevel, DepthConfig> = {
  let: { id: "let", label: "Let", shortLabel: "Let", emoji: "", color: NEUTRAL, dotColor: "bg-blaek", dots: 1 },
  medium: { id: "medium", label: "Medium", shortLabel: "Mellem", emoji: "", color: NEUTRAL, dotColor: "bg-blaek", dots: 2 },
  dyb: { id: "dyb", label: "Dyb", shortLabel: "Dyb", emoji: "", color: NEUTRAL, dotColor: "bg-blaek", dots: 3 },
};

export const DEPTH_OPTIONS = Object.values(DEPTH_CONFIG);

export function getDepthConfig(depth: DepthLevel): DepthConfig {
  return DEPTH_CONFIG[depth];
}

interface BaseDepthProps {
  depth: DepthLevel;
  className?: string;
}

/** Label only */
export function DepthBadge({ depth, className = "" }: BaseDepthProps) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${NEUTRAL} ${className}`}>
      {DEPTH_CONFIG[depth].label}
    </span>
  );
}

/** Pips and label (name kept for older callers) */
export function DepthBadgeWithEmoji({ depth, className = "" }: BaseDepthProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ${NEUTRAL} ${className}`}>
      <DepthPips depth={depth} color="currentColor" />
      <span aria-hidden="true">{DEPTH_CONFIG[depth].label}</span>
    </span>
  );
}

/** Pips with label, for use on cards */
export function DepthIndicator({ depth, className = "" }: BaseDepthProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium text-blaek-2 ${className}`}>
      <DepthPips depth={depth} color="currentColor" />
      <span aria-hidden="true">{DEPTH_CONFIG[depth].label}</span>
    </span>
  );
}

interface DepthSelectorProps {
  value: DepthLevel;
  onChange: (depth: DepthLevel) => void;
  className?: string;
}

/** Choose a depth in forms */
export function DepthSelector({ value, onChange, className = "" }: DepthSelectorProps) {
  return (
    <div className={`flex gap-2 sm:gap-3 ${className}`} role="radiogroup" aria-label="Dybde">
      {DEPTH_OPTIONS.map((option) => {
        const selected = value === option.id;
        return (
          <motion.button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.id)}
            whileTap={{ scale: 0.97 }}
            className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-2 text-sm font-semibold transition-colors sm:px-3 ${
              selected
                ? "bg-bord text-white dark:bg-kridt dark:text-kridt-blaek"
                : "bg-flade-2 text-blaek hover:bg-streg"
            }`}
          >
            <DepthPips depth={option.id} color="currentColor" />
            <span aria-hidden="true">{option.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default DepthBadge;
