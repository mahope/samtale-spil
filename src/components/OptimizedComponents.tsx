"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/types";

// Memoized Depth Indicator - prevents re-renders when depth doesn't change
export const DepthIndicator = memo(function DepthIndicator({ 
  depth 
}: { 
  depth: Question["depth"] 
}) {
  const config = useMemo(() => ({
    let: { label: "Let", dots: 1, color: "bg-green-400" },
    medium: { label: "Medium", dots: 2, color: "bg-yellow-400" },
    dyb: { label: "Dyb", dots: 3, color: "bg-red-400" },
  }), []);

  const { label, dots, color } = config[depth];

  return (
    <div className="flex items-center gap-2" role="img" aria-label={`Sværhedsgrad: ${label}`}>
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i <= dots ? color : "bg-slate-300 dark:bg-slate-600"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</span>
    </div>
  );
});

// Memoized Favorite Button
export const FavoriteButton = memo(function FavoriteButton({
  isFavorite,
  onToggle,
}: {
  isFavorite: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-rose-400"
      aria-label={isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"}
      aria-pressed={isFavorite}
    >
      <motion.svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill={isFavorite ? "#ef4444" : "none"}
        stroke={isFavorite ? "#ef4444" : "currentColor"}
        strokeWidth={2}
        initial={false}
        animate={isFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </motion.svg>
    </motion.button>
  );
});

// Memoized decorative card preview for home page
export const DecorativeCard = memo(function DecorativeCard({ 
  color, 
  rotation, 
  index 
}: { 
  color: string; 
  rotation: number;
  index: number;
}) {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
      className={`w-16 h-24 md:w-20 md:h-28 rounded-xl bg-gradient-to-br ${color} shadow-lg`}
    />
  );
});

// Memoized progress bar component
export const ProgressBar = memo(function ProgressBar({
  current,
  total,
  label,
  showReset = false,
  onReset,
}: {
  current: number;
  total: number;
  label?: string;
  showReset?: boolean;
  onReset?: () => void;
}) {
  const progress = useMemo(() => 
    Math.min((current / total) * 100, 100),
    [current, total]
  );

  return (
    <div className="w-full">
      <div 
        className="h-2 bg-white/20 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={label || `${current} af ${total}`}
      >
        <motion.div
          className="h-full bg-white/80 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-2 text-white/80 text-xs">
        {showReset && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="hover:text-white transition-colors underline focus:ring-2 focus:ring-white/50 rounded px-1"
            aria-label="Nulstil fremskridt"
          >
            Nulstil
          </button>
        )}
        <span aria-live="polite" className={showReset ? "" : "ml-auto"}>
          {current} / {total} spørgsmål
        </span>
      </div>
    </div>
  );
});

// Memoized category emoji with animation
export const CategoryEmoji = memo(function CategoryEmoji({ 
  emoji 
}: { 
  emoji: string 
}) {
  return (
    <motion.span
      className="text-5xl mb-3"
      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
      transition={{ duration: 0.5 }}
      aria-hidden="true"
    >
      {emoji}
    </motion.span>
  );
});

// Gradient text component
export const GradientText = memo(function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span 
      className={`bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
});
