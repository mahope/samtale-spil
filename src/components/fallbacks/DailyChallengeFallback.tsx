"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function DailyChallengeFallback() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto mt-12 px-4"
    >
      <div className="relative overflow-hidden rounded-2xl p-[2px] shadow-xl bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600">
        <div className="relative rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl" aria-hidden="true">⚠️</span>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Daily Challenge
            </h2>
          </div>

          <div className="text-center py-6">
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Dagens udfordring kunne ikke indlæses lige nu.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Dine streak og points er gemt sikkert.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
                Genindlæs
              </motion.button>
              <Link
                href="/spil"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Spil i stedet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
