"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useFavorites, FavoriteQuestion } from "@/hooks/useLocalStorage";
import { getCategory } from "@/data/categories";

function DepthBadge({ depth }: { depth: FavoriteQuestion["depth"] }) {
  const config = {
    let: { label: "Let", color: "bg-green-100 text-green-700" },
    medium: { label: "Medium", color: "bg-yellow-100 text-yellow-700" },
    dyb: { label: "Dyb", color: "bg-red-100 text-red-700" },
  };

  const { label, color } = config[depth];

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}

function FavoriteCard({
  favorite,
  onRemove,
}: {
  favorite: FavoriteQuestion;
  onRemove: () => void;
}) {
  const category = getCategory(favorite.categoryId);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-2xl p-5 shadow-md border border-slate-100"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {category && (
            <>
              <span className="text-lg">{category.emoji}</span>
              <span className="text-sm text-slate-500 font-medium">
                {category.name}
              </span>
            </>
          )}
          <DepthBadge depth={favorite.depth} />
        </div>
        <motion.button
          onClick={onRemove}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1.5 rounded-full hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors"
          title="Fjern fra favoritter"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </div>
      
      <p className="text-slate-800 text-lg leading-relaxed">
        {favorite.text}
      </p>
      
      <p className="text-slate-400 text-xs mt-3">
        Gemt {new Date(favorite.savedAt).toLocaleDateString("da-DK", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl mb-6"
      >
        💝
      </motion.div>
      <h2 className="text-xl font-semibold text-slate-700 mb-2">
        Ingen favoritter endnu
      </h2>
      <p className="text-slate-500 mb-6 max-w-sm mx-auto">
        Tryk på hjertet ❤️ på et spørgsmål for at gemme det her
      </p>
      <Link
        href="/spil"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
      >
        <span>Start et spil</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </motion.div>
  );
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
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-3 border-rose-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            href="/spil"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
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

          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span>❤️</span>
            <span>Favoritter</span>
          </h1>

          <span className="text-slate-500 text-sm">
            {favorites.length} {favorites.length === 1 ? "spørgsmål" : "spørgsmål"}
          </span>
        </motion.div>

        {/* Filter chips */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === null
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              Alle
            </button>
            {categories.map(
              (cat) =>
                cat && (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                      filter === cat.id
                        ? "bg-slate-800 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </button>
                )
            )}
          </motion.div>
        )}

        {/* Favorites list or empty state */}
        {favorites.length === 0 ? (
          <EmptyState />
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
    </div>
  );
}
