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
