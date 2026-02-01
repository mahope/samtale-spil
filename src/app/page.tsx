"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PageTransition } from "@/components/PageTransition";
import { ShareProgressButton } from "@/components/ShareProgressButton";
import { DailyQuestion } from "@/components/DailyQuestion";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Theme toggle and share in corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-4 right-4 z-10 flex items-center gap-2"
      >
        <ShareProgressButton className="text-slate-600 dark:text-slate-400" />
        <ThemeToggle className="text-slate-600 dark:text-slate-400" />
      </motion.div>

      <main id="main-content" className="flex min-h-screen flex-col items-center justify-center px-6 py-12" role="main">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
            aria-hidden="true"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-400 to-violet-500 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-4"
          >
            Samtalekort
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-4"
          >
            Dybe samtaler med dem du holder af
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-md mx-auto"
          >
            Stil de spørgsmål der betyder noget. Perfekt til parforholdet, 
            familien eller vennerne.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/spil"
                className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-rose-500 to-violet-500 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-800 relative overflow-hidden"
                aria-label="Start samtalen - gå til kategorivalg"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
                <span className="relative">Start samtalen</span>
                <motion.svg
                  className="w-5 h-5 relative"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Install hint for PWA */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-sm text-slate-500 dark:text-slate-400 mt-6"
          >
            <span aria-hidden="true">💡</span> Installer appen på din telefon for offline adgang
          </motion.p>
        </motion.div>

        {/* Daily Question Section */}
        <DailyQuestion />

        {/* Decorative Cards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 flex gap-4 perspective-1000"
          aria-hidden="true"
          role="presentation"
        >
          {[
            { color: "from-rose-400 to-rose-500", rotation: -12 },
            { color: "from-amber-400 to-orange-500", rotation: -4 },
            { color: "from-violet-400 to-purple-500", rotation: 4 },
            { color: "from-emerald-400 to-teal-500", rotation: 12 },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ rotate: 0 }}
              animate={{ rotate: card.rotation }}
              transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
              className={`w-16 h-24 md:w-20 md:h-28 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}
            />
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 text-sm text-slate-500 dark:text-slate-400"
        >
          Skabt med <span aria-label="kærlighed">❤️</span> for bedre samtaler
        </motion.footer>
      </main>
      </div>
    </PageTransition>
  );
}
