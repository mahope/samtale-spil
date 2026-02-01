"use client";

import { useCallback, useState, useEffect } from "react";
import { useLocalStorage, useFavorites, useProgress } from "./useLocalStorage";
import { Achievement, ACHIEVEMENTS } from "@/components/AchievementToast";
import { categories } from "@/data/categories";

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements, isLoaded] = useLocalStorage<Achievement[]>(
    "samtale-spil-achievements",
    []
  );
  const [pendingAchievement, setPendingAchievement] = useState<Achievement | null>(null);
  const { favorites } = useFavorites();
  const { progress } = useProgress();

  // Calculate current stats
  const calculateStats = useCallback(() => {
    const totalAnswered = Object.values(progress).reduce(
      (acc, categoryProgress) => acc + categoryProgress.answeredIds.length,
      0
    );

    const completedCategories = categories.filter(category => {
      const categoryProgress = progress[category.id];
      return categoryProgress && categoryProgress.answeredIds.length >= category.questions.length;
    }).length;

    // Count deep questions answered
    const deepQuestionsAnswered = categories.reduce((acc, category) => {
      const categoryProgress = progress[category.id];
      if (!categoryProgress) return acc;
      
      const deepQuestions = category.questions
        .filter(q => q.depth === "dyb" && categoryProgress.answeredIds.includes(q.id))
        .length;
      
      return acc + deepQuestions;
    }, 0);

    return {
      totalAnswered,
      completedCategories,
      favoritesCount: favorites.length,
      deepQuestionsAnswered,
    };
  }, [progress, favorites]);

  // Check for new achievements
  const checkAchievements = useCallback(() => {
    if (!isLoaded) return;

    const stats = calculateStats();
    const newAchievements: Achievement[] = [];

    ACHIEVEMENTS.forEach(achievementTemplate => {
      // Skip if already unlocked
      if (unlockedAchievements.some(a => a.id === achievementTemplate.id)) return;

      let shouldUnlock = false;

      switch (achievementTemplate.id) {
        case "first_question":
          shouldUnlock = stats.totalAnswered >= 1;
          break;
        case "ten_questions":
          shouldUnlock = stats.totalAnswered >= 10;
          break;
        case "fifty_questions":
          shouldUnlock = stats.totalAnswered >= 50;
          break;
        case "hundred_questions":
          shouldUnlock = stats.totalAnswered >= 100;
          break;
        case "first_category_complete":
          shouldUnlock = stats.completedCategories >= 1;
          break;
        case "three_categories_complete":
          shouldUnlock = stats.completedCategories >= 3;
          break;
        case "all_categories_complete":
          shouldUnlock = stats.completedCategories >= categories.length;
          break;
        case "first_favorite":
          shouldUnlock = stats.favoritesCount >= 1;
          break;
        case "ten_favorites":
          shouldUnlock = stats.favoritesCount >= 10;
          break;
        case "deep_diver":
          shouldUnlock = stats.deepQuestionsAnswered >= 10;
          break;
      }

      if (shouldUnlock) {
        const newAchievement: Achievement = {
          ...achievementTemplate,
          unlocked: true,
          unlockedAt: Date.now(),
        };
        newAchievements.push(newAchievement);
      }
    });

    if (newAchievements.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newAchievements]);
      
      // Show the latest achievement as toast (only show one at a time)
      const latestAchievement = newAchievements[newAchievements.length - 1];
      setPendingAchievement(latestAchievement);
    }
  }, [unlockedAchievements, calculateStats, setUnlockedAchievements, isLoaded]);

  // Auto-check achievements when stats change
  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  const dismissPendingAchievement = useCallback(() => {
    setPendingAchievement(null);
  }, []);

  const getAllAchievements = useCallback(() => {
    return ACHIEVEMENTS.map(template => {
      const unlocked = unlockedAchievements.find(a => a.id === template.id);
      return unlocked || { ...template, unlocked: false };
    });
  }, [unlockedAchievements]);

  const getUnlockedCount = useCallback(() => {
    return unlockedAchievements.length;
  }, [unlockedAchievements]);

  const getCompletionPercentage = useCallback(() => {
    return Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100);
  }, [unlockedAchievements]);

  return {
    pendingAchievement,
    dismissPendingAchievement,
    getAllAchievements,
    getUnlockedCount,
    getCompletionPercentage,
    unlockedAchievements,
    isLoaded,
  };
}