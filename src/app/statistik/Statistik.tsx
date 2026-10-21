"use client";

import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { type ReactNode, useMemo, useState } from "react";
import { useFavorites, useProgress, useQuestionHistory } from "@/hooks/useLocalStorage";
import { useQuestionRatings } from "@/hooks/useQuestionRatings";
import { categories, getCategory, getQuestionById } from "@/data/categories";
import { getDeck } from "@/data/decks";
import { RatingStarsDisplay } from "@/components/RatingStars";
import { FavoritePreviewCard } from "@/components/FavoritePreviewCard";
import { HistoryItemCard } from "@/components/HistoryItemCard";
import { StatsHeatMap } from "@/components/StatsHeatMap";
import { useAdvancedStats } from "@/hooks/useAdvancedStats";

function Figure({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-2xl bg-flade p-4 ring-1 ring-streg">
      <p className="font-display text-3xl font-bold tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-blaek-2">{label}</p>
    </div>
  );
}

/** Your own statistics. Without site (the app) only the body: the app screen has its own bar. */
export function Statistik({ site }: { site?: { header: ReactNode; footer: ReactNode } }) {
  const app = !site;
  const { favorites, isLoaded: favoritesLoaded } = useFavorites();
  const { progress, isLoaded: progressLoaded } = useProgress();
  const { history, clearHistory, isLoaded: historyLoaded } = useQuestionHistory();
  const { getTopRated, stats: ratingStats, isLoaded: ratingsLoaded } = useQuestionRatings();
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

  const isLoaded = progressLoaded && favoritesLoaded && historyLoaded && ratingsLoaded;
  const hasActivity = stats && (stats.totalAnswered > 0 || favorites.length > 0);

  const body = (
    <>
      <p className="mt-3 text-lg text-blaek-2">Hvad I har spillet på denne enhed. Intet af det forlader telefonen.</p>

      {!isLoaded ? (
        <p className="mt-8 text-blaek-2" role="status">Henter din statistik</p>
      ) : !hasActivity ? (
        <div className="mt-8 rounded-2xl bg-flade p-6 ring-1 ring-streg">
          <p>Der er intet at vise endnu. Når I har spillet lidt, kan du se her, hvor langt I er nået i hver bunke.</p>
          <Link
            href={app ? "/" : "/spil/"}
            className="mt-5 inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek"
          >
            Vælg et spil
          </Link>
        </div>
      ) : (
        <>
          <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Overblik">
            <Figure value={stats!.totalAnswered} label={`af ${stats!.totalQuestions.toLocaleString("da-DK")} kort spillet`} />
            <Figure value={favorites.length} label={favorites.length === 1 ? "favorit" : "favoritter"} />
            <Figure value={`${stats!.completedCategories}/${stats!.totalCategories}`} label="bunker spillet igennem" />
            <Figure value={stats!.deepQuestionsAnswered} label="dybe kort" />
          </section>

          <section className="mt-12" aria-labelledby="progress-heading">
            <h2 id="progress-heading" className="text-2xl font-bold">Hvor langt I er nået</h2>
            <ul className="mt-4 space-y-3">
              {stats!.categoryStats.map((cat) => {
                const pct = cat.total > 0 ? Math.round((cat.answered / cat.total) * 100) : 0;
                const deck = getDeck(cat.id);
                return (
                  <li key={cat.id}>
                    <div className="flex items-baseline justify-between gap-3 text-[0.95rem]">
                      <Link href={`/spil/${cat.id}/`} className="font-semibold hover:underline">
                        {cat.name}
                      </Link>
                      <span className="tabular-nums text-blaek-2">
                        {cat.answered} af {cat.total}
                      </span>
                    </div>
                    <div
                      className="mt-1.5 h-2 overflow-hidden rounded-full bg-flade-2"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${cat.name}: ${pct} procent`}
                    >
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: deck.bg }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-12" aria-labelledby="heatmap-heading">
            <h2 id="heatmap-heading" className="text-2xl font-bold">Hvornår I har spillet</h2>
            <div className="mt-4">
              <StatsHeatMap
                data={advancedStats.heatmap.data}
                getActivityLevel={advancedStats.heatmap.getLevel}
                stats={advancedStats.heatmap.stats}
              />
            </div>
          </section>

          {ratingStats.totalRated > 0 && (
            <section className="mt-12" aria-labelledby="top-rated-heading">
              <h2 id="top-rated-heading" className="text-2xl font-bold">Dem I bedst kunne lide</h2>
              <p className="mt-1 text-blaek-2">
                {ratingStats.totalRated} kort bedømt, i gennemsnit {ratingStats.averageRating} stjerner.
              </p>
              <ul className="mt-4 space-y-2">
                {getTopRated(5).map((rating) => {
                  const questionData = getQuestionById(rating.questionId);
                  if (!questionData) return null;
                  const { question, category } = questionData;
                  return (
                    <li key={rating.questionId} className="rounded-2xl bg-flade p-4 ring-1 ring-streg">
                      <p className="leading-snug">{question.text}</p>
                      <div className="mt-2 flex items-center justify-between text-sm text-blaek-2">
                        <span>{category.name}</span>
                        <RatingStarsDisplay questionId={rating.questionId} size="sm" showValue={false} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {history.length > 0 && (
            <section className="mt-12" aria-labelledby="history-heading">
              <div className="flex items-center justify-between gap-2">
                <h2 id="history-heading" className="text-2xl font-bold">Seneste kort</h2>
                <button
                  type="button"
                  onClick={clearHistory}
                  className="min-h-11 rounded px-2 text-sm font-semibold text-blaek-2 underline underline-offset-4 hover:text-blaek"
                >
                  Ryd listen
                </button>
              </div>
              <div className="mt-4 space-y-2">
                <AnimatePresence>
                  {(showAllHistory ? history.slice(0, 20) : history.slice(0, 5)).map((entry, index) => (
                    <HistoryItemCard key={entry.id} entry={entry} index={index} />
                  ))}
                </AnimatePresence>
              </div>
              {history.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="mt-3 min-h-11 w-full rounded-lg text-sm font-semibold text-blaek-2 hover:bg-flade-2"
                >
                  {showAllHistory ? "Vis færre" : `Vis ${Math.min(history.length - 5, 15)} mere`}
                </button>
              )}
            </section>
          )}

          {favorites.length > 0 && (
            <section className="mt-12" aria-labelledby="favorites-heading">
              <div className="flex items-center justify-between gap-2">
                <h2 id="favorites-heading" className="text-2xl font-bold">Dine favoritter</h2>
                <Link href="/favoritter/" className="inline-flex min-h-11 items-center px-2 text-sm font-semibold underline underline-offset-4">
                  Se alle
                </Link>
              </div>
              <div className="mt-4 space-y-2">
                <AnimatePresence>
                  {(showAllFavorites ? favorites : favorites.slice(0, 3)).map((fav, index) => (
                    <FavoritePreviewCard key={fav.id} favorite={fav} index={index} />
                  ))}
                </AnimatePresence>
              </div>
              {favorites.length > 3 && (
                <button
                  type="button"
                  onClick={() => setShowAllFavorites(!showAllFavorites)}
                  className="mt-3 min-h-11 w-full rounded-lg text-sm font-semibold text-blaek-2 hover:bg-flade-2"
                >
                  {showAllFavorites ? "Vis færre" : `Vis ${favorites.length - 3} mere`}
                </button>
              )}
            </section>
          )}

          {stats!.lastPlayedTimestamp > 0 && (
            <p className="mt-10 text-sm text-blaek-2">
              Sidst spillet{" "}
              {new Date(stats!.lastPlayedTimestamp).toLocaleDateString("da-DK", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              .
            </p>
          )}
        </>
      )}
    </>
  );

  if (app) return body;

  return (
    <>
      {site.header}
      <main id="main-content" className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Din statistik
        </h1>
        {body}
      </main>
      {site.footer}
    </>
  );
}
