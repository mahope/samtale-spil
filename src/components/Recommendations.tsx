"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRecommendations } from "@/hooks/useRecommendations";
import type { Recommendation } from "@/hooks/useRecommendations";

// Single recommendation card
const RecommendationCard = memo(function RecommendationCard({
  recommendation,
  onDismiss,
  index,
}: {
  recommendation: Recommendation;
  onDismiss: (id: string) => void;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const depthColors = {
    let: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    dyb: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  };

  const depthLabels = { let: "Let", medium: "Mellem", dyb: "Dyb" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all duration-300">
        {/* Header with category and dismiss */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              {recommendation.categoryEmoji}
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {recommendation.categoryName}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${depthColors[recommendation.question.depth]}`}
            >
              {depthLabels[recommendation.question.depth]}
            </span>
          </div>

          {/* Dismiss button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            onClick={(e) => {
              e.preventDefault();
              onDismiss(recommendation.question.id);
            }}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Skjul denne anbefaling"
            title="Skjul denne anbefaling"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </div>

        {/* Question text */}
        <p className="text-slate-800 dark:text-slate-200 font-medium mb-3 line-clamp-2">
          {recommendation.question.text}
        </p>

        {/* Reason why it's recommended */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 text-violet-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {recommendation.reason}
        </p>

        {/* Try this button */}
        <Link
          href={`/spil/${recommendation.question.categoryId}?question=${recommendation.question.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span>Prøv denne</span>
          <svg
            className="w-4 h-4"
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
      </div>
    </motion.div>
  );
});

// Empty state when no recommendations
const EmptyState = memo(function EmptyState() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
        <svg
          className="w-6 h-6 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
          />
        </svg>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Svar på nogle spørgsmål og gem favoritter, <br />
        så finder vi anbefalinger til dig!
      </p>
    </div>
  );
});

// Main Recommendations component
function RecommendationsComponent() {
  const { recommendations, dismissRecommendation, hasEnoughData, isLoaded } =
    useRecommendations();
  const [showAll, setShowAll] = useState(false);

  // Don't render until loaded
  if (!isLoaded) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-12">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-48" />
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl" />
        </div>
      </div>
    );
  }

  // Don't show section if no data yet
  if (!hasEnoughData) {
    return null;
  }

  // If no recommendations (all dismissed or answered)
  if (recommendations.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full max-w-2xl mx-auto mt-12 px-4"
        aria-labelledby="recommendations-heading"
      >
        <h2
          id="recommendations-heading"
          className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"
        >
          <span aria-hidden="true">✨</span>
          Anbefalet til dig
        </h2>
        <EmptyState />
      </motion.section>
    );
  }

  const visibleRecommendations = showAll
    ? recommendations
    : recommendations.slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-12 px-4"
      aria-labelledby="recommendations-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          id="recommendations-heading"
          className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2"
        >
          <span aria-hidden="true">✨</span>
          Anbefalet til dig
        </h2>
        {recommendations.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
          >
            {showAll ? "Vis færre" : `Se alle ${recommendations.length}`}
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visibleRecommendations.map((rec, index) => (
            <RecommendationCard
              key={rec.question.id}
              recommendation={rec}
              onDismiss={dismissRecommendation}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export const Recommendations = memo(RecommendationsComponent);
