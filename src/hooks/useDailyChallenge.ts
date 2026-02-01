"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { getDailyQuestion } from "@/utils/dailyQuestion";
import { STORAGE_KEYS } from "@/constants";
import { toDateKey, getDaysDifference } from "@/utils/date";

export interface DailyChallengeData {
  // Completion tracking
  completedDates: string[]; // Array of ISO date strings (YYYY-MM-DD)
  
  // Points system
  totalBonusPoints: number;
  
  // Streak tracking
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
}

const DEFAULT_DAILY_CHALLENGE_DATA: DailyChallengeData = {
  completedDates: [],
  totalBonusPoints: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
};

// Bonus points configuration
export const DAILY_CHALLENGE_POINTS = {
  base: 50, // Base points for completing daily challenge
  streakBonus: 10, // Extra points per streak day
  maxStreakBonus: 100, // Cap on streak bonus
} as const;

// Milestone thresholds for daily challenge streaks
export const DAILY_CHALLENGE_MILESTONES = [3, 7, 14, 30, 50, 100] as const;
export type DailyChallengeMilestone = typeof DAILY_CHALLENGE_MILESTONES[number];

export function useDailyChallenge() {
  const [data, setData, isLoaded] = useLocalStorage<DailyChallengeData>(
    STORAGE_KEYS.DAILY_CHALLENGE,
    DEFAULT_DAILY_CHALLENGE_DATA
  );

  // Get today's challenge question
  const todaysChallenge = useMemo(() => {
    return getDailyQuestion();
  }, []);

  // Check if today's challenge is completed
  const isCompletedToday = useMemo(() => {
    const today = toDateKey();
    return data.completedDates.includes(today);
  }, [data.completedDates]);

  // Calculate current streak on load
  const streakInfo = useMemo(() => {
    if (!data.lastCompletedDate) {
      return { currentStreak: 0, isAtRisk: false, daysSinceCompletion: Infinity };
    }

    const today = toDateKey();
    const daysDiff = getDaysDifference(data.lastCompletedDate, today);

    // Check if streak should be broken
    if (daysDiff > 1) {
      return { currentStreak: 0, isAtRisk: false, daysSinceCompletion: daysDiff };
    }

    return {
      currentStreak: data.currentStreak,
      isAtRisk: daysDiff === 1 && !isCompletedToday, // At risk if yesterday was last completion
      daysSinceCompletion: daysDiff,
    };
  }, [data.lastCompletedDate, data.currentStreak, isCompletedToday]);

  // Calculate bonus points for completing today's challenge
  const calculateBonusPoints = useCallback((streak: number): number => {
    const streakBonus = Math.min(
      streak * DAILY_CHALLENGE_POINTS.streakBonus,
      DAILY_CHALLENGE_POINTS.maxStreakBonus
    );
    return DAILY_CHALLENGE_POINTS.base + streakBonus;
  }, []);

  // Complete today's challenge
  const completeChallenge = useCallback(() => {
    const today = toDateKey();

    setData((prev) => {
      // Already completed today
      if (prev.completedDates.includes(today)) {
        return prev;
      }

      let newStreak = 1;

      if (prev.lastCompletedDate) {
        const daysDiff = getDaysDifference(prev.lastCompletedDate, today);

        if (daysDiff === 1) {
          // Consecutive day - extend streak
          newStreak = prev.currentStreak + 1;
        } else if (daysDiff === 0) {
          // Same day (shouldn't happen but handle it)
          newStreak = prev.currentStreak;
        }
        // If daysDiff > 1, streak resets to 1
      }

      const bonusPoints = calculateBonusPoints(newStreak);
      const newLongestStreak = Math.max(newStreak, prev.longestStreak);

      return {
        completedDates: [...prev.completedDates, today],
        totalBonusPoints: prev.totalBonusPoints + bonusPoints,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastCompletedDate: today,
      };
    });
  }, [setData, calculateBonusPoints]);

  // Check if user hit a new milestone
  const checkMilestone = useCallback((): DailyChallengeMilestone | null => {
    return DAILY_CHALLENGE_MILESTONES.find(
      (m) => streakInfo.currentStreak === m
    ) || null;
  }, [streakInfo.currentStreak]);

  // Get next milestone
  const getNextMilestone = useCallback((): DailyChallengeMilestone | null => {
    return DAILY_CHALLENGE_MILESTONES.find(
      (m) => m > streakInfo.currentStreak
    ) || null;
  }, [streakInfo.currentStreak]);

  // Get days until next milestone
  const daysUntilMilestone = useMemo(() => {
    const next = getNextMilestone();
    if (!next) return null;
    return next - streakInfo.currentStreak;
  }, [getNextMilestone, streakInfo.currentStreak]);

  // Points user would earn today
  const todaysPotentialPoints = useMemo(() => {
    if (isCompletedToday) {
      return 0;
    }
    const potentialStreak = streakInfo.isAtRisk || streakInfo.currentStreak === 0 
      ? 1 
      : streakInfo.currentStreak + 1;
    return calculateBonusPoints(potentialStreak);
  }, [isCompletedToday, streakInfo, calculateBonusPoints]);

  // Total challenges completed
  const totalChallengesCompleted = data.completedDates.length;

  return {
    // Today's challenge
    todaysChallenge,
    isCompletedToday,
    todaysPotentialPoints,

    // Streak info
    currentStreak: streakInfo.currentStreak,
    longestStreak: data.longestStreak,
    isAtRisk: streakInfo.isAtRisk,
    
    // Milestones
    currentMilestone: checkMilestone(),
    nextMilestone: getNextMilestone(),
    daysUntilMilestone,

    // Points
    totalBonusPoints: data.totalBonusPoints,

    // Stats
    totalChallengesCompleted,
    completedDates: data.completedDates,

    // Actions
    completeChallenge,

    // Loading state
    isLoaded,
  };
}

