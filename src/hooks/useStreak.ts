"use client";

import { useCallback, useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { TIMING, STORAGE_KEYS } from "@/constants";
import { toDateKey, getDaysDifference } from "@/utils/date";

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  totalActiveDays: number;
}

const DEFAULT_STREAK_DATA: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  totalActiveDays: 0,
};

// Milestone thresholds for celebrations
export const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100] as const;
export type StreakMilestone = typeof STREAK_MILESTONES[number];

export function useStreak() {
  const [streakData, setStreakData, isLoaded] = useLocalStorage<StreakData>(
    STORAGE_KEYS.STREAK,
    DEFAULT_STREAK_DATA
  );
  const [pendingMilestone, setPendingMilestone] = useState<StreakMilestone | null>(null);
  const [recentlyBroken, setRecentlyBroken] = useState(false);

  // Calculate streak status
  const getStreakStatus = useCallback((): {
    isActive: boolean;
    isAtRisk: boolean;
    daysSinceActivity: number;
  } => {
    if (!streakData.lastActiveDate) {
      return { isActive: false, isAtRisk: false, daysSinceActivity: Infinity };
    }

    const today = toDateKey();
    const daysDiff = getDaysDifference(streakData.lastActiveDate, today);

    return {
      isActive: daysDiff <= 1, // Active if played today or yesterday
      isAtRisk: daysDiff === 1, // At risk if last played yesterday
      daysSinceActivity: daysDiff,
    };
  }, [streakData.lastActiveDate]);

  // Record activity for today
  const recordActivity = useCallback(() => {
    const today = toDateKey();

    setStreakData((prev) => {
      // If already played today, no change
      if (prev.lastActiveDate === today) {
        return prev;
      }

      let newStreak = prev.currentStreak;
      let newLongest = prev.longestStreak;
      let streakBroken = false;

      if (!prev.lastActiveDate) {
        // First time playing
        newStreak = 1;
      } else {
        const daysDiff = getDaysDifference(prev.lastActiveDate, today);

        if (daysDiff === 1) {
          // Consecutive day - extend streak
          newStreak = prev.currentStreak + 1;
        } else if (daysDiff === 0) {
          // Same day - keep streak
          newStreak = prev.currentStreak;
        } else {
          // Streak broken
          newStreak = 1;
          streakBroken = prev.currentStreak > 0;
        }
      }

      // Update longest streak
      if (newStreak > newLongest) {
        newLongest = newStreak;
      }

      // Check for new milestone
      const hitMilestone = STREAK_MILESTONES.find(
        (m) => newStreak === m && prev.currentStreak < m
      );

      if (hitMilestone) {
        // Schedule milestone celebration
        setTimeout(() => setPendingMilestone(hitMilestone), TIMING.MILESTONE_DELAY);
      }

      if (streakBroken) {
        setRecentlyBroken(true);
        setTimeout(() => setRecentlyBroken(false), TIMING.STREAK_BROKEN_RESET);
      }

      return {
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastActiveDate: today,
        totalActiveDays: prev.totalActiveDays + (prev.lastActiveDate !== today ? 1 : 0),
      };
    });
  }, [setStreakData]);

  // Get next milestone
  const getNextMilestone = useCallback((): StreakMilestone | null => {
    const current = streakData.currentStreak;
    return STREAK_MILESTONES.find((m) => m > current) || null;
  }, [streakData.currentStreak]);

  // Get days until next milestone
  const getDaysUntilMilestone = useCallback((): number | null => {
    const next = getNextMilestone();
    if (!next) return null;
    return next - streakData.currentStreak;
  }, [getNextMilestone, streakData.currentStreak]);

  // Dismiss milestone celebration
  const dismissMilestone = useCallback(() => {
    setPendingMilestone(null);
  }, []);

  // Check if streak is at risk on load
  useEffect(() => {
    if (isLoaded && streakData.lastActiveDate) {
      const status = getStreakStatus();
      // If more than 1 day since last activity, streak is broken
      if (status.daysSinceActivity > 1 && streakData.currentStreak > 0) {
        setStreakData((prev) => ({
          ...prev,
          currentStreak: 0,
        }));
      }
    }
  }, [isLoaded, streakData.lastActiveDate, streakData.currentStreak, getStreakStatus, setStreakData]);

  return {
    // Data
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    lastActiveDate: streakData.lastActiveDate,
    totalActiveDays: streakData.totalActiveDays,
    
    // Status
    ...getStreakStatus(),
    recentlyBroken,
    
    // Milestones
    pendingMilestone,
    nextMilestone: getNextMilestone(),
    daysUntilMilestone: getDaysUntilMilestone(),
    
    // Actions
    recordActivity,
    dismissMilestone,
    
    // Loading
    isLoaded,
  };
}

// Get motivational message based on streak
export function getStreakMessage(streak: number, isAtRisk: boolean): string {
  if (isAtRisk) {
    return "Spil i dag for at holde din streak!";
  }

  if (streak === 0) {
    return "Start din streak i dag!";
  }

  if (streak === 1) {
    return "God start! Kom tilbage i morgen!";
  }

  if (streak < 7) {
    return `${streak} dage i træk! Bliv ved!`;
  }

  if (streak < 14) {
    return `Fantastisk! ${streak} dages streak!`;
  }

  if (streak < 30) {
    return `Utroligt! ${streak} dage med samtaler!`;
  }

  return `🏆 Legendarisk ${streak} dages streak!`;
}

// Get emoji based on streak length
export function getStreakEmoji(streak: number): string {
  if (streak === 0) return "💤";
  if (streak < 3) return "🔥";
  if (streak < 7) return "🔥🔥";
  if (streak < 14) return "🔥🔥🔥";
  if (streak < 30) return "⭐";
  if (streak < 50) return "🌟";
  if (streak < 100) return "💫";
  return "👑";
}

// Get celebration config for milestone
export function getMilestoneConfig(milestone: StreakMilestone): {
  emoji: string;
  title: string;
  message: string;
  gradient: string;
} {
  switch (milestone) {
    case 3:
      return {
        emoji: "🔥",
        title: "3 Dages Streak!",
        message: "Du er godt i gang! Bliv ved med de gode samtaler.",
        gradient: "from-orange-400 to-red-500",
      };
    case 7:
      return {
        emoji: "⭐",
        title: "1 Uges Streak!",
        message: "En hel uge med samtaler! Du er fantastisk!",
        gradient: "from-amber-400 to-orange-500",
      };
    case 14:
      return {
        emoji: "🌟",
        title: "2 Ugers Streak!",
        message: "Imponerende dedication til gode samtaler!",
        gradient: "from-yellow-400 to-amber-500",
      };
    case 30:
      return {
        emoji: "🏆",
        title: "1 Måneds Streak!",
        message: "En hel måned! Du er en ægte samtale-mester!",
        gradient: "from-violet-400 to-purple-500",
      };
    case 50:
      return {
        emoji: "💎",
        title: "50 Dages Streak!",
        message: "Halvtreds dage! Du er en legende!",
        gradient: "from-cyan-400 to-blue-500",
      };
    case 100:
      return {
        emoji: "👑",
        title: "100 Dages Streak!",
        message: "HUNDREDE DAGE! Du er ustoppelig!",
        gradient: "from-rose-400 to-pink-500",
      };
  }
}
