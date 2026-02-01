"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  useStreak, 
  getStreakMessage, 
  getStreakEmoji, 
  getMilestoneConfig,
  StreakMilestone 
} from "@/hooks/useStreak";
import { Confetti } from "./Confetti";
import { withErrorBoundary } from "@/components/ErrorBoundary";
import { StreakDisplayFallback, StreakBadgeFallback } from "@/components/fallbacks";

// Main streak display component for statistics page
function StreakDisplayInner({ className = "" }: { className?: string }) {
  const {
    currentStreak,
    longestStreak,
    isActive,
    isAtRisk,
    nextMilestone,
    daysUntilMilestone,
    isLoaded,
  } = useStreak();

  if (!isLoaded) {
    return (
      <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-2xl h-32 ${className}`} />
    );
  }

  const emoji = getStreakEmoji(currentStreak);
  const message = getStreakMessage(currentStreak, isAtRisk);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-6 text-white shadow-lg ${className}`}
    >
      {/* Background decorations */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      
      <div className="relative">
        {/* Main streak counter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-4xl"
              animate={currentStreak > 0 ? {
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              } : {}}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 2,
              }}
              aria-hidden="true"
            >
              {emoji}
            </motion.span>
            <div>
              <p className="text-white/80 text-sm font-medium">Streak</p>
              <div className="flex items-baseline gap-2">
                <motion.span
                  key={currentStreak}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-bold"
                >
                  {currentStreak}
                </motion.span>
                <span className="text-white/80 text-lg">
                  {currentStreak === 1 ? "dag" : "dage"}
                </span>
              </div>
            </div>
          </div>

          {/* At risk indicator */}
          {isAtRisk && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full"
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                aria-hidden="true"
              >
                ⚠️
              </motion.span>
              <span className="text-sm font-medium">I fare!</span>
            </motion.div>
          )}
        </div>

        {/* Message */}
        <p className="text-white/90 text-sm mb-4">{message}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-sm">
          {/* Longest streak */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-lg">
            <span aria-hidden="true">🏆</span>
            <span>Rekord: {longestStreak} dage</span>
          </div>

          {/* Next milestone */}
          {nextMilestone && daysUntilMilestone && daysUntilMilestone > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-lg">
              <span aria-hidden="true">🎯</span>
              <span>{daysUntilMilestone} til næste mål</span>
            </div>
          )}
        </div>

        {/* Progress to next milestone */}
        {nextMilestone && currentStreak > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/70 mb-1">
              <span>{currentStreak} dage</span>
              <span>{nextMilestone} dage</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/50"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStreak / nextMilestone) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Export wrapped with error boundary
export const StreakDisplay = withErrorBoundary(
  StreakDisplayInner,
  <StreakDisplayFallback />
);

// Compact streak badge for game pages
function StreakBadgeInner({ className = "" }: { className?: string }) {
  const { currentStreak, isActive, isAtRisk, isLoaded } = useStreak();

  if (!isLoaded || currentStreak === 0) {
    return null;
  }

  const emoji = getStreakEmoji(currentStreak);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
        isAtRisk
          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
          : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
      } ${className}`}
    >
      <motion.span
        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        aria-hidden="true"
      >
        {emoji}
      </motion.span>
      <span>{currentStreak}</span>
      {isAtRisk && (
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-xs"
          aria-hidden="true"
        >
          ⚠️
        </motion.span>
      )}
    </motion.div>
  );
}

// Export wrapped with error boundary
export const StreakBadge = withErrorBoundary(
  StreakBadgeInner,
  <StreakBadgeFallback />
);

// Streak milestone celebration modal
export function StreakCelebration() {
  const { pendingMilestone, dismissMilestone, currentStreak } = useStreak();

  if (!pendingMilestone) return null;

  const config = getMilestoneConfig(pendingMilestone);

  return (
    <>
      <Confetti isActive={!!pendingMilestone} duration={4000} pieceCount={80} />
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={dismissMilestone}
          role="dialog"
          aria-modal="true"
          aria-label={config.title}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`bg-gradient-to-br ${config.gradient} rounded-3xl p-8 shadow-2xl text-center max-w-sm mx-4 text-white`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated emoji */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: 3,
                repeatType: "reverse",
              }}
              className="text-7xl mb-4"
            >
              {config.emoji}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-2"
            >
              {config.title}
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 mb-6"
            >
              {config.message}
            </motion.p>

            {/* Streak count highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6"
            >
              <span className="text-2xl" aria-hidden="true">🔥</span>
              <span className="font-bold text-lg">{currentStreak} dages streak!</span>
            </motion.div>

            {/* Dismiss button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={dismissMilestone}
              className="w-full py-3 bg-white text-slate-800 rounded-xl font-semibold hover:bg-white/90 transition-colors"
            >
              Fantastisk! 🎉
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// Mini flame animation for inline use
export function FlameAnimation({ 
  size = "md",
  isActive = true,
}: { 
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
}) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  if (!isActive) {
    return <span className={`${sizes[size]} opacity-50`}>🔥</span>;
  }

  return (
    <motion.span
      className={sizes[size]}
      animate={{
        scale: [1, 1.1, 1],
        y: [0, -2, 0],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      aria-hidden="true"
    >
      🔥
    </motion.span>
  );
}
