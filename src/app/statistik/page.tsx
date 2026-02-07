"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useFavorites, useProgress, useQuestionHistory } from "@/hooks/useLocalStorage";
import { useStreak } from "@/hooks/useStreak";
import { useDailyChallenge } from "@/hooks/useDailyChallenge";
import { useCategoryBadges } from "@/hooks/useCategoryBadges";
import { useQuestionRatings } from "@/hooks/useQuestionRatings";
import { categories, getCategory, getQuestionById } from "@/data/categories";
import { RatingStarsDisplay } from "@/components/RatingStars";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PageTransition } from "@/components/PageTransition";
import { StreakDisplay, StreakCelebration } from "@/components/StreakDisplay";
import { BadgeGrid, NextBadgeProgress, BadgeStats } from "@/components/CategoryBadge";
import { BadgeCelebrationWithConfetti } from "@/components/BadgeCelebration";
import { EmptyState } from "@/components/EmptyState";
import { StatCard } from "@/components/StatCard";
import { CategoryProgressItem } from "@/components/CategoryProgressItem";
import { FunStatBadge } from "@/components/FunStatBadge";
import { FavoritePreviewCard } from "@/components/FavoritePreviewCard";
import { HistoryItemCard } from "@/components/HistoryItemCard";
import { StatsHeatMap } from "@/components/StatsHeatMap";
import { RadarChart } from "@/components/RadarChart";
import { useAdvancedStats } from "@/hooks/useAdvancedStats";

