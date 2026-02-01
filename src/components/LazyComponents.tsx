"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { LoadingSpinner, LoadingDots } from "./LoadingSpinner";

// Lazy load heavy components that are not needed immediately
export const LazyConfetti = dynamic(
  () => import("./Confetti").then((mod) => ({ default: mod.Confetti })),
  { ssr: false }
);

export const LazyCelebrationOverlay = dynamic(
  () => import("./Confetti").then((mod) => ({ default: mod.CelebrationOverlay })),
  { ssr: false }
);

export const LazyCelebrationBurst = dynamic(
  () => import("./Confetti").then((mod) => ({ default: mod.CelebrationBurst })),
  { ssr: false }
);

export const LazyFloatingParticles = dynamic(
  () => import("./FloatingParticles").then((mod) => ({ default: mod.FloatingParticles })),
  { ssr: false }
);

export const LazyFloatingHearts = dynamic(
  () => import("./FloatingParticles").then((mod) => ({ default: mod.FloatingHearts })),
  { ssr: false }
);

export const LazyFloatingBubbles = dynamic(
  () => import("./FloatingParticles").then((mod) => ({ default: mod.FloatingBubbles })),
  { ssr: false }
);

export const LazyAchievementToast = dynamic(
  () => import("./AchievementToast").then((mod) => ({ default: mod.AchievementToast })),
  { ssr: false }
);

export const LazyShareStatsModal = dynamic(
  () => import("./ShareStatsModal").then((mod) => ({ default: mod.ShareStatsModal })),
  { ssr: false }
);

export const LazyDailyQuestion = dynamic(
  () => import("./DailyQuestion").then((mod) => ({ default: mod.DailyQuestion })),
  { ssr: false, loading: () => <DailyQuestionSkeleton /> }
);

export const LazyDailyChallenge = dynamic(
  () => import("./DailyChallenge").then((mod) => ({ default: mod.DailyChallenge })),
  { ssr: false, loading: () => <DailyChallengeSkeleton /> }
);

// Polished skeleton for DailyQuestion with smooth animations
function DailyQuestionSkeleton() {
  return (
    <motion.div 
      className="mt-12 w-full max-w-md mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 p-6 shadow-lg">
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "200%" }}
        />
        
        <div className="relative z-10">
          {/* Header with spinner */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <motion.span
                className="text-2xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
              <div className="h-4 w-28 bg-violet-200/60 dark:bg-white/10 rounded" />
            </div>
            <LoadingDots size="sm" variant="primary" />
          </div>
          
          {/* Question placeholder */}
          <div className="space-y-2 mb-4">
            <div className="h-5 bg-violet-200/60 dark:bg-white/10 rounded w-full" />
            <div className="h-5 bg-violet-200/60 dark:bg-white/10 rounded w-3/4" />
          </div>
          
          {/* Badges */}
          <div className="flex gap-2 mb-4">
            <div className="h-7 w-24 bg-violet-200/60 dark:bg-white/10 rounded-full" />
            <div className="h-7 w-16 bg-violet-200/60 dark:bg-white/10 rounded-full" />
          </div>
          
          {/* Button placeholder */}
          <div className="h-12 bg-violet-300/50 dark:bg-white/10 rounded-xl" />
        </div>
      </div>
    </motion.div>
  );
}

// Polished skeleton for DailyChallenge with smooth animations
function DailyChallengeSkeleton() {
  return (
    <motion.div 
      className="mt-12 w-full max-w-lg mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-200 via-purple-200 to-fuchsia-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 p-[2px] shadow-xl">
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="relative rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-6">
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-100/30 dark:via-white/5 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "200%" }}
          />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎯
                </motion.span>
                <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-14 bg-amber-100 dark:bg-amber-900/30 rounded-full" />
                <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
            
            {/* Status message */}
            <div className="flex items-center gap-2 mb-3">
              <LoadingSpinner size="sm" variant="primary" />
              <span className="text-sm text-slate-400 dark:text-slate-500">Henter dagens challenge...</span>
            </div>
            
            {/* Question placeholder */}
            <div className="space-y-2 mb-5">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full" />
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
            </div>
            
            {/* Meta badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <div className="h-7 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="h-7 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 h-12 bg-gradient-to-r from-violet-200 to-purple-200 dark:from-slate-700 dark:to-slate-600 rounded-xl" />
              <div className="h-12 w-full sm:w-24 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const LazyRecommendations = dynamic(
  () => import("./Recommendations").then((mod) => ({ default: mod.Recommendations })),
  { ssr: false, loading: () => <RecommendationsSkeleton /> }
);

// Skeleton for Recommendations while loading
function RecommendationsSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 px-4 animate-pulse">
      <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
      <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
            <div className="h-9 w-28 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const LazyCustomQuestionsBanner = dynamic(
  () => import("./CustomQuestionsBanner").then((mod) => ({ default: mod.CustomQuestionsBanner })),
  { ssr: false }
);
