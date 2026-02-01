"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for the /spil routes.
 * Shows a game-themed error page with options to retry or browse categories.
 */
export default function SpilError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Game Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-md"
        style={{ perspective: 1000 }}
      >
        {/* Card-like error display */}
        <div className="relative">
          {/* Stacked cards effect */}
          <div className="absolute inset-0 -rotate-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl opacity-60 transform translate-y-2" />
          <div className="absolute inset-0 rotate-2 bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl opacity-40 transform translate-y-4" />
          
          {/* Main card */}
          <motion.div
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-[2px] shadow-2xl"
          >
            <div className="relative rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-6 sm:p-8">
              {/* Icon with animation */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1 
                }}
                className="text-6xl sm:text-7xl text-center mb-4"
                aria-hidden="true"
              >
                🃏
              </motion.div>

              <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 dark:text-white mb-2">
                Kortene blev blandet forkert!
              </h1>

              <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
                Der skete en fejl under spillet. Lad os prøve at blande kortene igen!
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                {/* Retry button */}
                <motion.button
                  type="button"
                  onClick={reset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-shadow focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
                >
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </motion.svg>
                  Bland kortene igen
                </motion.button>

                {/* Browse categories */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/spil"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                    Vælg ny kategori
                  </Link>
                </motion.div>

                {/* Home link */}
                <Link
                  href="/"
                  className="text-center text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  ← Tilbage til forsiden
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
