"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories, getTotalQuestionCount } from "@/data/categories";
import { Category } from "@/types";
import { useProgress, useFavorites } from "@/hooks/useLocalStorage";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CategoryGridSkeleton } from "@/components/SkeletonLoader";
import { PageTransition } from "@/components/PageTransition";
import { ShareProgressButton } from "@/components/ShareProgressButton";

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
  const isCompleted = progress.answered >= progress.total;

  return (
    <motion.button
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type="button"
      aria-label={`${category.name}: ${category.description}. ${hasProgress ? `${progress.answered} af ${progress.total} besvaret` : `${category.questions.length} spørgsmål`}`}
      className={`relative group w-full aspect-square rounded-3xl bg-gradient-to-br ${category.color} p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden focus:ring-4 focus:ring-white/50`}
    >
      {/* Background glow effect */}
      <motion.div 
        className="absolute inset-0 bg-white/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true" 
      />
      
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        whileHover={{ translateX: "100%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-hidden="true"
      />
      
      {/* Decorative circles with hover animation */}
      <motion.div 
        className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"
        whileHover={{ scale: 1.2, opacity: 0.15 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true" 
      />
      <motion.div 
        className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full"
        whileHover={{ scale: 1.2, opacity: 0.15 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true" 
      />
      
      {/* Completed badge */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
          aria-label="Kategori fuldført"
        >
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
      
      {/* Progress bar at bottom */}
      {hasProgress && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20"
          role="progressbar"
          aria-valuenow={progress.answered}
          aria-valuemin={0}
          aria-valuemax={progress.total}
          aria-label={`Fremskridt: ${progress.answered} af ${progress.total} spørgsmål besvaret`}
        >
          <motion.div
            className={`h-full ${isCompleted ? "bg-emerald-400" : "bg-white/80"}`}
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
          aria-hidden="true"
        >
          {category.emoji}
        </motion.span>
        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
        <p className="text-sm text-white/90 leading-tight">
          {category.description}
        </p>
        <motion.div 
          className="mt-3 text-xs text-white/80"
          whileHover={{ scale: 1.05 }}
        >
          {hasProgress ? (
            <span className="flex items-center gap-1">
              <span>{progress.answered}/{progress.total}</span>
              <span>{isCompleted ? "✨ Fuldført" : "besvaret"}</span>
            </span>
          ) : (
            <span>{category.questions.length} spørgsmål</span>
          )}
        </motion.div>
      </div>
    </motion.button>
  );
}

export default function SpilPage() {
  const router = useRouter();
  const { getCategoryProgress, isLoaded: progressLoaded } = useProgress();
  const { favorites, isLoaded: favoritesLoaded } = useFavorites();

  const handleCategorySelect = (category: Category) => {
    router.push(`/spil/${category.id}`);
  };

  const isLoaded = progressLoaded && favoritesLoaded;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main id="main-content" className="flex min-h-screen flex-col px-6 py-12" role="main">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <nav className="flex items-center justify-center gap-4 mb-6" aria-label="Hovednavigation">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 rounded-lg px-2 py-1"
              aria-label="Gå til forsiden"
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
              Hjem
            </Link>
            
            <ThemeToggle className="text-slate-500 dark:text-slate-400" />
            
            <ShareProgressButton className="text-slate-500 dark:text-slate-400" />
            
            <Link
              href="/statistik"
              className="inline-flex items-center gap-2 text-violet-500 hover:text-violet-600 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 rounded-lg px-2 py-1"
              aria-label="Se din statistik og fremskridt"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Statistik
            </Link>
            
            {favorites.length > 0 && (
              <Link
                href="/favoritter"
                className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 rounded-lg px-2 py-1"
                aria-label={`Se dine ${favorites.length} gemte favoritter`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favorites.length} favoritter
              </Link>
            )}
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Vælg en kategori
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Hvad vil I tale om i aften?
          </p>
        </motion.header>

        {/* Category Grid */}
        {!isLoaded ? (
          <CategoryGridSkeleton count={categories.length} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto w-full"
          >
            {categories.map((category) => {
              const categoryProgress = getCategoryProgress(category.id);
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
        )}

        {/* Shuffle All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="max-w-5xl mx-auto w-full mt-8"
        >
          <motion.button
            type="button"
            onClick={() => router.push("/spil/shuffle-all")}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative group overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
            aria-label={`Shuffle All: Spil med alle ${getTotalQuestionCount()} spørgsmål blandet sammen`}
          >
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              aria-hidden="true"
            />
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" aria-hidden="true" />
            
            {/* Content */}
            <div className="relative flex items-center justify-center gap-4">
              <motion.span
                className="text-4xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                aria-hidden="true"
              >
                🎲
              </motion.span>
              <div className="text-left">
                <h3 className="text-xl font-bold">Shuffle All</h3>
                <p className="text-sm text-white/80">
                  Bland alle {getTotalQuestionCount()} spørgsmål fra alle kategorier
                </p>
              </div>
              <motion.svg
                className="w-6 h-6 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </div>
            
            {/* Progress indicator for Shuffle All */}
            {(() => {
              const shuffleProgress = getCategoryProgress("shuffle-all");
              const totalQuestions = getTotalQuestionCount();
              const hasProgress = shuffleProgress.answeredIds.length > 0;
              const progressPercent = (shuffleProgress.answeredIds.length / totalQuestions) * 100;
              
              if (!hasProgress) return null;
              
              return (
                <div className="relative mt-4">
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white/80 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-white/70 mt-1 text-right">
                    {shuffleProgress.answeredIds.length} / {totalQuestions} besvaret
                  </p>
                </div>
              );
            })()}
          </motion.button>
        </motion.div>

        {/* Random Category Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-8"
        >
          <button
            type="button"
            onClick={() => {
              const randomCategory =
                categories[Math.floor(Math.random() * categories.length)];
              handleCategorySelect(randomCategory);
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600"
            aria-label="Vælg en tilfældig kategori"
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
