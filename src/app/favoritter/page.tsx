"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useFavorites, FavoriteQuestion } from "@/hooks/useLocalStorage";
import { useQuestionRatings } from "@/hooks/useQuestionRatings";
import { getCategory } from "@/data/categories";
import { ShareButton } from "@/components/ShareButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RatingStars, RatingStarsDisplay } from "@/components/RatingStars";
import { PageTransition } from "@/components/PageTransition";
import { InteractiveCard } from "@/components/InteractiveCard";
import { DepthBadge } from "@/components/DepthBadge";
import { EmptyState, EmptyStatePresets } from "@/components/EmptyState";

function FavoriteCard({
  favorite,
  onRemove,
}: {
  favorite: FavoriteQuestion;
  onRemove: () => void;
}) {
  const category = getCategory(favorite.categoryId);
  const { isRated } = useQuestionRatings();
  const hasRating = isRated(favorite.id);
  
  return (
    <InteractiveCard
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      glowColor="rose"
      hover={true}
      press={false}
      aria-label={`Favoritspørgsmål: ${favorite.text}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {category && (
            <>
              <span className="text-lg" aria-hidden="true">{category.emoji}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {category.name}
              </span>
            </>
          )}
          <DepthBadge depth={favorite.depth} />
        </div>
        <div className="flex items-center gap-1">
          <ShareButton 
            text={favorite.text} 
            categoryName={category?.name} 
            className="text-slate-400"
          />
          <motion.button
            type="button"
            onClick={onRemove}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-red-400 hover:text-red-500 transition-colors focus:ring-2 focus:ring-red-300 touch-manipulation flex items-center justify-center"
            aria-label={`Fjern "${favorite.text.substring(0, 30)}..." fra favoritter`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </div>
      
      <p className="text-slate-800 dark:text-slate-100 text-lg leading-relaxed">
        {favorite.text}
      </p>
      
      {/* Rating section */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
        {hasRating ? (
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 dark:text-slate-500">Din rating:</span>
            <RatingStarsDisplay questionId={favorite.id} size="sm" />
          </div>
        ) : (
          <RatingStars
            questionId={favorite.id}
            size="sm"
            showLabel={false}
            compact
          />
        )}
      </div>
      
      <p className="text-slate-400 dark:text-slate-500 text-xs mt-3">
        <time dateTime={new Date(favorite.savedAt).toISOString()}>
          Gemt {new Date(favorite.savedAt).toLocaleDateString("da-DK", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      </p>
    </InteractiveCard>
  );
}

/** FavoritesEmptyState uses the shared EmptyState component with favorites preset */
function FavoritesEmptyState() {
  return <EmptyState {...EmptyStatePresets.favorites} />;
}

export default function FavoritesPage() {
  const { favorites, removeFavorite, isLoaded } = useFavorites();
  const [filter, setFilter] = useState<string | null>(null);

  // Get unique categories from favorites
  const categoryIds = [...new Set(favorites.map((f) => f.categoryId))];
  const categories = categoryIds.map((id) => getCategory(id)).filter(Boolean);

  const filteredFavorites = filter
    ? favorites.filter((f) => f.categoryId === filter)
    : favorites;

  // Sort by most recently saved
  const sortedFavorites = [...filteredFavorites].sort(
    (a, b) => b.savedAt - a.savedAt
  );

  if (!isLoaded) {
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center"
        role="status"
        aria-live="polite"
        aria-label="Indlæser favoritter"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-3 border-rose-400 border-t-transparent rounded-full"
          aria-hidden="true"
        />
        <span className="sr-only">Indlæser...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-950 dark:to-slate-900">
      <PageTransition>
        <main id="main-content" className="max-w-2xl mx-auto px-6 py-8" role="main">
          {/* Header */}
          <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            href="/spil"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 rounded-lg px-2 py-1"
            aria-label="Tilbage til kategorioversigt"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
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
            <span aria-hidden="true">❤️</span>
            <span>Favoritter</span>
          </h1>

          <div className="flex items-center gap-3">
            <ThemeToggle className="text-slate-600 dark:text-slate-400" />
            <span className="text-slate-500 dark:text-slate-400 text-sm" aria-live="polite">
              {favorites.length} {favorites.length === 1 ? "spørgsmål" : "spørgsmål"}
            </span>
          </div>
        </motion.header>

        {/* Filter chips */}
        {categories.length > 1 && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-6 -mx-1"
            aria-label="Filtrer efter kategori"
            role="group"
          >
            <button
              type="button"
              onClick={() => setFilter(null)}
              className={`min-h-[44px] px-4 py-2.5 rounded-full text-sm font-medium transition-all focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 touch-manipulation active:scale-95 ${
                filter === null
                  ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
              aria-pressed={filter === null}
            >
              Alle
            </button>
            {categories.map(
              (cat) =>
                cat && (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`min-h-[44px] px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 touch-manipulation active:scale-95 ${
                      filter === cat.id
                        ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                    aria-pressed={filter === cat.id}
                  >
                    <span aria-hidden="true">{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </button>
                )
            )}
          </motion.nav>
        )}

        {/* Favorites list or empty state */}
        {favorites.length === 0 ? (
          <FavoritesEmptyState />
        ) : (
          <motion.div layout className="space-y-4">
            <AnimatePresence>
              {sortedFavorites.map((favorite) => (
                <FavoriteCard
                  key={favorite.id}
                  favorite={favorite}
                  onRemove={() => removeFavorite(favorite.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

          {/* Bottom padding for mobile */}
          <div className="h-8" />
        </main>
      </PageTransition>
    </div>
  );
}
