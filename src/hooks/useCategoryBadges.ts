"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocalStorage, useProgress } from "./useLocalStorage";
import { categories } from "@/data/categories";
import { STORAGE_KEYS } from "@/constants";

export interface CategoryBadge {
  categoryId: string;
  unlockedAt: number;
  celebrated: boolean;
}

export interface BadgeData {
  badges: CategoryBadge[];
  lastCheckedProgress: Record<string, number>; // categoryId -> answeredCount at last check
}

const DEFAULT_BADGE_DATA: BadgeData = {
  badges: [],
  lastCheckedProgress: {},
};

export interface CategoryBadgeInfo {
  categoryId: string;
  name: string;
  emoji: string;
  color: string;
  isUnlocked: boolean;
  unlockedAt: number | null;
  progress: number;
  total: number;
  progressPercent: number;
  questionsRemaining: number;
}

export function useCategoryBadges() {
  const [badgeData, setBadgeData, isLoaded] = useLocalStorage<BadgeData>(
    STORAGE_KEYS.BADGES,
    DEFAULT_BADGE_DATA
  );
  const { progress, isLoaded: progressLoaded } = useProgress();
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<CategoryBadgeInfo | null>(null);

  // Get all badge info with progress
  const allBadges = useMemo((): CategoryBadgeInfo[] => {
    return categories.map((category) => {
      const categoryProgress = progress[category.id];
      const answeredCount = categoryProgress?.answeredIds.length || 0;
      const totalQuestions = category.questions.length;
      const isUnlocked = answeredCount >= totalQuestions;
      const unlockedBadge = badgeData.badges.find((b) => b.categoryId === category.id);

      return {
        categoryId: category.id,
        name: category.name,
        emoji: category.emoji,
        color: category.color,
        isUnlocked,
        unlockedAt: unlockedBadge?.unlockedAt || null,
        progress: answeredCount,
        total: totalQuestions,
        progressPercent: Math.round((answeredCount / totalQuestions) * 100),
        questionsRemaining: Math.max(0, totalQuestions - answeredCount),
      };
    });
  }, [progress, badgeData.badges]);

  // Get only unlocked badges
  const unlockedBadges = useMemo(() => {
    return allBadges.filter((b) => b.isUnlocked);
  }, [allBadges]);

  // Get locked badges sorted by progress (closest to unlock first)
  const lockedBadges = useMemo(() => {
    return allBadges
      .filter((b) => !b.isUnlocked)
      .sort((a, b) => b.progressPercent - a.progressPercent);
  }, [allBadges]);

  // Get the badge closest to being unlocked
  const nextBadge = useMemo(() => {
    return lockedBadges[0] || null;
  }, [lockedBadges]);

  // Check for newly completed categories and trigger celebration
  useEffect(() => {
    if (!isLoaded || !progressLoaded) return;

    categories.forEach((category) => {
      const categoryProgress = progress[category.id];
      const answeredCount = categoryProgress?.answeredIds.length || 0;
      const totalQuestions = category.questions.length;
      const isCompleted = answeredCount >= totalQuestions;
      const previousCount = badgeData.lastCheckedProgress[category.id] || 0;
      const alreadyHasBadge = badgeData.badges.some((b) => b.categoryId === category.id);

      // If category is now completed and wasn't before (based on badge record)
      if (isCompleted && !alreadyHasBadge) {
        // Award the badge
        setBadgeData((prev) => ({
          ...prev,
          badges: [
            ...prev.badges,
            {
              categoryId: category.id,
              unlockedAt: Date.now(),
              celebrated: false,
            },
          ],
          lastCheckedProgress: {
            ...prev.lastCheckedProgress,
            [category.id]: answeredCount,
          },
        }));

        // Trigger celebration
        setNewlyUnlockedBadge({
          categoryId: category.id,
          name: category.name,
          emoji: category.emoji,
          color: category.color,
          isUnlocked: true,
          unlockedAt: Date.now(),
          progress: answeredCount,
          total: totalQuestions,
          progressPercent: 100,
          questionsRemaining: 0,
        });
      } else if (answeredCount !== previousCount) {
        // Update progress tracking
        setBadgeData((prev) => ({
          ...prev,
          lastCheckedProgress: {
            ...prev.lastCheckedProgress,
            [category.id]: answeredCount,
          },
        }));
      }
    });
  }, [progress, isLoaded, progressLoaded, badgeData.badges, badgeData.lastCheckedProgress, setBadgeData]);

  // Mark badge as celebrated
  const markBadgeCelebrated = useCallback(
    (categoryId: string) => {
      setBadgeData((prev) => ({
        ...prev,
        badges: prev.badges.map((b) =>
          b.categoryId === categoryId ? { ...b, celebrated: true } : b
        ),
      }));
      setNewlyUnlockedBadge(null);
    },
    [setBadgeData]
  );

  // Dismiss celebration without marking as celebrated (for auto-dismiss)
  const dismissCelebration = useCallback(() => {
    if (newlyUnlockedBadge) {
      markBadgeCelebrated(newlyUnlockedBadge.categoryId);
    }
  }, [newlyUnlockedBadge, markBadgeCelebrated]);

  // Get badge info for a specific category
  const getBadgeInfo = useCallback(
    (categoryId: string): CategoryBadgeInfo | null => {
      return allBadges.find((b) => b.categoryId === categoryId) || null;
    },
    [allBadges]
  );

  // Reset all badges (useful for testing)
  const resetBadges = useCallback(() => {
    setBadgeData(DEFAULT_BADGE_DATA);
  }, [setBadgeData]);

  return {
    allBadges,
    unlockedBadges,
    lockedBadges,
    nextBadge,
    newlyUnlockedBadge,
    getBadgeInfo,
    markBadgeCelebrated,
    dismissCelebration,
    resetBadges,
    isLoaded: isLoaded && progressLoaded,
  };
}
