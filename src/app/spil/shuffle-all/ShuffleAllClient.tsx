"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { getCategory, getRandomQuestionFromAll, getTotalQuestionCount } from "@/data/categories";
import type { Question } from "@/types";
import { useFavorites, useProgress, useTimerSettings, useDifficultyFilter } from "@/hooks/useLocalStorage";
import { useSound } from "@/hooks/useSound";
import { ShareButton } from "@/components/ShareButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Confetti, useConfetti, CelebrationOverlay } from "@/components/Confetti";
import { QuestionCardSkeleton } from "@/components/SkeletonLoader";
import { FloatingParticles } from "@/components/FloatingParticles";
import { TimerDisplay, TimerSettingsPanel } from "@/components/TimerDisplay";
import { DifficultyFilter, DifficultyFilterIndicator } from "@/components/DifficultyFilter";

const SHUFFLE_ALL_ID = "shuffle-all";

function DepthIndicator({ depth }: { depth: Question["depth"] }) {
  const config = {
    let: { label: "Let", dots: 1, color: "bg-green-400" },
    medium: { label: "Medium", dots: 2, color: "bg-yellow-400" },
    dyb: { label: "Dyb", dots: 3, color: "bg-red-400" },
  };

  const { label, dots, color } = config[depth];

  return (
    <div className="flex items-center gap-2" role="img" aria-label={`Sværhedsgrad: ${label}`}>
      <div className="flex gap-1" aria-hidden="true">
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

function CategoryBadge({ categoryId }: { categoryId: string }) {
  const category = getCategory(categoryId);
  if (!category) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white text-xs font-medium shadow-sm`}
    >
      <span aria-hidden="true">{category.emoji}</span>
      <span>{category.name}</span>
    </motion.div>
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
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-rose-400"
      aria-label={isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"}
      aria-pressed={isFavorite}
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
        aria-hidden="true"
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
  isFlipped,
  onFlip,
  isFavorite,
  onToggleFavorite,
}: {
  question: Question;
  isFlipped: boolean;
  onFlip: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const category = getCategory(question.categoryId);
  const categoryName = category?.name || "Ukendt";

  return (
    <div className="perspective-1000 w-full max-w-sm mx-auto">
      <motion.div
        className="relative w-full h-[400px] cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/50 rounded-3xl"
        onClick={onFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onFlip();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? `Spørgsmål: ${question.text}. Tryk for at vende kortet` : "Tryk for at se spørgsmålet"}
        aria-pressed={isFlipped}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card (hidden question) */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
          aria-hidden={isFlipped}
        >
          <div className="w-full h-full bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-white/20 flex flex-col items-center justify-center p-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-7xl mb-6"
              aria-hidden="true"
            >
              🎲
            </motion.div>
            <p className="text-white text-xl font-medium text-center">
              Tryk for at se spørgsmålet
            </p>
            <p className="text-white/70 text-sm mt-2">
              Blandet fra alle kategorier
            </p>
            <motion.div
              className="mt-4 flex gap-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              aria-hidden="true"
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
          aria-hidden={!isFlipped}
        >
          <div className="w-full h-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 relative">
            {/* Top bar with category badge */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <CategoryBadge categoryId={question.categoryId} />
                <DepthIndicator depth={question.depth} />
              </div>
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
              className="text-slate-800 dark:text-slate-100 text-2xl font-medium text-center leading-relaxed mt-8"
            >
              {question.text}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ShuffleAllClient() {
  const { isFavorite, toggleFavorite, isLoaded: favoritesLoaded } = useFavorites();
  const { getCategoryProgress, markAnswered, resetCategory, isLoaded: progressLoaded } = useProgress();
  const { playFlip, playSuccess, playTap, playTimeout, playTick } = useSound();
  const { 
    settings: timerSettings, 
    toggleTimer, 
    setDuration: setTimerDuration, 
    toggleSound: toggleTimerSound, 
    toggleVibration: toggleTimerVibration,
    isLoaded: timerLoaded 
  } = useTimerSettings();
  const { filter: difficultyFilter, setFilter: setDifficultyFilter, isLoaded: filterLoaded } = useDifficultyFilter();
  const { isActive: confettiActive, trigger: triggerConfetti } = useConfetti();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebration, setHasShownCelebration] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const totalQuestions = getTotalQuestionCount();
  const filteredQuestionCount = getTotalQuestionCount(difficultyFilter);
  const activeQuestionCount = filteredQuestionCount > 0 ? filteredQuestionCount : totalQuestions;

  // Initialize from saved progress
  useEffect(() => {
    if (!progressLoaded || !filterLoaded) return;
    
    const savedProgress = getCategoryProgress(SHUFFLE_ALL_ID);
    if (savedProgress.answeredIds.length > 0) {
      setAskedQuestionIds(savedProgress.answeredIds);
      setAnsweredCount(savedProgress.answeredIds.length);
    }
    
    // Get initial question excluding already answered ones, respecting filter
    const excludeIds = savedProgress.answeredIds.length >= activeQuestionCount 
      ? [] 
      : savedProgress.answeredIds;
    const firstQuestion = getRandomQuestionFromAll(excludeIds, difficultyFilter);
    setCurrentQuestion(firstQuestion);
  }, [progressLoaded, filterLoaded, activeQuestionCount, getCategoryProgress, difficultyFilter]);

  // Check for completion
  useEffect(() => {
    if (hasShownCelebration) return;
    
    if (answeredCount >= activeQuestionCount && answeredCount > 0) {
      playSuccess();
      setShowCelebration(true);
      setHasShownCelebration(true);
    }
  }, [answeredCount, activeQuestionCount, hasShownCelebration, playSuccess]);

  const handleFlip = useCallback(() => {
    playFlip();
    setIsFlipped((prev) => !prev);
  }, [playFlip]);

  const handleTimerTick = useCallback((secondsLeft: number) => {
    if (timerSettings.soundEnabled && secondsLeft <= 5) {
      playTick();
    }
    if (timerSettings.vibrationEnabled && navigator.vibrate && secondsLeft <= 3) {
      navigator.vibrate(50);
    }
  }, [timerSettings.soundEnabled, timerSettings.vibrationEnabled, playTick]);

  const handleNextQuestion = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    playTap();

    if (currentQuestion) {
      markAnswered(SHUFFLE_ALL_ID, currentQuestion.id);
    }

    if (isFlipped) {
      setIsFlipped(false);
    }

    setTimeout(() => {
      const newAskedIds = currentQuestion
        ? [...askedQuestionIds, currentQuestion.id]
        : askedQuestionIds;

      const isComplete = newAskedIds.length >= activeQuestionCount;
      if (isComplete && newAskedIds.length > 0) {
        triggerConfetti();
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }

      const idsToExclude = isComplete ? [] : newAskedIds;
      const nextQuestion = getRandomQuestionFromAll(idsToExclude, difficultyFilter);

      if (nextQuestion) {
        setAskedQuestionIds(
          idsToExclude.length === 0 ? [nextQuestion.id] : [...idsToExclude]
        );
        setCurrentQuestion(nextQuestion);
        setAnsweredCount((prev) => prev + 1);
        setTimerKey((prev) => prev + 1);
      }

      setIsTransitioning(false);
    }, isFlipped ? 400 : 100);
  }, [
    currentQuestion,
    askedQuestionIds,
    isFlipped,
    isTransitioning,
    activeQuestionCount,
    markAnswered,
    playTap,
    triggerConfetti,
    difficultyFilter,
  ]);

  const handleTimerTimeout = useCallback(() => {
    if (timerSettings.soundEnabled) {
      playTimeout();
    }
    if (timerSettings.vibrationEnabled && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
    handleNextQuestion();
  }, [timerSettings.soundEnabled, timerSettings.vibrationEnabled, playTimeout, handleNextQuestion]);

  const handleResetProgress = useCallback(() => {
    resetCategory(SHUFFLE_ALL_ID);
    setAskedQuestionIds([]);
    setAnsweredCount(0);
    setHasShownCelebration(false);
    const firstQuestion = getRandomQuestionFromAll([], difficultyFilter);
    setCurrentQuestion(firstQuestion);
    setIsFlipped(false);
  }, [resetCategory, difficultyFilter]);

  const handleDismissCelebration = useCallback(() => {
    setShowCelebration(false);
  }, []);

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

  // Show loading state
  if (!progressLoaded || !favoritesLoaded || !timerLoaded || !filterLoaded) {
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center px-6"
        role="status"
        aria-live="polite"
        aria-label="Indlæser spørgsmål"
      >
        <FloatingParticles count={10} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <QuestionCardSkeleton color="from-indigo-500 via-purple-500 to-pink-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-white/80 text-sm"
        >
          Blander alle spørgsmål...
        </motion.div>
        <span className="sr-only">Indlæser...</span>
      </div>
    );
  }

  const progress = Math.min((answeredCount / activeQuestionCount) * 100, 100);

  return (
    <>
      <Confetti isActive={confettiActive} />
      
      <CelebrationOverlay
        isVisible={showCelebration}
        message="🎉 Alle spørgsmål besvaret!"
        subMessage={`Du har gennemgået alle ${activeQuestionCount} ${difficultyFilter !== "alle" ? `${difficultyFilter} ` : ""}spørgsmål fra alle kategorier!`}
        onDismiss={handleDismissCelebration}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true" role="presentation">
          <FloatingParticles count={15} opacity={0.08} />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <motion.div
            className="absolute top-1/3 right-1/4 w-60 h-60 bg-yellow-400/10 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
        </div>

        <main id="main-content" className="relative flex min-h-screen flex-col items-center px-6 py-8" role="main">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md flex items-center justify-between mb-8"
          >
            <Link
              href="/spil"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors focus:ring-2 focus:ring-white/50 rounded-lg px-2 py-1"
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
              <span className="hidden sm:inline">Kategorier</span>
            </Link>

            <div className="flex items-center gap-3">
              <motion.span 
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                aria-hidden="true"
              >
                🎲
              </motion.span>
              <h1 className="text-white font-semibold">Shuffle All</h1>
            </div>

            <nav className="flex items-center gap-2" aria-label="Hurtighandlinger">
              <DifficultyFilter
                filter={difficultyFilter}
                onFilterChange={setDifficultyFilter}
                questionCount={filteredQuestionCount}
                totalCount={totalQuestions}
              />
              <TimerSettingsPanel
                isEnabled={timerSettings.enabled}
                duration={timerSettings.duration}
                soundEnabled={timerSettings.soundEnabled}
                vibrationEnabled={timerSettings.vibrationEnabled}
                onToggle={toggleTimer}
                onDurationChange={setTimerDuration}
                onSoundToggle={toggleTimerSound}
                onVibrationToggle={toggleTimerVibration}
              />
              <ThemeToggle className="text-white" />
              <Link
                href="/favoritter"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/90 hover:text-white transition-colors focus:ring-2 focus:ring-white/50"
                aria-label="Se dine gemte favoritter"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </Link>
            </nav>
          </motion.header>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="w-full max-w-md mb-8"
            role="region"
            aria-label="Fremskridt"
          >
            {/* Active filter indicator */}
            {difficultyFilter !== "alle" && (
              <div className="flex justify-center mb-2">
                <DifficultyFilterIndicator 
                  filter={difficultyFilter} 
                  questionCount={filteredQuestionCount} 
                />
              </div>
            )}
            
            <div 
              className="h-2 bg-white/20 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={answeredCount}
              aria-valuemin={0}
              aria-valuemax={activeQuestionCount}
              aria-label={`${answeredCount} af ${activeQuestionCount} spørgsmål besvaret`}
            >
              <motion.div
                className="h-full bg-white/80 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-2 text-white/80 text-xs">
              <button
                type="button"
                onClick={handleResetProgress}
                className="hover:text-white transition-colors underline focus:ring-2 focus:ring-white/50 rounded px-1"
                aria-label="Nulstil fremskridt"
              >
                Nulstil
              </button>
              <span aria-live="polite">
                {answeredCount} / {activeQuestionCount} spørgsmål
                {difficultyFilter !== "alle" ? ` (${difficultyFilter})` : " (alle kategorier)"}
              </span>
            </div>
          </motion.div>

          {/* Timer Display */}
          {timerSettings.enabled && currentQuestion && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <TimerDisplay
                key={timerKey}
                duration={timerSettings.duration}
                isActive={timerSettings.enabled && !isTransitioning}
                onTimeout={handleTimerTimeout}
                onTick={handleTimerTick}
                isPaused={!isFlipped}
              />
              {!isFlipped && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/70 text-xs text-center mt-2"
                >
                  Vend kortet for at starte timeren
                </motion.p>
              )}
            </motion.div>
          )}

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
              type="button"
              onClick={handleNextQuestion}
              disabled={isTransitioning}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group w-full px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 focus:ring-4 focus:ring-white/50 overflow-hidden relative"
              aria-label="Gå til næste spørgsmål"
              aria-busy={isTransitioning}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                aria-hidden="true"
              />
              <span className="relative">Næste spørgsmål</span>
              <motion.svg
                className="w-5 h-5 relative"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
                animate={isTransitioning ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 0.3, repeat: isTransitioning ? Infinity : 0 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </motion.button>

            <p className="text-center text-white/80 text-sm mt-4">
              Spørgsmål fra alle kategorier blandet sammen
            </p>
          </motion.div>
        </main>
      </div>
    </>
  );
}
