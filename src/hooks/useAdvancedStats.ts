"use client";

import { useMemo, useCallback } from "react";
import { useLocalStorage, useProgress, useFavorites, useQuestionHistory } from "@/hooks/useLocalStorage";
import { useStreak } from "@/hooks/useStreak";
import { categories } from "@/data/categories";
import { STORAGE_KEYS } from "@/constants";

// Response time tracking
export interface ResponseTimeEntry {
  questionId: string;
  categoryId: string;
  depth: "let" | "medium" | "dyb";
  responseTimeMs: number;
  timestamp: number;
}

// Activity entry for heatmap
export interface ActivityEntry {
  date: string; // YYYY-MM-DD format
  questionsAnswered: number;
  favoritesSaved: number;
  categoriesPlayed: string[];
  totalTimeMs: number;
}

// Category completion for radar chart
export interface CategoryCompletion {
  categoryId: string;
  categoryName: string;
  emoji: string;
  color: string;
  totalQuestions: number;
  answeredQuestions: number;
  completionPercent: number;
  favoriteCount: number;
}

// Advanced stats hook for response time tracking
export function useResponseTimeTracking() {
  const [responseTimes, setResponseTimes] = useLocalStorage<ResponseTimeEntry[]>(
    STORAGE_KEYS.RESPONSE_TIMES || "samtale_response_times",
    []
  );

  const trackResponseTime = useCallback(
    (entry: Omit<ResponseTimeEntry, "timestamp">) => {
      setResponseTimes((prev) => {
        const newEntry: ResponseTimeEntry = {
          ...entry,
          timestamp: Date.now(),
        };
        // Keep last 500 entries to prevent localStorage bloat
        return [...prev, newEntry].slice(-500);
      });
    },
    [setResponseTimes]
  );

  const averageResponseTime = useMemo(() => {
    if (responseTimes.length === 0) return 0;
    const total = responseTimes.reduce((sum, r) => sum + r.responseTimeMs, 0);
    return Math.round(total / responseTimes.length);
  }, [responseTimes]);

  const averageByDepth = useMemo(() => {
    const groups: Record<string, number[]> = { let: [], medium: [], dyb: [] };
    responseTimes.forEach((r) => {
      groups[r.depth]?.push(r.responseTimeMs);
    });
    return {
      let: groups.let.length > 0 
        ? Math.round(groups.let.reduce((a, b) => a + b, 0) / groups.let.length) 
        : 0,
      medium: groups.medium.length > 0 
        ? Math.round(groups.medium.reduce((a, b) => a + b, 0) / groups.medium.length) 
        : 0,
      dyb: groups.dyb.length > 0 
        ? Math.round(groups.dyb.reduce((a, b) => a + b, 0) / groups.dyb.length) 
        : 0,
    };
  }, [responseTimes]);

  return {
    responseTimes,
    trackResponseTime,
    averageResponseTime,
    averageByDepth,
    totalTracked: responseTimes.length,
  };
}

