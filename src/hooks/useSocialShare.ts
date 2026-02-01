"use client";

import { useCallback, useState } from "react";
import { Category } from "@/types";
import { categories } from "@/data/categories";
import { useFavorites, useProgress } from "./useLocalStorage";
import { addRoundRectPolyfill } from "@/utils/canvasPolyfill";
import { useAchievements } from "./useAchievements";
import { logger } from "@/utils/logger";

export interface ShareStats {
  totalQuestions: number;
  answeredQuestions: number;
  completedCategories: number;
  favoritesCount: number;
  favoriteCategory?: string;
  completionPercentage: number;
  achievementsCount: number;
  achievementPercentage: number;
  latestAchievement?: string;
  streak?: number;
}

export function useSocialShare() {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const { favorites } = useFavorites();
  const { progress } = useProgress();
  const { getUnlockedCount, getCompletionPercentage, unlockedAchievements } = useAchievements();

  // Calculate comprehensive statistics
  const calculateStats = useCallback((): ShareStats => {
    const totalQuestions = categories.reduce((acc, cat) => acc + cat.questions.length, 0);
    const answeredQuestions = Object.values(progress).reduce(
      (acc, categoryProgress) => acc + categoryProgress.answeredIds.length,
      0
    );

    // Count completed categories (all questions answered)
    const completedCategories = categories.filter(category => {
      const categoryProgress = progress[category.id];
      return categoryProgress && categoryProgress.answeredIds.length >= category.questions.length;
    }).length;

    // Find favorite category (most progress)
    const favoriteCategory = categories.reduce((max, category) => {
      const categoryProgress = progress[category.id];
      const maxProgress = progress[max.id];
      const currentCount = categoryProgress?.answeredIds.length || 0;
      const maxCount = maxProgress?.answeredIds.length || 0;
      return currentCount > maxCount ? category : max;
    }, categories[0]).name;

    const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
    const achievementsCount = getUnlockedCount();
    const achievementPercentage = getCompletionPercentage();
    const latestAchievement = unlockedAchievements.length > 0 
      ? unlockedAchievements[unlockedAchievements.length - 1]?.title
      : undefined;

    return {
      totalQuestions,
      answeredQuestions,
      completedCategories,
      favoritesCount: favorites.length,
      favoriteCategory: answeredQuestions > 0 ? favoriteCategory : undefined,
      completionPercentage,
      achievementsCount,
      achievementPercentage,
      latestAchievement,
    };
  }, [progress, favorites, getUnlockedCount, getCompletionPercentage, unlockedAchievements]);

  // Generate achievement text based on progress
  const generateAchievementText = useCallback((stats: ShareStats): string => {
    const achievements = [];
    
    if (stats.completedCategories > 0) {
      achievements.push(`${stats.completedCategories} kategorier fuldført 🎉`);
    }
    
    if (stats.completionPercentage >= 50) {
      achievements.push(`${stats.completionPercentage}% gennemført 🚀`);
    }
    
    if (stats.favoritesCount > 0) {
      achievements.push(`${stats.favoritesCount} favoritspørgsmål gemt ❤️`);
    }

    if (stats.achievementsCount > 0) {
      achievements.push(`${stats.achievementsCount} præstationer låst op 🏅`);
    }

    if (stats.latestAchievement) {
      achievements.push(`Nyeste: ${stats.latestAchievement} ⭐`);
    }

    if (stats.completionPercentage === 100) {
      achievements.push("Alle spørgsmål besvaret! 🏆");
    } else if (stats.completionPercentage >= 75) {
      achievements.push("Næsten færdig! 🎯");
    } else if (stats.completionPercentage >= 25) {
      achievements.push("Godt i gang! 💪");
    }

    return achievements.length > 0 ? achievements.join(", ") : "Ny i Samtalekort 🌟";
  }, []);

  // Share overall progress
  const shareProgress = useCallback(async () => {
    const stats = calculateStats();
    const achievements = generateAchievementText(stats);
    
    const shareText = `🎴 Mine Samtalekort-statistikker:

${achievements}

📊 Fremskridt:
• ${stats.answeredQuestions}/${stats.totalQuestions} spørgsmål besvaret
• ${stats.completedCategories}/${categories.length} kategorier fuldført
• ${stats.favoritesCount} favoritspørgsmål gemt
• ${stats.achievementsCount} præstationer låst op 🏅
${stats.favoriteCategory ? `• Favorit: ${stats.favoriteCategory}` : ""}

Vil du også prøve dybere samtaler? 💭
https://mahope.github.io/samtale-spil/

#Samtalekort #DybereForhold #Samtale`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Mine Samtalekort-statistikker",
          text: shareText,
          url: "https://mahope.github.io/samtale-spil/",
        });
        return { success: true, method: "native" as const };
      } else {
        await navigator.clipboard.writeText(shareText);
        return { success: true, method: "clipboard" as const };
      }
    } catch (error) {
      logger.error("Error sharing progress:", error);
      return { success: false, method: "failed" as const };
    }
  }, [calculateStats, generateAchievementText]);

  // Share category completion
  const shareCategoryCompletion = useCallback(async (category: Category) => {
    const categoryProgress = progress[category.id];
    const answeredCount = categoryProgress?.answeredIds.length || 0;
    const totalCount = category.questions.length;
    const completionPercentage = Math.round((answeredCount / totalCount) * 100);

    const shareText = `🎴 ${category.emoji} ${category.name} - ${completionPercentage}% fuldført!

${answeredCount}/${totalCount} spørgsmål besvaret

${completionPercentage === 100 
  ? "Jeg har fuldført denne kategori! 🎉" 
  : `${totalCount - answeredCount} spørgsmål tilbage til at fuldføre kategorien.`
}

Prøv selv: https://mahope.github.io/samtale-spil/spil/${category.id}

#Samtalekort #${category.name} #DybereForhold`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${category.name} - Samtalekort`,
          text: shareText,
          url: `https://mahope.github.io/samtale-spil/spil/${category.id}`,
        });
        return { success: true, method: "native" as const };
      } else {
        await navigator.clipboard.writeText(shareText);
        return { success: true, method: "clipboard" as const };
      }
    } catch (error) {
      logger.error("Error sharing category completion:", error);
      return { success: false, method: "failed" as const };
    }
  }, [progress]);

  // Generate shareable image using Canvas
  const generateStatsImage = useCallback(async (): Promise<string | null> => {
    setIsGeneratingImage(true);
    
    try {
      const stats = calculateStats();

      // Add polyfill for roundRect if needed
      addRoundRectPolyfill();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      // Set canvas size for social media (1200x630 is optimal for most platforms)
      canvas.width = 1200;
      canvas.height = 630;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#4F46E5"); // indigo-600
      gradient.addColorStop(1, "#7C3AED"); // violet-600
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle pattern overlay
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for (let i = 0; i < canvas.width; i += 40) {
        for (let j = 0; j < canvas.height; j += 40) {
          if ((i + j) % 80 === 0) {
            ctx.fillRect(i, j, 20, 20);
          }
        }
      }

      // Add main title
      ctx.fillStyle = "white";
      ctx.font = "bold 48px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("🎴 Mine Samtalekort-statistikker", canvas.width / 2, 100);

      // Add stats boxes
      const boxWidth = 280;
      const boxHeight = 100;
      const boxSpacing = 30;

      // Stats data
      const statsBoxes = [
        {
          title: "Spørgsmål besvaret",
          value: `${stats.answeredQuestions}/${stats.totalQuestions}`,
          subtitle: `${stats.completionPercentage}% gennemført`,
        },
        {
          title: "Kategorier fuldført",
          value: `${stats.completedCategories}/${categories.length}`,
          subtitle: stats.favoriteCategory ? `Favorit: ${stats.favoriteCategory}` : "Godt i gang!",
        },
      ];

      // Add achievements box if there are any
      if (stats.achievementsCount > 0) {
        statsBoxes.push({
          title: "Præstationer",
          value: `${stats.achievementsCount}`,
          subtitle: `${stats.achievementPercentage}% låst op`,
        });
      }

      // Calculate dynamic positioning based on number of boxes
      const totalBoxes = statsBoxes.length;
      const totalWidth = totalBoxes * boxWidth + (totalBoxes - 1) * boxSpacing;
      const startX = (canvas.width - totalWidth) / 2;
      const startY = 160;

      statsBoxes.forEach((box, index) => {
        const x = startX + (boxWidth + boxSpacing) * index;
        const y = startY;

        // Draw box background
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.roundRect(x, y, boxWidth, boxHeight, 20);
        ctx.fill();

        // Draw box border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw title
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.font = "20px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(box.title, x + boxWidth / 2, y + 30);

        // Draw value
        ctx.fillStyle = "white";
        ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
        ctx.fillText(box.value, x + boxWidth / 2, y + 70);

        // Draw subtitle
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.font = "16px system-ui, -apple-system, sans-serif";
        ctx.fillText(box.subtitle, x + boxWidth / 2, y + 95);
      });

      // Add achievements text
      if (stats.favoritesCount > 0) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = "20px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`❤️ ${stats.favoritesCount} favoritspørgsmål gemt`, canvas.width / 2, 350);
      }

      // Add motivational text
      let motivationalText = "Dybere samtaler, stærkere forbindelser 💭";
      if (stats.completionPercentage === 100) {
        motivationalText = "Du har mastered Samtalekort! 🏆";
      } else if (stats.completionPercentage >= 75) {
        motivationalText = "Du er så tæt på at fuldføre alt! 🎯";
      } else if (stats.completionPercentage >= 25) {
        motivationalText = "Fantastisk fremskridt! Fortsæt! 🚀";
      }

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "24px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(motivationalText, canvas.width / 2, 420);

      // Add URL
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "18px system-ui, -apple-system, sans-serif";
      ctx.fillText("mahope.github.io/samtale-spil", canvas.width / 2, 480);

      // Add decorative elements
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.arc(100, 100, 50, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(canvas.width - 100, canvas.height - 100, 60, 0, Math.PI * 2);
      ctx.fill();

      // Convert to blob and return data URL
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            resolve(url);
          } else {
            resolve(null);
          }
        }, "image/png", 0.9);
      });

    } catch (error) {
      logger.error("Error generating stats image:", error);
      return null;
    } finally {
      setIsGeneratingImage(false);
    }
  }, [calculateStats, generateAchievementText]);

  // Share image (when supported)
  const shareStatsImage = useCallback(async () => {
    const imageUrl = await generateStatsImage();
    if (!imageUrl) return { success: false, method: "failed" as const };

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "samtalekort-statistikker.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Mine Samtalekort-statistikker",
          text: "Se mine fremskridt i Samtalekort! 🎴",
          files: [file],
        });
        return { success: true, method: "native" as const };
      } else {
        // Fallback: download the image
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "samtalekort-statistikker.png";
        link.click();
        return { success: true, method: "download" as const };
      }
    } catch (error) {
      logger.error("Error sharing stats image:", error);
      return { success: false, method: "failed" as const };
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }, [generateStatsImage]);

  return {
    shareProgress,
    shareCategoryCompletion,
    generateStatsImage,
    shareStatsImage,
    calculateStats,
    isGeneratingImage,
  };
}