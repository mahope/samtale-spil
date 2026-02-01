"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary for the app.
 * Catches unhandled errors and displays a user-friendly error page.
 */
export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md"
      >
        {/* Error card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 p-[2px] shadow-xl">
          {/* Animated glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 opacity-40 blur-xl animate-pulse" />
          
          <div className="relative rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-6 sm:p-8">
            {/* Icon */}
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-6xl sm:text-7xl text-center mb-4"
              aria-hidden="true"
            >
              😵
            </motion.div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 dark:text-white mb-2">
              Ups! Noget gik galt
            </h1>

            {/* Description */}
            <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
              Der skete en uventet fejl. Bare rolig – det sker for de bedste!
            </p>

            {/* Error details (collapsed by default) */}
            {process.env.NODE_ENV === "development" && (
              <details className="mb-6 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm">
                <summary className="cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                  Tekniske detaljer
                </summary>
                <pre className="mt-2 p-2 overflow-x-auto text-xs text-red-600 dark:text-red-400 bg-slate-200 dark:bg-slate-700 rounded">
                  {error.message}
                </pre>
                {error.digest && (
                  <p className="mt-1 text-xs text-slate-500">
                    Digest: {error.digest}
                  </p>
                )}
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Try again button */}
              <motion.button
                type="button"
                onClick={reset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-shadow focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Prøv igen
              </motion.button>

              {/* Go home button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600"
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Gå til forsiden
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Helpful tip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4"
        >
          💡 Tip: Prøv at genindlæse siden eller ryd browserens cache
        </motion.p>
      </motion.div>
    </div>
  );
}
