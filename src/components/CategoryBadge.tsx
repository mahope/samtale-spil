"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CategoryBadgeInfo } from "@/hooks/useCategoryBadges";
import { useFocusTrap } from "@/hooks/useFocusTrap";

// Individual badge component
export function CategoryBadge({
  badge,
  size = "medium",
  showProgress = false,
  delay = 0,
}: {
  badge: CategoryBadgeInfo;
  size?: "small" | "medium" | "large";
  showProgress?: boolean;
  delay?: number;
}) {
  const sizeClasses = {
    small: "w-12 h-12 text-xl",
    medium: "w-16 h-16 text-2xl",
    large: "w-24 h-24 text-4xl",
  };

  const ringSize = {
    small: "w-14 h-14",
    medium: "w-20 h-20",
    large: "w-28 h-28",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative">
        {/* Badge ring/border */}
        <div
          className={`absolute inset-0 ${ringSize[size]} -m-2 rounded-full bg-gradient-to-br ${badge.color} ${
            badge.isUnlocked ? "opacity-100" : "opacity-20"
          }`}
        />
        
        {/* Badge circle */}
        <motion.div
          className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center ${
            badge.isUnlocked
              ? `bg-gradient-to-br ${badge.color} shadow-lg`
              : "bg-slate-200 dark:bg-slate-700"
          }`}
          animate={
            badge.isUnlocked
              ? {
                  boxShadow: [
                    "0 0 0 0 rgba(255,255,255,0)",
                    "0 0 20px 4px rgba(255,255,255,0.3)",
                    "0 0 0 0 rgba(255,255,255,0)",
                  ],
                }
              : {}
          }
          transition={{
            repeat: badge.isUnlocked ? Infinity : 0,
            duration: 2,
            delay: delay + 0.5,
          }}
        >
          <span
            className={`${badge.isUnlocked ? "" : "grayscale opacity-40"}`}
            aria-hidden="true"
          >
            {badge.emoji}
          </span>
          
          {/* Lock overlay for locked badges */}
          {!badge.isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-slate-400 dark:text-slate-500 text-sm">
                🔒
              </span>
            </div>
          )}
        </motion.div>

        {/* Progress ring for locked badges */}
        {!badge.isUnlocked && showProgress && (
          <svg
            className={`absolute inset-0 ${ringSize[size]} -m-2 -rotate-90`}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-slate-200 dark:text-slate-700"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${badge.progressPercent * 2.83} 283`}
              initial={{ strokeDasharray: "0 283" }}
              animate={{ strokeDasharray: `${badge.progressPercent * 2.83} 283` }}
              transition={{ delay: delay + 0.3, duration: 0.8 }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Checkmark for unlocked */}
        {badge.isUnlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3, type: "spring" }}
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-md"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Label */}
      <div className="text-center">
        <p className={`font-medium ${badge.isUnlocked ? "text-slate-800 dark:text-white" : "text-slate-400 dark:text-slate-500"} ${size === "small" ? "text-xs" : "text-sm"}`}>
          {badge.name}
        </p>
        {showProgress && !badge.isUnlocked && (
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {badge.progress}/{badge.total}
          </p>
        )}
        {badge.isUnlocked && badge.unlockedAt && (
          <p className="text-xs text-emerald-500 dark:text-emerald-400">
            ✓ Låst op
          </p>
        )}
      </div>
    </motion.div>
  );
}

