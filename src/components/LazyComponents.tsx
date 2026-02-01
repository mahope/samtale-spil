"use client";

import dynamic from "next/dynamic";

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

// Skeleton for DailyQuestion while loading
function DailyQuestionSkeleton() {
  return (
    <div className="mt-12 w-full max-w-md mx-auto animate-pulse">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <div className="h-4 w-24 bg-white/10 rounded mb-4"></div>
        <div className="h-6 bg-white/10 rounded mb-2"></div>
        <div className="h-6 w-3/4 bg-white/10 rounded"></div>
      </div>
    </div>
  );
}

// Skeleton for DailyChallenge while loading
function DailyChallengeSkeleton() {
  return (
    <div className="mt-12 w-full max-w-lg mx-auto px-4 animate-pulse">
      <div className="rounded-2xl bg-gradient-to-br from-violet-200 to-purple-200 dark:from-slate-700 dark:to-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-32 bg-white/30 dark:bg-white/10 rounded"></div>
          <div className="h-4 w-16 bg-white/30 dark:bg-white/10 rounded"></div>
        </div>
        <div className="h-6 bg-white/30 dark:bg-white/10 rounded mb-2"></div>
        <div className="h-6 w-3/4 bg-white/30 dark:bg-white/10 rounded mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-20 bg-white/30 dark:bg-white/10 rounded-full"></div>
          <div className="h-6 w-16 bg-white/30 dark:bg-white/10 rounded-full"></div>
        </div>
        <div className="h-12 bg-white/30 dark:bg-white/10 rounded-xl"></div>
      </div>
    </div>
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