export default function StatistikPage() {
  const { favorites, isLoaded: favoritesLoaded } = useFavorites();
  const { progress, isLoaded: progressLoaded } = useProgress();
  const { history, clearHistory, isLoaded: historyLoaded } = useQuestionHistory();
  const { isLoaded: streakLoaded } = useStreak();
  const { 
    totalChallengesCompleted, 
    currentStreak: dailyChallengeStreak, 
    longestStreak: dailyChallengeLongestStreak,
    totalBonusPoints,
    isLoaded: dailyChallengeLoaded 
  } = useDailyChallenge();
  const {
    allBadges,
    unlockedBadges,
    nextBadge,
    isLoaded: badgesLoaded,
  } = useCategoryBadges();
  const {
    getTopRated,
    stats: ratingStats,
    isLoaded: ratingsLoaded,
  } = useQuestionRatings();
  const advancedStats = useAdvancedStats();
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!progressLoaded || !favoritesLoaded) return null;

    // Total questions answered
    let totalAnswered = 0;
    let totalQuestions = 0;
    const categoryStats: Array<{
      id: string;
      name: string;
      emoji: string;
      color: string;
      answered: number;
      total: number;
      lastPlayed: number;
    }> = [];

    categories.forEach((cat) => {
      const catProgress = progress[cat.id];
      const answered = catProgress?.answeredIds.length || 0;
      totalAnswered += answered;
      totalQuestions += cat.questions.length;

      categoryStats.push({
        id: cat.id,
        name: cat.name,
        emoji: cat.emoji,
        color: cat.color,
        answered,
        total: cat.questions.length,
        lastPlayed: catProgress?.lastPlayed || 0,
      });
    });

    // Sort by most played
    const sortedByPlayed = [...categoryStats].sort(
      (a, b) => b.answered - a.answered
    );

    // Most played category
    const mostPlayedCategory = sortedByPlayed[0]?.answered > 0
      ? sortedByPlayed[0]
      : null;

    // Categories completed
    const completedCategories = categoryStats.filter(
      (c) => c.answered >= c.total
    ).length;

    // Depth distribution in favorites
    const depthStats = {
      let: favorites.filter((f) => f.depth === "let").length,
      medium: favorites.filter((f) => f.depth === "medium").length,
      dyb: favorites.filter((f) => f.depth === "dyb").length,
    };

    // Most active day (based on favorites saved dates)
    const dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
    const dayCounts: Record<number, number> = {};
    favorites.forEach((f) => {
      const day = new Date(f.savedAt).getDay();
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    const mostActiveDay = Object.entries(dayCounts).sort(
      ([, a], [, b]) => b - a
    )[0];

    // Last played timestamp
    const lastPlayedTimestamp = Math.max(
      ...categoryStats.map((c) => c.lastPlayed || 0)
    );

    // Favorite category (based on favorites)
    const favCategoryCounts: Record<string, number> = {};
    favorites.forEach((f) => {
      favCategoryCounts[f.categoryId] = (favCategoryCounts[f.categoryId] || 0) + 1;
    });
    const favoriteCategory = Object.entries(favCategoryCounts).sort(
      ([, a], [, b]) => b - a
    )[0];
    const favoriteCategoryData = favoriteCategory
      ? getCategory(favoriteCategory[0])
      : null;

    // "Deepest conversations" - how many deep questions answered
    let deepQuestionsAnswered = 0;
    categories.forEach((cat) => {
      const catProgress = progress[cat.id];
      if (catProgress) {
        cat.questions.forEach((q) => {
          if (q.depth === "dyb" && catProgress.answeredIds.includes(q.id)) {
            deepQuestionsAnswered++;
          }
        });
      }
    });

    // Streak calculation (simplified - consecutive days with activity)
    const activityDates = new Set<string>();
    favorites.forEach((f) => {
      activityDates.add(new Date(f.savedAt).toDateString());
    });
    Object.values(progress).forEach((p) => {
      if (p.lastPlayed) {
        activityDates.add(new Date(p.lastPlayed).toDateString());
      }
    });

    return {
      totalAnswered,
      totalQuestions,
      completedCategories,
      totalCategories: categories.length,
      categoryStats: sortedByPlayed,
      mostPlayedCategory,
      depthStats,
      mostActiveDay: mostActiveDay
        ? { day: dayNames[parseInt(mostActiveDay[0])], count: mostActiveDay[1] }
        : null,
      lastPlayedTimestamp,
      favoriteCategory: favoriteCategoryData
        ? { ...favoriteCategoryData, count: favoriteCategory![1] }
        : null,
      deepQuestionsAnswered,
      totalDaysActive: activityDates.size,
    };
  }, [favorites, progress, progressLoaded, favoritesLoaded]);

  const isLoaded = progressLoaded && favoritesLoaded && historyLoaded && streakLoaded && dailyChallengeLoaded && badgesLoaded && ratingsLoaded;

  if (!isLoaded) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-3 border-violet-400 border-t-transparent rounded-full"
        />
        <span className="sr-only">Indlæser...</span>
      </div>
    );
  }

  const hasActivity = stats && (stats.totalAnswered > 0 || favorites.length > 0 || totalChallengesCompleted > 0);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
        {/* Safe area padding for mobile devices with notches */}
        <main 
          id="main-content" 
          className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-safe" 
          role="main"
          style={{ paddingTop: 'max(1.5rem, env(safe-area-inset-top))' }}
        >
        {/* Header - mobile optimized with touch-friendly targets */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 sm:mb-8 gap-2"
        >
          <Link
            href="/spil"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors min-w-[44px] min-h-[44px] -ml-2 pl-2 pr-1 sm:pr-2 active:scale-95"
            aria-label="Tilbage til spil"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            <span className="hidden xs:inline sm:inline">Tilbage</span>
          </Link>

          <h1 className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-1.5 sm:gap-2">
            <span aria-hidden="true">📊</span>
            <span>Statistik</span>
          </h1>

          <div className="min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2">
            <ThemeToggle className="text-slate-600 dark:text-slate-400" />
          </div>
        </motion.header>

        {/* Streak Celebration Modal */}
        <StreakCelebration />
        
        {/* Badge Celebration with Confetti */}
        <BadgeCelebrationWithConfetti />

        {!hasActivity ? (
          <EmptyState
            icon="📊"
            title="Ingen statistik endnu"
            description="Start et spil for at se din fremgang her!"
            action={{
              href: "/spil",
              label: "Start et spil",
            }}
          />
        ) : (
          <>
            {/* Streak Display */}
            <section className="mb-8" aria-labelledby="streak-heading">
              <h2 id="streak-heading" className="sr-only">
                Streak
              </h2>
              <StreakDisplay />
            </section>

            {/* Activity Heatmap - GitHub style */}
            <section className="mb-6 sm:mb-8" aria-labelledby="heatmap-heading">
              <h2 id="heatmap-heading" className="sr-only">
                Aktivitetskalender
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <StatsHeatMap
                  data={advancedStats.heatmap.data}
                  getActivityLevel={advancedStats.heatmap.getLevel}
                  stats={advancedStats.heatmap.stats}
                />
              </motion.div>
            </section>

            {/* Category Radar Chart */}
            <section className="mb-6 sm:mb-8" aria-labelledby="radar-heading">
              <h2 id="radar-heading" className="sr-only">
                Kategori-fremgang
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <RadarChart data={advancedStats.categories} />
              </motion.div>
            </section>

            {/* Daily Challenge Stats */}
            {totalChallengesCompleted > 0 && (
              <section className="mb-6 sm:mb-8" aria-labelledby="daily-challenge-heading">
                <motion.h2
                  id="daily-challenge-heading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2"
                >
                  <span aria-hidden="true">🎯</span>
                  Daily Challenge
                </motion.h2>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <StatCard
                    icon="🎯"
                    label="Challenges klaret"
                    value={totalChallengesCompleted}
                    subtext="daglige udfordringer"
                    gradient="from-violet-500 to-purple-600"
                    delay={0}
                  />
                  <StatCard
                    icon="⭐"
                    label="Bonus points"
                    value={totalBonusPoints}
                    subtext="points optjent"
                    gradient="from-amber-400 to-orange-500"
                    delay={0.1}
                  />
                  <StatCard
                    icon="🔥"
                    label="Challenge streak"
                    value={dailyChallengeStreak}
                    subtext={`rekord: ${dailyChallengeLongestStreak}`}
                    gradient="from-orange-500 to-red-500"
                    delay={0.2}
                  />
                  <StatCard
                    icon="🏆"
                    label="Gennemsnit"
                    value={`${Math.round(totalBonusPoints / totalChallengesCompleted)}p`}
                    subtext="per challenge"
                    gradient="from-emerald-400 to-teal-500"
                    delay={0.3}
                  />
                </div>
              </section>
            )}

            {/* Top Rated Questions */}
            {ratingStats.totalRated > 0 && (
              <section className="mb-6 sm:mb-8" aria-labelledby="top-rated-heading">
                <motion.h2
                  id="top-rated-heading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2"
                >
                  <span aria-hidden="true">⭐</span>
                  Højest ratede spørgsmål
                </motion.h2>
                <div className="space-y-3">
                  {getTopRated(5).map((rating, index) => {
                    const questionData = getQuestionById(rating.questionId);
                    if (!questionData) return null;
                    const { question, category } = questionData;
                    
                    return (
                      <motion.div
                        key={rating.questionId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl shrink-0" aria-hidden="true">
                            {category.emoji}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed line-clamp-2">
                              {question.text}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-slate-400 dark:text-slate-500">
                                {category.name}
                              </span>
                              <RatingStarsDisplay
                                questionId={rating.questionId}
                                size="sm"
                                showValue={false}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                {/* Rating stats summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl"
                >
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      {ratingStats.totalRated} spørgsmål ratet
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      ⭐ {ratingStats.averageRating} gennemsnit
                    </span>
                  </div>
                  {ratingStats.fiveStarCount > 0 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {ratingStats.fiveStarCount} spørgsmål med 5 stjerner ✨
                    </p>
                  )}
                </motion.div>
              </section>
            )}

            {/* Overview Stats */}
            <section className="mb-6 sm:mb-8" aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="sr-only">
                Overblik
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <StatCard
                  icon="💬"
                  label="Spørgsmål besvaret"
                  value={stats!.totalAnswered}
                  subtext={`af ${stats!.totalQuestions} total`}
                  gradient="from-violet-500 to-purple-600"
                  delay={0}
                />
                <StatCard
                  icon="❤️"
                  label="Favoritter"
                  value={favorites.length}
                  subtext={favorites.length === 1 ? "gemt spørgsmål" : "gemte spørgsmål"}
                  gradient="from-rose-400 to-pink-500"
                  delay={0.1}
                />
                <StatCard
                  icon="✨"
                  label="Kategorier fuldført"
                  value={`${stats!.completedCategories}/${stats!.totalCategories}`}
                  gradient="from-emerald-400 to-teal-500"
                  delay={0.2}
                />
                <StatCard
                  icon="🌊"
                  label="Dybe samtaler"
                  value={stats!.deepQuestionsAnswered}
                  subtext="dybe spørgsmål besvaret"
                  gradient="from-blue-400 to-indigo-500"
                  delay={0.3}
                />
              </div>
            </section>

            {/* Category Badges Section */}
            <section className="mb-6 sm:mb-8" aria-labelledby="badges-heading">
              <motion.h2
                id="badges-heading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2"
              >
                <span aria-hidden="true">🎖️</span>
                Kategori Badges
              </motion.h2>
              
              {/* Badge Stats */}
              <div className="mb-6">
                <BadgeStats
                  unlockedCount={unlockedBadges.length}
                  totalCount={allBadges.length}
                />
              </div>

              {/* Next Badge Progress */}
              {nextBadge && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Din næste badge:
                  </p>
                  <NextBadgeProgress badge={nextBadge} />
                </motion.div>
              )}

              {/* All Badges Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-4">
                  Alle badges ({unlockedBadges.length}/{allBadges.length} låst op)
                </h3>
                <BadgeGrid badges={allBadges} showProgress />
              </motion.div>
            </section>

            {/* Category Progress */}
            <section className="mb-6 sm:mb-8" aria-labelledby="progress-heading">
              <motion.h2
                id="progress-heading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2"
              >
                <span aria-hidden="true">📈</span>
                Fremskridt per kategori
              </motion.h2>
              <div className="space-y-3">
                {stats!.categoryStats.map((cat, index) => (
                  <CategoryProgressItem
                    key={cat.id}
                    emoji={cat.emoji}
                    name={cat.name}
                    answered={cat.answered}
                    total={cat.total}
                    color={cat.color}
                    index={index}
                  />
                ))}
              </div>
            </section>

            {/* Fun Stats */}
            <section className="mb-6 sm:mb-8" aria-labelledby="fun-stats-heading">
              <motion.h2
                id="fun-stats-heading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2"
              >
                <span aria-hidden="true">🎯</span>
                Fun Facts
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {stats!.mostPlayedCategory && (
                  <FunStatBadge
                    icon={stats!.mostPlayedCategory.emoji}
                    title="Mest spillede kategori"
                    value={`${stats!.mostPlayedCategory.name} (${stats!.mostPlayedCategory.answered} spørgsmål)`}
                    color="from-amber-400 to-orange-500"
                    delay={0.6}
                  />
                )}
                {stats!.favoriteCategory && (
                  <FunStatBadge
                    icon={stats!.favoriteCategory.emoji}
                    title="Flest favoritter fra"
                    value={`${stats!.favoriteCategory.name} (${stats!.favoriteCategory.count} favoritter)`}
                    color="from-rose-400 to-red-500"
                    delay={0.7}
                  />
                )}
                {stats!.mostActiveDay && (
                  <FunStatBadge
                    icon="📅"
                    title="Mest aktive dag"
                    value={stats!.mostActiveDay.day}
                    color="from-cyan-400 to-blue-500"
                    delay={0.8}
                  />
                )}
                {stats!.totalDaysActive > 0 && (
                  <FunStatBadge
                    icon="🔥"
                    title="Aktive dage"
                    value={`${stats!.totalDaysActive} ${stats!.totalDaysActive === 1 ? "dag" : "dage"}`}
                    color="from-red-400 to-orange-500"
                    delay={0.9}
                  />
                )}
                {/* Depth distribution */}
                {favorites.length > 0 && (
                  <FunStatBadge
                    icon={stats!.depthStats.dyb > stats!.depthStats.let ? "🧘" : "😊"}
                    title="Din samtalestil"
                    value={
                      stats!.depthStats.dyb > stats!.depthStats.let
                        ? "Dyb tænker"
                        : stats!.depthStats.let > stats!.depthStats.dyb
                        ? "Isbryder-ekspert"
                        : "Balanceret"
                    }
                    color="from-purple-400 to-violet-500"
                    delay={1.0}
                  />
                )}
                {/* Total progress percentage */}
                {stats!.totalAnswered > 0 && (
                  <FunStatBadge
                    icon="🏆"
                    title="Total fremskridt"
                    value={`${Math.round((stats!.totalAnswered / stats!.totalQuestions) * 100)}% udforsket`}
                    color="from-emerald-400 to-green-500"
                    delay={1.1}
                  />
                )}
                {/* Diversity score */}
                {advancedStats.diversity.diversityScore > 0 && (
                  <FunStatBadge
                    icon="🌈"
                    title="Diversitetsscore"
                    value={`${advancedStats.diversity.diversityScore}% varieret`}
                    color="from-pink-400 to-rose-500"
                    delay={1.2}
                  />
                )}
                {/* Response time */}
                {advancedStats.responseTime.totalTracked > 0 && (
                  <FunStatBadge
                    icon="⏱️"
                    title="Gns. svartid"
                    value={`${Math.round(advancedStats.responseTime.average / 1000)}s per spørgsmål`}
                    color="from-cyan-400 to-teal-500"
                    delay={1.3}
                  />
                )}
              </div>
            </section>

            {/* Question History */}
            {history.length > 0 && (
              <section className="mb-6 sm:mb-8" aria-labelledby="history-heading">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-between mb-3 sm:mb-4 gap-2"
                >
                  <h2
                    id="history-heading"
                    className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-1.5 sm:gap-2"
                  >
                    <span aria-hidden="true">📜</span>
                    <span className="truncate">Seneste spørgsmål</span>
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearHistory}
                    className="text-xs sm:text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors flex items-center gap-1 shrink-0 min-h-[44px] px-2 active:bg-red-50 dark:active:bg-red-900/20 rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Ryd historik
                  </motion.button>
                </motion.div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {(showAllHistory ? history.slice(0, 20) : history.slice(0, 5)).map(
                      (entry, index) => (
                        <HistoryItemCard
                          key={entry.id}
                          entry={entry}
                          index={index}
                        />
                      )
                    )}
                  </AnimatePresence>
                </div>
                {history.length > 5 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    onClick={() => setShowAllHistory(!showAllHistory)}
                    className="mt-3 w-full py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  >
                    {showAllHistory
                      ? "Vis færre"
                      : `Vis ${Math.min(history.length - 5, 15)} mere`}
                  </motion.button>
                )}
              </section>
            )}

            {/* Favorites Preview */}
            {favorites.length > 0 && (
              <section aria-labelledby="favorites-heading">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-between mb-3 sm:mb-4 gap-2"
                >
                  <h2
                    id="favorites-heading"
                    className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-1.5 sm:gap-2"
                  >
                    <span aria-hidden="true">❤️</span>
                    Dine favoritter
                  </h2>
                  <Link
                    href="/favoritter"
                    className="text-xs sm:text-sm text-violet-600 dark:text-violet-400 hover:underline min-h-[44px] flex items-center px-2 active:opacity-70"
                  >
                    Se alle →
                  </Link>
                </motion.div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {(showAllFavorites ? favorites : favorites.slice(0, 3)).map(
                      (fav, index) => (
                        <FavoritePreviewCard
                          key={fav.id}
                          favorite={fav}
                          index={index}
                        />
                      )
                    )}
                  </AnimatePresence>
                </div>
                {favorites.length > 3 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    onClick={() => setShowAllFavorites(!showAllFavorites)}
                    className="mt-3 w-full py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  >
                    {showAllFavorites
                      ? "Vis færre"
                      : `Vis ${favorites.length - 3} mere`}
                  </motion.button>
                )}
              </section>
            )}

            {/* Last activity */}
            {stats!.lastPlayedTimestamp > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center text-slate-400 dark:text-slate-500 text-xs mt-8"
              >
                Sidst aktiv:{" "}
                {new Date(stats!.lastPlayedTimestamp).toLocaleDateString("da-DK", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </motion.p>
            )}
          </>
        )}

        {/* Bottom padding */}
        <div className="h-8" />
        </main>
      </div>
    </PageTransition>
  );
}
