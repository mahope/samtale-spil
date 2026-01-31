"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SpilPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-6">
            Vælg en kategori
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
            Kategorier kommer snart...
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors"
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
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            Tilbage til forsiden
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
