"use client";

import { motion } from "framer-motion";

export function StreakDisplayFallback({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 p-6 text-white shadow-lg ${className}`}
    >
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl opacity-50" aria-hidden="true">🔥</span>
          <div>
            <p className="text-white/80 text-sm font-medium">Streak</p>
            <span className="text-4xl font-bold opacity-50">—</span>
          </div>
        </div>

        <p className="text-white/70 text-sm mb-4">
          Kunne ikke indlæse streak data
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Prøv igen
        </motion.button>
      </div>
    </motion.div>
  );
}

export function StreakBadgeFallback({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 ${className}`}
    >
      <span className="opacity-50" aria-hidden="true">🔥</span>
      <span>—</span>
    </div>
  );
}
