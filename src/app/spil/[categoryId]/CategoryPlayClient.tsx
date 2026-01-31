"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { getCategory, getRandomQuestion } from "@/data/categories";
import { notFound } from "next/navigation";
import type { Question } from "@/types";
import { useFavorites, useProgress } from "@/hooks/useLocalStorage";
import { useSound } from "@/hooks/useSound";
import { ShareButton } from "@/components/ShareButton";
import { ThemeToggle } from "@/components/ThemeToggle";

interface Props {
  categoryId: string;
}

function DepthIndicator({ depth }: { depth: Question["depth"] }) {
  const config = {
    let: { label: "Let", dots: 1, color: "bg-green-400" },
    medium: { label: "Medium", dots: 2, color: "bg-yellow-400" },
    dyb: { label: "Dyb", dots: 3, color: "bg-red-400" },
  };

  const { label, dots, color } = config[depth];

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i <= dots ? color : "bg-slate-300 dark:bg-slate-600"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</span>
    </div>
  );
}

function FavoriteButton({
  isFavorite,
  onToggle,
}: {
  isFavorite: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      aria-label={isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"}
    >
      <motion.svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill={isFavorite ? "#ef4444" : "none"}
        stroke={isFavorite ? "#ef4444" : "currentColor"}
        strokeWidth={2}
        initial={false}
        animate={isFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </motion.svg>
    </motion.button>
  );
}

function QuestionCard({
  question,
  categoryName,
  isFlipped,
  onFlip,
  isFavorite,
  onToggleFavorite,
}: {
  question: Question;
  categoryName: string;
  isFlipped: boolean;
  onFlip: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <div className="perspective-1000 w-full max-w-sm mx-auto">
      <motion.div
        className="relative w-full h-[400px] cursor-pointer"
        onClick={onFlip}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card (hidden question) */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-white/20 flex flex-col items-center justify-center p-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-7xl mb-6"
            >
              🎴
            </motion.div>
            <p className="text-white text-xl font-medium text-center">
              Tryk for at se spørgsmålet
            </p>
            <motion.div
              className="mt-4 flex gap-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <span className="text-white/60">•</span>
              <span className="text-white/60">•</span>
              <span className="text-white/60">•</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Back of card (question revealed) */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 relative">
            {/* Top bar with depth, share and favorite */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <DepthIndicator depth={question.depth} />
              <div className="flex items-center gap-1">
                <ShareButton 
                  text={question.text} 
                  categoryName={categoryName}
                />
                <FavoriteButton
                  isFavorite={isFavorite}
                  onToggle={onToggleFavorite}
                />
              </div>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-800 dark:text-slate-100 text-2xl font-medium text-center leading-relaxed"
            >
              {question.text}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function CategoryPlayClient({ categoryId }: Props) {
  const category = getCategory(categoryId);
  
  const { isFavorite, toggleFavorite, isLoaded: favoritesLoaded } = useFavorites();
  const { getCategoryProgress, markAnswered, resetCategory, isLoaded: progressLoaded } = useProgress();
  const { playFlip, playSuccess, playTap } = useSound();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize from saved progress
  useEffect(() => {
    if (!progressLoaded || !category) return;
    
    const savedProgress = getCategoryProgress(categoryId);
    if (savedProgress.answeredIds.length > 0) {
      setAskedQuestionIds(savedProgress.answeredIds);
      setAnsweredCount(savedProgress.answeredIds.length);
    }
    
    // Get initial question excluding already answered ones
    const excludeIds = savedProgress.answeredIds.length >= category.questions.length 
      ? [] 
      : savedProgress.answeredIds;
    const firstQuestion = getRandomQuestion(categoryId, excludeIds);
    setCurrentQuestion(firstQuestion);
  }, [progressLoaded, category, categoryId, getCategoryProgress]);

  const handleFlip = useCallback(() => {
    playFlip();
    setIsFlipped((prev) => !prev);
  }, [playFlip]);

  const handleNextQuestion = useCallback(() => {
    if (!category || isTransitioning) return;

    setIsTransitioning(true);
    playTap();

    // Mark current question as answered
    if (currentQuestion) {
      markAnswered(categoryId, currentQuestion.id);
    }

    // Flip back first if flipped
    if (isFlipped) {
      setIsFlipped(false);
    }

    // Wait for flip animation, then change question
    setTimeout(() => {
      const newAskedIds = currentQuestion
        ? [...askedQuestionIds, currentQuestion.id]
        : askedQuestionIds;

      // Reset if all questions have been asked
      const idsToExclude =
        newAskedIds.length >= category.questions.length ? [] : newAskedIds;

      const nextQuestion = getRandomQuestion(categoryId, idsToExclude);

      if (nextQuestion) {
        setAskedQuestionIds(
          idsToExclude.length === 0 ? [nextQuestion.id] : [...idsToExclude]
        );
        setCurrentQuestion(nextQuestion);
        setAnsweredCount((prev) => prev + 1);
      }

      setIsTransitioning(false);
    }, isFlipped ? 400 : 100);
  }, [
    category,
    categoryId,
    currentQuestion,
    askedQuestionIds,
    isFlipped,
    isTransitioning,
    markAnswered,
    playTap,
  ]);

  const handleResetProgress = useCallback(() => {
    resetCategory(categoryId);
    setAskedQuestionIds([]);
    setAnsweredCount(0);
    const firstQuestion = getRandomQuestion(categoryId);
    setCurrentQuestion(firstQuestion);
    setIsFlipped(false);
  }, [categoryId, resetCategory]);

  const handleToggleFavorite = useCallback(() => {
    if (!currentQuestion) return;
    playSuccess();
    toggleFavorite({
      id: currentQuestion.id,
      categoryId: currentQuestion.categoryId,
      text: currentQuestion.text,
      depth: currentQuestion.depth,
    });
  }, [currentQuestion, toggleFavorite, playSuccess]);

  if (!category) {
    notFound();
  }

  // Show loading state while localStorage loads
  if (!progressLoaded || !favoritesLoaded) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${category.color} flex items-center justify-center`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const totalQuestions = category.questions.length;
  const progress = Math.min((answeredCount / totalQuestions) * 100, 100);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${category.color} relative overflow-hidden`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
      </div>

      <main className="relative flex min-h-screen flex-col items-center px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md flex items-center justify-between mb-8"
        >
          <Link
            href="/spil"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
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
            <span className="hidden sm:inline">Kategorier</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.emoji}</span>
            <span className="text-white font-semibold">{category.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className="text-white" />
            <Link
              href="/favoritter"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/80 hover:text-white transition-colors"
              title="Se favoritter"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          className="w-full max-w-md mb-8"
        >
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/80 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-white/60 text-xs">
            <button
              onClick={handleResetProgress}
              className="hover:text-white/90 transition-colors underline"
            >
              Nulstil
            </button>
            <span>
              {answeredCount} / {totalQuestions} spørgsmål
            </span>
          </div>
        </motion.div>

        {/* Question Card */}
        <div className="flex-1 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
                className="w-full"
              >
                <QuestionCard
                  question={currentQuestion}
                  categoryName={category.name}
                  isFlipped={isFlipped}
                  onFlip={handleFlip}
                  isFavorite={isFavorite(currentQuestion.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Next question button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 w-full max-w-sm"
        >
          <motion.button
            onClick={handleNextQuestion}
            disabled={isTransitioning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <span>Næste spørgsmål</span>
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
          </motion.button>

          <p className="text-center text-white/60 text-sm mt-4">
            Tryk på kortet for at vende det • ❤️ for at gemme • 📤 for at dele
          </p>
        </motion.div>
      </main>
    </div>
  );
}
