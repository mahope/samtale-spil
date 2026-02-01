"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCustomQuestions } from "@/hooks/useCustomQuestions";

export function CustomQuestionsBanner() {
  const { stats, isLoaded } = useCustomQuestions();

  // Don't render if not loaded or no custom questions
  if (!isLoaded || stats.total === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mt-8 w-full max-w-md mx-auto px-4"
    >
      <Link
        href="/mine-spoergsmaal"
        className="group block"
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 rounded-2xl p-4 border border-violet-200/50 dark:border-violet-700/50 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">✍️</span>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  Du har {stats.total} {stats.total === 1 ? "eget spørgsmål" : "egne spørgsmål"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Tryk for at se eller oprette flere
                </p>
              </div>
            </div>
            <motion.svg
              className="w-5 h-5 text-violet-500 dark:text-violet-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </div>

          {/* Depth breakdown */}
          <div className="mt-3 flex gap-2 text-xs">
            {stats.byDepth.let > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                🟢 {stats.byDepth.let} let
              </span>
            )}
            {stats.byDepth.medium > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300">
                🟡 {stats.byDepth.medium} medium
              </span>
            )}
            {stats.byDepth.dyb > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300">
                🔴 {stats.byDepth.dyb} dyb
              </span>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
