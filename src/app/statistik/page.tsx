"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useFavorites, useProgress, useQuestionHistory, FavoriteQuestion, HistoryEntry } from "@/hooks/useLocalStorage";
import { useStreak } from "@/hooks/useStreak";
import { useDailyChallenge, DAILY_CHALLENGE_POINTS } from "@/hooks/useDailyChallenge";
import { categories, getCategory } from "@/data/categories";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StreakDisplay, StreakCelebration } from "@/components/StreakDisplay";

// Stat card component
function StatCard({
  icon,
  label,
  value,
  subtext,
  gradient,
  delay = 0,
}: {
  icon: string;
  label: string;
  value: string | number;
  subtext?: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-lg`}
    >
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />
      <div className="relative">
        <span className="text-3xl mb-2 block" aria-hidden="true">
          {icon}
        </span>
        <p className="text-white/80 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        {subtext && (
          <p className="text-white/70 text-xs mt-1">{subtext}</p>
        )}
      </div>
    </motion.div>
  );
}

// Category progress item
function CategoryProgressItem({
  emoji,
  name,
  answered,
  total,
  color,
  index,
}: {
  emoji: string;
  name: string;
  answered: number;
  total: number;
  color: string;
  index: number;
}) {
  const percent = Math.round((answered / total) * 100);
  const isCompleted = answered >= total;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            {emoji}
          </span>
          <span className="font-medium text-slate-800 dark:text-slate-100">
            {name}
          </span>
          {isCompleted && (
            <span className="text-emerald-500 text-sm">✓</span>
          )}
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {answered}/{total}
        </span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ delay: 0.2 + 0.1 * index, duration: 0.5 }}
        />
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 text-right">
        {percent}%
      </p>
    </motion.div>
  );
}

// Fun stat badge
function FunStatBadge({
  icon,
  title,
  value,
  color,
  delay = 0,
}: {
  icon: string;
  title: string;
  value: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 150 }}
      className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${color} shadow-md`}
    >
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="text-xs text-white/70 font-medium">{title}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
}

// Favorite preview card
function FavoritePreviewCard({
  favorite,
  index,
}: {
  favorite: FavoriteQuestion;
  index: number;
}) {
  const category = getCategory(favorite.categoryId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <div className="flex items-start gap-2">
        {category && (
          <span className="text-lg shrink-0" aria-hidden="true">
            {category.emoji}
          </span>
        )}
        <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed line-clamp-2">
          {favorite.text}
        </p>
      </div>
    </motion.div>
  );
}

// History item card
function HistoryItemCard({
  entry,
  index,
}: {
  entry: HistoryEntry;
  index: number;
}) {
  const category = getCategory(entry.categoryId);
  const date = new Date(entry.answeredAt);
  const formattedDate = date.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const depthEmoji = {
    let: "🟢",
    medium: "🟡",
    dyb: "🔴",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index }}
      className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <div className="flex items-start gap-3">
        {category && (
          <span className="text-xl shrink-0" aria-hidden="true">
            {category.emoji}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed line-clamp-2">
            {entry.text}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 dark:text-slate-500">
            <span aria-label={`Dybde: ${entry.depth}`}>{depthEmoji[entry.depth]}</span>
            <span>•</span>
            <span>{formattedDate}</span>
            {category && (
              <>
                <span>•</span>
                <span>{category.name}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl mb-4"
        aria-hidden="true"
      >
        📊
      </motion.div>
      <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
        Ingen statistik endnu
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
        Start et spil for at se din fremgang her!
      </p>
      <Link
        href="/spil"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
      >
        <span>Start et spil</span>
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
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>
    </motion.div>
  );
}

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

  const isLoaded = progressLoaded && favoritesLoaded && historyLoaded && streakLoaded;

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

  const hasActivity = stats && (stats.totalAnswered > 0 || favorites.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
      <main id="main-content" className="max-w-3xl mx-auto px-6 py-8" role="main">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            href="/spil"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
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
            <span>Tilbage</span>
          </Link>

          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span aria-hidden="true">📊</span>
            <span>Statistik</span>
          </h1>

          <ThemeToggle className="text-slate-600 dark:text-slate-400" />
        </motion.header>

        {/* Streak Celebration Modal */}
        <StreakCelebration />

        {!hasActivity ? (
          <EmptyState />
        ) : (
          <>
            {/* Streak Display */}
            <section className="mb-8" aria-labelledby="streak-heading">
              <h2 id="streak-heading" className="sr-only">
                Streak
              </h2>
              <StreakDisplay />
            </section>

            {/* Overview Stats */}
            <section className="mb-8" aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="sr-only">
                Overblik
              </h2>
              <div className="grid grid-cols-2 gap-4">
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

            {/* Category Progress */}
            <section className="mb-8" aria-labelledby="progress-heading">
              <motion.h2
                id="progress-heading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2"
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
            <section className="mb-8" aria-labelledby="fun-stats-heading">
              <motion.h2
                id="fun-stats-heading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2"
              >
                <span aria-hidden="true">🎯</span>
                Fun Facts
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              </div>
            </section>

            {/* Question History */}
            {history.length > 0 && (
              <section className="mb-8" aria-labelledby="history-heading">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-between mb-4"
                >
                  <h2
                    id="history-heading"
                    className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2"
                  >
                    <span aria-hidden="true">📜</span>
                    Seneste spørgsmål
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearHistory}
                    className="text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors flex items-center gap-1"
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
                  className="flex items-center justify-between mb-4"
                >
                  <h2
                    id="favorites-heading"
                    className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2"
                  >
                    <span aria-hidden="true">❤️</span>
                    Dine favoritter
                  </h2>
                  <Link
                    href="/favoritter"
                    className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
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
  );
}
