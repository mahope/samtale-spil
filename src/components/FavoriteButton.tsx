"use client";

import { motion } from "framer-motion";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

/**
 * Animated heart button for toggling favorites.
 * Includes haptic feedback animation and accessibility features.
 */
export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="min-w-[44px] min-h-[44px] p-2.5 sm:p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-rose-400 touch-manipulation flex items-center justify-center"
      aria-label={isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"}
      aria-pressed={isFavorite}
    >
      <motion.svg
        className="w-6 h-6 sm:w-6 sm:h-6"
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
}
