"use client";

import { useStreak } from "@/hooks/useStreak";

/**
 * Small, quiet note in the game header about how many days in a row you have
 * played. Shown only from day two; no celebrations, no flames.
 */
export function StreakBadge({ className = "" }: { className?: string }) {
  const { currentStreak, isLoaded } = useStreak();
  if (!isLoaded || currentStreak < 2) return null;

  return (
    <span
      className={`inline-flex items-center rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-white ${className}`}
      title={`I har spillet ${currentStreak} dage i træk`}
    >
      {currentStreak} dage i træk
    </span>
  );
}
