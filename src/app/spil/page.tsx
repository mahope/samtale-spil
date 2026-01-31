"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Category } from "@/types";
import { useProgress, useFavorites } from "@/hooks/useLocalStorage";
import { ThemeToggle } from "@/components/ThemeToggle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

function CategoryCard({
  category,
  progress,
  onClick,
}: {
  category: Category;
  progress: { answered: number; total: number };
  onClick: () => void;
}) {
  const progressPercent = (progress.answered / progress.total) * 100;
  const hasProgress = progress.answered > 0;

  return (
    <motion.button
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative group w-full aspect-square rounded-3xl bg-gradient-to-br ${category.color} p-6 text-white shadow-lg hover:shadow-2xl transition-shadow overflow-hidden`}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full" />
      
      {/* Progress bar at bottom */}
      {hasProgress && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
          <motion.div
            className="h-full bg-white/80"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center">
        <motion.span
          className="text-5xl mb-3"
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {category.emoji}
        </motion.span>
        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
        <p className="text-sm text-white/80 leading-tight">
          {category.description}
        </p>
        <div className="mt-3 text-xs text-white/60">
          {hasProgress ? (
            <span className="flex items-center gap-1">
              <span>{progress.answered}/{progress.total}</span>
              <span>besvaret</span>
            </span>
          ) : (
            <span>{category.questions.length} spørgsmål</span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

export default function SpilPage() {
  const { getCategoryProgress, isLoaded: progressLoaded } = useProgress();
  const { favorites, isLoaded: favoritesLoaded } = useFavorites();

  const handleCategorySelect = (category: Category) => {
    window.location.href = `/spil/${category.id}`;
  };

  const isLoaded = progressLoaded && favoritesLoaded;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="flex min-h-screen flex-col px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
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
              Hjem
            </Link>
            
            <ThemeToggle className="text-slate-500 dark:text-slate-400" />
            
            {favorites.length > 0 && (
              <Link
                href="/favoritter"
                className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favorites.length} favoritter
              </Link>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Vælg en kategori
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Hvad vil I tale om i aften?
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto w-full"
        >
          {categories.map((category) => {
            const categoryProgress = isLoaded ? getCategoryProgress(category.id) : { answeredIds: [] };
            return (
              <CategoryCard
                key={category.id}
                category={category}
                progress={{
                  answered: categoryProgress.answeredIds.length,
                  total: category.questions.length,
                }}
                onClick={() => handleCategorySelect(category)}
              />
            );
          })}
        </motion.div>

        {/* Random Category Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => {
              const randomCategory =
                categories[Math.floor(Math.random() * categories.length)];
              handleCategorySelect(randomCategory);
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Overrask mig!
          </button>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center text-slate-400 dark:text-slate-500 text-sm mt-8"
        >
          Tip: Vælg &quot;Sjove&quot; til at varme op, og &quot;Dybe&quot; når I
          er klar til mere
        </motion.p>
      </main>
    </div>
  );
}