// Activity tracking for heatmap data
export function useActivityHeatmap() {
  const { history } = useQuestionHistory();
  const { favorites } = useFavorites();
  const { progress } = useProgress();

  // Generate activity data for last 365 days
  const activityData = useMemo(() => {
    const data: Map<string, ActivityEntry> = new Map();
    
    // Initialize last 365 days
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      data.set(dateStr, {
        date: dateStr,
        questionsAnswered: 0,
        favoritesSaved: 0,
        categoriesPlayed: [],
        totalTimeMs: 0,
      });
    }

    // Count questions from history
    history.forEach((entry) => {
      const dateStr = new Date(entry.answeredAt).toISOString().split("T")[0];
      const existing = data.get(dateStr);
      if (existing) {
        existing.questionsAnswered++;
        if (!existing.categoriesPlayed.includes(entry.categoryId)) {
          existing.categoriesPlayed.push(entry.categoryId);
        }
      }
    });

    // Count favorites saved
    favorites.forEach((fav) => {
      const dateStr = new Date(fav.savedAt).toISOString().split("T")[0];
      const existing = data.get(dateStr);
      if (existing) {
        existing.favoritesSaved++;
      }
    });

    // Sort by date
    return Array.from(data.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [history, favorites]);

  // Get activity level (0-4) for a given count
  const getActivityLevel = useCallback((count: number): number => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  }, []);

  // Total activity stats
  const activityStats = useMemo(() => {
    const activeDays = activityData.filter(
      (d) => d.questionsAnswered > 0 || d.favoritesSaved > 0
    ).length;
    
    const totalQuestions = activityData.reduce(
      (sum, d) => sum + d.questionsAnswered, 
      0
    );

    const mostActiveDay = activityData.reduce(
      (max, d) => (d.questionsAnswered > max.questionsAnswered ? d : max),
      activityData[0]
    );

    // Calculate current streak
    let currentStreak = 0;
    const sortedByDateDesc = [...activityData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    for (const day of sortedByDateDesc) {
      if (day.questionsAnswered > 0 || day.favoritesSaved > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    for (const day of activityData) {
      if (day.questionsAnswered > 0 || day.favoritesSaved > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    return {
      activeDays,
      totalQuestions,
      mostActiveDay,
      currentStreak,
      longestStreak,
    };
  }, [activityData]);

  return {
    activityData,
    getActivityLevel,
    activityStats,
  };
}

// Category completion for radar chart
export function useCategoryCompletion(): CategoryCompletion[] {
  const { progress } = useProgress();
  const { favorites } = useFavorites();

  return useMemo(() => {
    return categories.map((cat) => {
      const catProgress = progress[cat.id];
      const answeredQuestions = catProgress?.answeredIds.length || 0;
      const totalQuestions = cat.questions.length;
      const completionPercent = Math.round((answeredQuestions / totalQuestions) * 100);
      const favoriteCount = favorites.filter((f) => f.categoryId === cat.id).length;

      return {
        categoryId: cat.id,
        categoryName: cat.name,
        emoji: cat.emoji,
        color: cat.color,
        totalQuestions,
        answeredQuestions,
        completionPercent,
        favoriteCount,
      };
    });
  }, [progress, favorites]);
}

// Question diversity tracking
export function useQuestionDiversity() {
  const { history } = useQuestionHistory();
  const { progress } = useProgress();

  return useMemo(() => {
    // Calculate depth distribution
    const depthCounts = { let: 0, medium: 0, dyb: 0 };
    history.forEach((entry) => {
      depthCounts[entry.depth]++;
    });

    // Calculate category distribution
    const categoryCounts: Record<string, number> = {};
    history.forEach((entry) => {
      categoryCounts[entry.categoryId] = (categoryCounts[entry.categoryId] || 0) + 1;
    });

    // Calculate diversity score (0-100)
    // Based on how evenly spread the questions are across categories
    const totalQuestions = history.length;
    if (totalQuestions === 0) {
      return {
        depthDistribution: depthCounts,
        categoryDistribution: categoryCounts,
        diversityScore: 0,
        dominantCategory: null,
        dominantDepth: null,
      };
    }

    const categoryValues = Object.values(categoryCounts);
    const idealPerCategory = totalQuestions / categories.length;
    const variance = categoryValues.reduce(
      (sum, count) => sum + Math.pow(count - idealPerCategory, 2),
      0
    ) / categories.length;
    const maxVariance = Math.pow(totalQuestions - idealPerCategory, 2);
    const diversityScore = maxVariance > 0 
      ? Math.round((1 - variance / maxVariance) * 100) 
      : 100;

    // Find dominant category
    const dominantCategory = Object.entries(categoryCounts).sort(
      ([, a], [, b]) => b - a
    )[0];
    
    // Find dominant depth
    const dominantDepth = (Object.entries(depthCounts) as [string, number][]).sort(
      ([, a], [, b]) => b - a
    )[0];

    return {
      depthDistribution: depthCounts,
      categoryDistribution: categoryCounts,
      diversityScore,
      dominantCategory: dominantCategory 
        ? { id: dominantCategory[0], count: dominantCategory[1] } 
        : null,
      dominantDepth: dominantDepth 
        ? { depth: dominantDepth[0], count: dominantDepth[1] } 
        : null,
    };
  }, [history]);
}

// Combined advanced stats hook
export function useAdvancedStats() {
  const { averageResponseTime, averageByDepth, totalTracked } = useResponseTimeTracking();
  const { activityData, activityStats, getActivityLevel } = useActivityHeatmap();
  const categoryCompletion = useCategoryCompletion();
  const diversity = useQuestionDiversity();
  const { currentStreak, longestStreak } = useStreak();

  return {
    // Response time stats
    responseTime: {
      average: averageResponseTime,
      byDepth: averageByDepth,
      totalTracked,
    },
    // Activity heatmap
    heatmap: {
      data: activityData,
      stats: activityStats,
      getLevel: getActivityLevel,
    },
    // Category completion for radar chart
    categories: categoryCompletion,
    // Question diversity
    diversity,
    // Streak info
    streak: {
      current: currentStreak,
      longest: longestStreak,
    },
    // Favorite categories
    favoriteCategories: categoryCompletion
      .filter((c) => c.favoriteCount > 0)
      .sort((a, b) => b.favoriteCount - a.favoriteCount)
      .slice(0, 3),
  };
}

export default useAdvancedStats;