// Helper function to get milestone celebration config
export function getDailyChallengeMilestoneConfig(milestone: DailyChallengeMilestone): {
  emoji: string;
  title: string;
  message: string;
  gradient: string;
} {
  switch (milestone) {
    case 3:
      return {
        emoji: "🎯",
        title: "3 Daily Challenges!",
        message: "Du er godt i gang! Bliv ved med at udfordre dig selv.",
        gradient: "from-orange-400 to-red-500",
      };
    case 7:
      return {
        emoji: "⭐",
        title: "1 Uges Daily Challenges!",
        message: "En hel uge med daglige udfordringer!",
        gradient: "from-amber-400 to-orange-500",
      };
    case 14:
      return {
        emoji: "🌟",
        title: "2 Ugers Daily Challenges!",
        message: "Imponerende dedication!",
        gradient: "from-yellow-400 to-amber-500",
      };
    case 30:
      return {
        emoji: "🏆",
        title: "1 Måneds Daily Challenges!",
        message: "Du er en ægte mester!",
        gradient: "from-violet-400 to-purple-500",
      };
    case 50:
      return {
        emoji: "💎",
        title: "50 Daily Challenges!",
        message: "Halvtreds daglige udfordringer klaret!",
        gradient: "from-cyan-400 to-blue-500",
      };
    case 100:
      return {
        emoji: "👑",
        title: "100 Daily Challenges!",
        message: "HUNDREDE udfordringer! Legendarisk!",
        gradient: "from-rose-400 to-pink-500",
      };
  }
}

// Get motivational message for daily challenge
export function getDailyChallengeMessage(
  isCompleted: boolean,
  streak: number,
  isAtRisk: boolean
): string {
  if (isCompleted) {
    if (streak >= 7) {
      return `Fantastisk! ${streak} dages streak! 🔥`;
    }
    return "Dagens udfordring klaret! ✓";
  }

  if (isAtRisk) {
    return "Fuldfør i dag for at holde din streak!";
  }

  if (streak === 0) {
    return "Start din daily challenge streak!";
  }

  return `${streak} dages streak - bliv ved!`;
}
