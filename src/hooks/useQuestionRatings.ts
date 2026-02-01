"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/constants";

export interface QuestionRating {
  questionId: string;
  rating: number; // 1-5 stars
  ratedAt: number;
}

export interface QuestionRatingsState {
  ratings: QuestionRating[];
}

const DEFAULT_STATE: QuestionRatingsState = {
  ratings: [],
};

export function useQuestionRatings() {
  const [state, setState, isLoaded] = useLocalStorage<QuestionRatingsState>(
    STORAGE_KEYS.QUESTION_RATINGS,
    DEFAULT_STATE
  );

  // Rate a question (1-5 stars)
  const rateQuestion = useCallback(
    (questionId: string, rating: number) => {
      if (rating < 1 || rating > 5) return;

      setState((prev) => {
        const existingIndex = prev.ratings.findIndex(
          (r) => r.questionId === questionId
        );

        if (existingIndex !== -1) {
          // Update existing rating
          const updated = [...prev.ratings];
          updated[existingIndex] = {
            ...updated[existingIndex],
            rating,
            ratedAt: Date.now(),
          };
          return { ...prev, ratings: updated };
        }

        // Add new rating
        return {
          ...prev,
          ratings: [
            ...prev.ratings,
            { questionId, rating, ratedAt: Date.now() },
          ],
        };
      });
    },
    [setState]
  );

  // Get rating for a specific question
  const getRating = useCallback(
    (questionId: string): number | null => {
      const rating = state.ratings.find((r) => r.questionId === questionId);
      return rating?.rating ?? null;
    },
    [state.ratings]
  );

  // Check if a question has been rated
  const isRated = useCallback(
    (questionId: string): boolean => {
      return state.ratings.some((r) => r.questionId === questionId);
    },
    [state.ratings]
  );

  // Remove rating for a question
  const removeRating = useCallback(
    (questionId: string) => {
      setState((prev) => ({
        ...prev,
        ratings: prev.ratings.filter((r) => r.questionId !== questionId),
      }));
    },
    [setState]
  );

  // Get average rating for a question (for now just returns the rating, could be extended)
  const getAverageRating = useCallback(
    (questionId: string): number | null => {
      return getRating(questionId);
    },
    [getRating]
  );

  // Get all ratings
  const allRatings = useMemo(() => state.ratings, [state.ratings]);

  // Get top rated questions (sorted by rating descending)
  const topRatedQuestions = useMemo(() => {
    return [...state.ratings]
      .sort((a, b) => {
        // First sort by rating (descending)
        if (b.rating !== a.rating) return b.rating - a.rating;
        // Then by most recent (descending)
        return b.ratedAt - a.ratedAt;
      });
  }, [state.ratings]);

  // Get top N rated questions
  const getTopRated = useCallback(
    (count: number = 5): QuestionRating[] => {
      return topRatedQuestions.slice(0, count);
    },
    [topRatedQuestions]
  );

  // Stats
  const stats = useMemo(() => {
    if (state.ratings.length === 0) {
      return {
        totalRated: 0,
        averageRating: 0,
        fiveStarCount: 0,
        fourPlusCount: 0,
      };
    }

    const total = state.ratings.reduce((sum, r) => sum + r.rating, 0);
    const fiveStarCount = state.ratings.filter((r) => r.rating === 5).length;
    const fourPlusCount = state.ratings.filter((r) => r.rating >= 4).length;

    return {
      totalRated: state.ratings.length,
      averageRating: Math.round((total / state.ratings.length) * 10) / 10,
      fiveStarCount,
      fourPlusCount,
    };
  }, [state.ratings]);

  return {
    ratings: allRatings,
    rateQuestion,
    getRating,
    isRated,
    removeRating,
    getAverageRating,
    topRatedQuestions,
    getTopRated,
    stats,
    isLoaded,
  };
}