// Badge grid for displaying all badges
export function BadgeGrid({
  badges,
  showProgress = true,
}: {
  badges: CategoryBadgeInfo[];
  showProgress?: boolean;
}) {
  // Sort: unlocked first, then by progress
  const sortedBadges = [...badges].sort((a, b) => {
    if (a.isUnlocked && !b.isUnlocked) return -1;
    if (!a.isUnlocked && b.isUnlocked) return 1;
    return b.progressPercent - a.progressPercent;
  });

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
      {sortedBadges.map((badge, index) => (
        <CategoryBadge
          key={badge.categoryId}
          badge={badge}
          showProgress={showProgress}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}

// Next badge progress card
export function NextBadgeProgress({
  badge,
}: {
  badge: CategoryBadgeInfo | null;
}) {
  if (!badge) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-6 text-white text-center"
      >
        <span className="text-4xl mb-2 block">🏆</span>
        <h3 className="font-bold text-lg">Alle badges låst op!</h3>
        <p className="text-white/80 text-sm mt-1">
          Tillykke! Du har gennemført alle kategorier
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${badge.color} rounded-2xl p-6 text-white relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full" />
      
      <div className="relative flex items-center gap-4">
        {/* Badge preview */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-3xl opacity-60">{badge.emoji}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
            <span className="text-xs">🔒</span>
          </div>
        </div>

        {/* Progress info */}
        <div className="flex-1">
          <p className="text-white/70 text-xs uppercase tracking-wide font-medium">
            Næste badge
          </p>
          <h3 className="font-bold text-lg">{badge.name}</h3>
          <div className="mt-2">
            {/* Progress bar */}
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/80 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${badge.progressPercent}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
            <p className="text-white/80 text-sm mt-1">
              <span className="font-bold">{badge.progress}</span>/{badge.total} spørgsmål
              <span className="text-white/60 ml-2">
                ({badge.questionsRemaining} tilbage)
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Badge unlock celebration modal
export function BadgeUnlockCelebration({
  badge,
  onDismiss,
}: {
  badge: CategoryBadgeInfo | null;
  onDismiss: () => void;
}) {
  const focusTrapRef = useFocusTrap<HTMLDivElement>({
    isActive: !!badge,
    onEscape: onDismiss,
  });

  if (!badge) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onDismiss}
        role="dialog"
        aria-modal="true"
        aria-labelledby="badge-celebration-title"
      >
        <motion.div
          ref={focusTrapRef}
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl text-center max-w-sm mx-4 relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-10`} />
          
          <div className="relative">
            {/* Trophy animation */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: 2,
                repeatType: "reverse",
              }}
              className="text-6xl mb-4"
            >
              🏆
            </motion.div>

            <h2 
              id="badge-celebration-title"
              className="text-2xl font-bold text-slate-800 dark:text-white mb-2"
            >
              Badge låst op!
            </h2>

            {/* Badge display */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="my-6"
            >
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg`}>
                <span className="text-5xl">{badge.emoji}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className={`text-xl font-bold bg-gradient-to-r ${badge.color} bg-clip-text text-transparent`}>
                {badge.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Du har besvaret alle {badge.total} spørgsmål! 🎉
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDismiss}
              className={`mt-6 px-8 py-3 bg-gradient-to-r ${badge.color} text-white rounded-xl font-medium shadow-lg`}
            >
              Fantastisk! 🌟
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Compact badge display for inline use
export function BadgeInline({
  badge,
  showLabel = true,
}: {
  badge: CategoryBadgeInfo;
  showLabel?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          badge.isUnlocked
            ? `bg-gradient-to-br ${badge.color}`
            : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <span className={`text-sm ${badge.isUnlocked ? "" : "grayscale opacity-40"}`}>
          {badge.emoji}
        </span>
      </div>
      {showLabel && (
        <span className={`text-sm ${badge.isUnlocked ? "text-slate-800 dark:text-white font-medium" : "text-slate-400"}`}>
          {badge.name}
        </span>
      )}
    </div>
  );
}

// Stats summary for badges
export function BadgeStats({
  unlockedCount,
  totalCount,
}: {
  unlockedCount: number;
  totalCount: number;
}) {
  const percent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-5 text-white shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl mb-2 block" aria-hidden="true">
            🎖️
          </span>
          <p className="text-white/80 text-sm font-medium">Badges optjent</p>
          <p className="text-3xl font-bold mt-1">
            {unlockedCount}/{totalCount}
          </p>
        </div>
        <div className="w-16 h-16 relative">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percent * 2.51} 251`}
              initial={{ strokeDasharray: "0 251" }}
              animate={{ strokeDasharray: `${percent * 2.51} 251` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
            {percent}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
