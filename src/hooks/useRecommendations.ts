"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage, useFavorites, useProgress } from "./useLocalStorage";
import { useQuestionRatings } from "./useQuestionRatings";
import { categories } from "@/data/categories";
import type { Question } from "@/types";

export interface Recommendation {
  question: Question;
  reason: string;
  score: number;
  categoryName: string;
  categoryEmoji: string;
}

export interface UserPreferences {
  favoriteCategories: { categoryId: string; count: number }[];
  depthPreference: { depth: "let" | "medium" | "dyb"; count: number }[];
  topRatedCategories: { categoryId: string; avgRating: number; count: number }[];
  overallDepthBias: "let" | "medium" | "dyb" | null;
}

export function useRecommendations() {
  const { favorites, isLoaded: favoritesLoaded } = useFavorites();
  const { ratings, topRatedQuestions, isLoaded: ratingsLoaded } = useQuestionRatings();
  const { progress, isLoaded: progressLoaded } = useProgress();
  
  const [dismissedIds, setDismissedIds, dismissedLoaded] = useLocalStorage<string[]>(
    "samtale-spil-dismissed-recommendations",
    []
  );

  const isLoaded = favoritesLoaded && ratingsLoaded && progressLoaded && dismissedLoaded;

  // Analyze user preferences from favorites and ratings
  const userPreferences = useMemo((): UserPreferences => {
    // Count favorite categories
    const categoryCount: Record<string, number> = {};
    const depthCount: Record<string, number> = { let: 0, medium: 0, dyb: 0 };

    // Analyze favorites
    favorites.forEach((fav) => {
      categoryCount[fav.categoryId] = (categoryCount[fav.categoryId] || 0) + 1;
      depthCount[fav.depth] = (depthCount[fav.depth] || 0) + 1;
    });

    // Analyze ratings to find category preferences
    const categoryRatings: Record<string, { total: number; count: number }> = {};
    
    ratings.forEach((rating) => {
      // Find question's category
      for (const cat of categories) {
        const question = cat.questions.find((q) => q.id === rating.questionId);
        if (question) {
          if (!categoryRatings[cat.id]) {
            categoryRatings[cat.id] = { total: 0, count: 0 };
          }
          categoryRatings[cat.id].total += rating.rating;
          categoryRatings[cat.id].count += 1;

          // Also count depth from highly rated questions (4+)
          if (rating.rating >= 4) {
            depthCount[question.depth] = (depthCount[question.depth] || 0) + 1;
          }
          break;
        }
      }
    });

    // Sort categories by frequency
    const favoriteCategories = Object.entries(categoryCount)
      .map(([categoryId, count]) => ({ categoryId, count }))
      .sort((a, b) => b.count - a.count);

    // Sort depth preferences
    const depthPreference = (Object.entries(depthCount) as [string, number][])
      .map(([depth, count]) => ({ depth: depth as "let" | "medium" | "dyb", count }))
      .sort((a, b) => b.count - a.count);

    // Calculate average ratings per category
    const topRatedCategories = Object.entries(categoryRatings)
      .map(([categoryId, data]) => ({
        categoryId,
        avgRating: data.total / data.count,
        count: data.count,
      }))
      .filter((c) => c.count >= 2) // Only consider categories with multiple ratings
      .sort((a, b) => b.avgRating - a.avgRating);

    // Determine overall depth bias
    const totalDepth = depthPreference.reduce((sum, d) => sum + d.count, 0);
    let overallDepthBias: "let" | "medium" | "dyb" | null = null;
    
    if (totalDepth >= 3) {
      const topDepth = depthPreference[0];
      // Only set bias if there's a clear preference (>40% of choices)
      if (topDepth && topDepth.count / totalDepth > 0.4) {
        overallDepthBias = topDepth.depth;
      }
    }

    return {
      favoriteCategories,
      depthPreference,
      topRatedCategories,
      overallDepthBias,
    };
  }, [favorites, ratings]);

  // Get all questions from all categories
  const allQuestions = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.questions.map((q) => ({
        ...q,
        categoryName: cat.name,
        categoryEmoji: cat.emoji,
      }))
    );
  }, []);

  // Get answered question IDs
  const answeredIds = useMemo(() => {
    const ids = new Set<string>();
    Object.values(progress).forEach((p) => {
      p.answeredIds.forEach((id) => ids.add(id));
    });
    return ids;
  }, [progress]);

  // Get favorite question IDs
  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((f) => f.id));
  }, [favorites]);

  // Generate recommendations based on preferences
  const recommendations = useMemo((): Recommendation[] => {
    const { favoriteCategories, depthPreference, topRatedCategories, overallDepthBias } = userPreferences;

    // If no data, return empty
    if (favorites.length === 0 && ratings.length === 0) {
      return [];
    }

    const scored: Recommendation[] = [];
    const usedQuestionIds = new Set<string>();

    // Score each question based on user preferences
    allQuestions.forEach((question) => {
      // Skip already answered, favorited, or dismissed questions
      if (
        answeredIds.has(question.id) ||
        favoriteIds.has(question.id) ||
        dismissedIds.includes(question.id)
      ) {
        return;
      }

      let score = 0;
      const reasons: string[] = [];

      // Score based on favorite category match
      const favCat = favoriteCategories.find((c) => c.categoryId === question.categoryId);
      if (favCat) {
        score += favCat.count * 2;
        const catInfo = categories.find((c) => c.id === question.categoryId);
        if (catInfo) {
          reasons.push(`Du kan lide ${catInfo.name.toLowerCase()}`);
        }
      }

      // Score based on highly rated category
      const ratedCat = topRatedCategories.find((c) => c.categoryId === question.categoryId);
      if (ratedCat && ratedCat.avgRating >= 4) {
        score += ratedCat.avgRating;
        if (!reasons.length) {
          const catInfo = categories.find((c) => c.id === question.categoryId);
          if (catInfo) {
            reasons.push(`Du har rated ${catInfo.name.toLowerCase()} spørgsmål højt`);
          }
        }
      }

      // Score based on depth preference
      if (overallDepthBias === question.depth) {
        score += 3;
        const depthLabels = { let: "lette", medium: "mellem", dyb: "dybe" };
        if (!reasons.length) {
          reasons.push(`Du foretrækker ${depthLabels[question.depth]} spørgsmål`);
        }
      }

      // Slight preference for deep questions if user hasn't shown a clear preference
      if (!overallDepthBias && question.depth === "dyb") {
        score += 0.5;
      }

      // Add some variety - boost questions from less-answered categories
      const categoryProgress = progress[question.categoryId];
      if (!categoryProgress || categoryProgress.answeredIds.length < 5) {
        score += 1;
        if (reasons.length === 0) {
          const catInfo = categories.find((c) => c.id === question.categoryId);
          if (catInfo) {
            reasons.push(`Prøv noget fra ${catInfo.name.toLowerCase()}`);
          }
        }
      }

      // Only include if there's a reason
      if (score > 0 && reasons.length > 0) {
        scored.push({
          question,
          reason: reasons[0],
          score,
          categoryName: question.categoryName,
          categoryEmoji: question.categoryEmoji,
        });
      }
    });

    // Sort by score and take top recommendations
    // Add some randomization for variety among top scores
    const sorted = scored.sort((a, b) => {
      // Add small random factor to prevent same recommendations always
      const randomA = Math.random() * 0.5;
      const randomB = Math.random() * 0.5;
      return (b.score + randomB) - (a.score + randomA);
    });

    // Ensure diversity - don't show more than 2 from same category
    const diverse: Recommendation[] = [];
    const categoryUsed: Record<string, number> = {};

    for (const rec of sorted) {
      const catCount = categoryUsed[rec.question.categoryId] || 0;
      if (catCount < 2) {
        diverse.push(rec);
        categoryUsed[rec.question.categoryId] = catCount + 1;
        if (diverse.length >= 5) break;
      }
    }

    return diverse;
  }, [
    allQuestions,
    userPreferences,
    favorites,
    ratings,
    answeredIds,
    favoriteIds,
    dismissedIds,
    progress,
  ]);

  // Dismiss a recommendation
  const dismissRecommendation = useCallback(
    (questionId: string) => {
      setDismissedIds((prev) => {
        if (prev.includes(questionId)) return prev;
        // Keep only last 100 dismissed to prevent unbounded growth
        const updated = [...prev, questionId].slice(-100);
        return updated;
      });
    },
    [setDismissedIds]
  );

  // Clear all dismissed recommendations
  const clearDismissed = useCallback(() => {
    setDismissedIds([]);
  }, [setDismissedIds]);

  // Check if user has enough data for recommendations
  const hasEnoughData = favorites.length >= 1 || ratings.length >= 2;

  return {
    recommendations,
    dismissRecommendation,
    clearDismissed,
    userPreferences,
    hasEnoughData,
    isLoaded,
  };
}
