"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getDailyQuestion, formatDepth, getDepthColor } from "@/utils/dailyQuestion";
import { toDateKey } from "@/utils/date";
import { useShare } from "@/hooks/useShare";

export function DailyQuestion() {
  const { question, category } = getDailyQuestion();
  const { shareQuestion, copied, canShare } = useShare();

  const handleShare = async () => {
    const today = new Date().toLocaleDateString("da-DK", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const shareText = `🌟 Dagens spørgsmål (${today}):\n\n"${question.text}"\n\n${category.emoji} Kategori: ${category.name}\n\n— Samtalekort`;
    await shareQuestion(question.text, `Dagens spørgsmål fra ${category.name}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="w-full max-w-lg mx-auto mt-12 px-4"
      aria-labelledby="daily-question-title"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-[2px] shadow-xl">
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 opacity-50 blur-xl animate-pulse" />

        <div className="relative rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-2xl"
                aria-hidden="true"
              >
                ✨
              </motion.span>
              <h2
                id="daily-question-title"
                className="text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400"
              >
                Dagens spørgsmål
              </h2>
            </div>
            <time
              className="text-xs text-slate-500 dark:text-slate-400"
              dateTime={toDateKey()}
            >
              {new Date().toLocaleDateString("da-DK", {
                day: "numeric",
                month: "short",
              })}
            </time>
          </div>

          {/* Question */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-xl md:text-2xl font-medium text-slate-800 dark:text-white mb-5 leading-relaxed"
          >
            &ldquo;{question.text}&rdquo;
          </motion.blockquote>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {/* Category badge */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white shadow-sm`}>
              <span aria-hidden="true">{category.emoji}</span>
              {category.name}
            </span>

            {/* Depth badge */}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDepthColor(question.depth)}`}>
              {formatDepth(question.depth)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Play category button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Link
                href={`/spil/${category.id}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-shadow focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Spil {category.name}
              </Link>
            </motion.div>

            {/* Share button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600"
              aria-label={copied ? "Kopieret!" : canShare ? "Del dagens spørgsmål" : "Kopiér dagens spørgsmål"}
            >
              {copied ? (
                <>
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Kopieret!
                </>
              ) : (
                <>
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Del
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
