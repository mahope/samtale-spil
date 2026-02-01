"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { formatDepth, getDepthColor } from "@/utils/dailyQuestion";
import { toDateKey } from "@/utils/date";
import { useShare } from "@/hooks/useShare";
import { 
  useDailyChallenge, 
  getDailyChallengeMessage,
  DAILY_CHALLENGE_POINTS 
} from "@/hooks/useDailyChallenge";
import { Confetti } from "@/components/Confetti";
import { withErrorBoundary } from "@/components/ErrorBoundary";
import { DailyChallengeFallback } from "@/components/fallbacks";

function DailyChallengeInner() {
  const {
    todaysChallenge,
    isCompletedToday,
    todaysPotentialPoints,
    currentStreak,
    longestStreak,
    isAtRisk,
    totalBonusPoints,
    completeChallenge,
    isLoaded,
  } = useDailyChallenge();

  const { question, category } = todaysChallenge;
  const { shareQuestion, copied, canShare } = useShare();
  const [showCelebration, setShowCelebration] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const handleShare = async () => {
    const today = new Date().toLocaleDateString("da-DK", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    await shareQuestion(
      question.text,
      `Daily Challenge (${today}) fra ${category.name}`
    );
  };

  const handleComplete = () => {
    if (!isCompletedToday) {
      completeChallenge();
      setJustCompleted(true);
      setShowCelebration(true);
      
      // Hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

  // Don't render anything until loaded
  if (!isLoaded) {
    return (
      <div className="w-full max-w-lg mx-auto mt-12 px-4">
        <div className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    );
  }

  const statusMessage = getDailyChallengeMessage(isCompletedToday, currentStreak, isAtRisk);

  return (
    <>
      {/* Confetti celebration */}
      <Confetti isActive={showCelebration} />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="w-full max-w-lg mx-auto mt-12 px-4"
        aria-labelledby="daily-challenge-title"
      >
        <div className={`relative overflow-hidden rounded-2xl p-[2px] shadow-xl ${
          isCompletedToday 
            ? "bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500"
            : isAtRisk
            ? "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500"
            : "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500"
        }`}>
          {/* Animated glow effect */}
          <div className={`absolute inset-0 opacity-50 blur-xl animate-pulse ${
            isCompletedToday 
              ? "bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400"
              : "bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400"
          }`} />

          <div className="relative rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={isCompletedToday ? { scale: [1, 1.2, 1] } : { rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-2xl"
                  aria-hidden="true"
                >
                  {isCompletedToday ? "✅" : isAtRisk ? "⚠️" : "🎯"}
                </motion.span>
                <h2
                  id="daily-challenge-title"
                  className={`text-sm font-semibold uppercase tracking-wider ${
                    isCompletedToday 
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-purple-600 dark:text-purple-400"
                  }`}
                >
                  Daily Challenge
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {/* Points badge */}
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                  isCompletedToday
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                }`}>
                  <span aria-hidden="true">⭐</span>
                  {isCompletedToday ? `+${DAILY_CHALLENGE_POINTS.base}` : `${todaysPotentialPoints}p`}
                </span>
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
            </div>

            {/* Streak display */}
            {(currentStreak > 0 || isCompletedToday) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-4 flex items-center justify-between px-3 py-2 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg" aria-hidden="true">🔥</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {currentStreak} dages streak
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Rekord: {longestStreak}
                </span>
              </motion.div>
            )}

            {/* Status message */}
            <motion.p
              key={statusMessage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm mb-3 font-medium ${
                isCompletedToday 
                  ? "text-emerald-600 dark:text-emerald-400"
                  : isAtRisk
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {statusMessage}
            </motion.p>

            {/* Question */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className={`text-xl md:text-2xl font-medium mb-5 leading-relaxed ${
                isCompletedToday 
                  ? "text-slate-600 dark:text-slate-300"
                  : "text-slate-800 dark:text-white"
              }`}
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

              {/* Bonus points info */}
              {!isCompletedToday && currentStreak > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                  +{Math.min(currentStreak * DAILY_CHALLENGE_POINTS.streakBonus, DAILY_CHALLENGE_POINTS.maxStreakBonus)} streak bonus
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Complete challenge / Play category button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                {isCompletedToday ? (
                  <Link
                    href={`/spil/${category.id}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium shadow-lg hover:shadow-xl transition-shadow focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Gennemført! Spil mere
                  </Link>
                ) : (
                  <button
                    onClick={handleComplete}
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Fuldfør Challenge (+{todaysPotentialPoints}p)
                  </button>
                )}
              </motion.div>

              {/* Share button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600"
                aria-label={copied ? "Kopieret!" : canShare ? "Del dagens challenge" : "Kopiér dagens challenge"}
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

            {/* Total points earned */}
            {totalBonusPoints > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700"
              >
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Total bonus points optjent: <span className="font-bold text-violet-600 dark:text-violet-400">{totalBonusPoints}</span>
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Just completed celebration overlay */}
      <AnimatePresence>
        {justCompleted && showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowCelebration(false);
              setJustCompleted(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-2xl max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Daily Challenge Klaret!
              </h3>
              <p className="text-lg text-violet-600 dark:text-violet-400 font-bold mb-2">
                +{todaysPotentialPoints || DAILY_CHALLENGE_POINTS.base} bonus points!
              </p>
              {currentStreak > 1 && (
                <p className="text-slate-600 dark:text-slate-300">
                  🔥 {currentStreak} dages streak!
                </p>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowCelebration(false);
                  setJustCompleted(false);
                }}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full font-medium"
              >
                Fedt! 🚀
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Export wrapped with error boundary
export const DailyChallenge = withErrorBoundary(
  DailyChallengeInner,
  <DailyChallengeFallback />
);
