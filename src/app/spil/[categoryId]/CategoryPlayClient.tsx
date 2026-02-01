"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCategory, getRandomQuestion, getCategoryQuestionCount } from "@/data/categories";
import { notFound } from "next/navigation";
import type { Question } from "@/types";
import { useFavorites, useProgress, useTimerSettings, useDifficultyFilter, useQuestionHistory } from "@/hooks/useLocalStorage";
import { useSound } from "@/hooks/useSound";
import { useStreak } from "@/hooks/useStreak";
import { useKeyboardShortcuts, KeyboardShortcutHints } from "@/hooks/useKeyboardShortcuts";
import { ShareButton } from "@/components/ShareButton";
import { StreakCelebration } from "@/components/StreakDisplay";
import { AchievementToast } from "@/components/AchievementToast";
import { useAchievements } from "@/hooks/useAchievements";
import { Confetti, CelebrationBurst, useConfetti, CelebrationOverlay } from "@/components/Confetti";
import { QuestionCardSkeleton } from "@/components/SkeletonLoader";
import { FloatingParticles } from "@/components/FloatingParticles";
import { TimerDisplay } from "@/components/TimerDisplay";
import { DifficultyFilterIndicator } from "@/components/DifficultyFilter";
import { BadgeCelebrationWithConfetti } from "@/components/BadgeCelebration";
import { GameHeader } from "@/components/GameHeader";
import { DepthIndicator } from "@/components/DepthBadge";

interface Props {
  categoryId: string;
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
      className="min-w-[44px] min-h-[44px] p-2.5 sm:p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-rose-400 touch-manipulation flex items-center justify-center"
      aria-label={isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"}
      aria-pressed={isFavorite}
    >
      <motion.svg
        className="w-6 h-6 sm:w-6 sm:h-6"
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
    <div className="perspective-1000 w-full max-w-[320px] sm:max-w-sm mx-auto px-2 sm:px-0">
      <motion.div
        className="relative w-full h-[320px] xs:h-[360px] sm:h-[400px] lg:h-[440px] cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/50 rounded-3xl touch-manipulation"
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
          <div className="w-full h-full bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-white/20 flex flex-col items-center justify-center p-6 sm:p-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl sm:text-7xl mb-4 sm:mb-6"
              aria-hidden="true"
            >
              🎴
            </motion.div>
            <p className="text-white text-lg sm:text-xl font-medium text-center">
              Tryk for at se spørgsmålet
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
          <div className="w-full h-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-5 sm:p-8 relative">
            {/* Top bar with depth, share and favorite */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-center">
              <DepthIndicator depth={question.depth} />
              <div className="flex items-center gap-0.5 sm:gap-1">
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
              className="text-slate-800 dark:text-slate-100 text-xl sm:text-2xl font-medium text-center leading-relaxed px-2"
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuestionId = searchParams.get("question") ?? undefined;
  
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
  const { addToHistory } = useQuestionHistory();
  const { isActive: confettiActive, trigger: triggerConfetti } = useConfetti();
  const { pendingAchievement, dismissPendingAchievement } = useAchievements();
  const { recordActivity, currentStreak, isAtRisk } = useStreak();
  
  // Calculate filtered question count
  const filteredQuestionCount = category ? getCategoryQuestionCount(categoryId, difficultyFilter) : 0;
  const totalQuestionCount = category ? category.questions.length : 0;

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebration, setHasShownCelebration] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // Used to reset timer on new question

  // Initialize from saved progress or initial question ID
  useEffect(() => {
    if (!progressLoaded || !filterLoaded || !category) return;
    
    const savedProgress = getCategoryProgress(categoryId);
    if (savedProgress.answeredIds.length > 0) {
      setAskedQuestionIds(savedProgress.answeredIds);
      setAnsweredCount(savedProgress.answeredIds.length);
    }
    
    // Check if we have an initial question ID from URL (e.g., from recommendations)
    if (initialQuestionId) {
      const specificQuestion = category.questions.find(q => q.id === initialQuestionId);
      if (specificQuestion) {
        setCurrentQuestion(specificQuestion);
        setIsFlipped(true); // Auto-flip to show the question
        return;
      }
    }
    
    // Get initial question excluding already answered ones, respecting filter
    const excludeIds = savedProgress.answeredIds.length >= filteredQuestionCount 
      ? [] 
      : savedProgress.answeredIds;
    const firstQuestion = getRandomQuestion(categoryId, excludeIds, difficultyFilter);
    setCurrentQuestion(firstQuestion);
  }, [progressLoaded, filterLoaded, category, categoryId, getCategoryProgress, difficultyFilter, filteredQuestionCount, initialQuestionId]);

  // Check for category completion
  useEffect(() => {
    if (!category || hasShownCelebration) return;
    
    const totalQuestions = category.questions.length;
    // Show celebration when they've answered all questions
    if (answeredCount >= totalQuestions && answeredCount > 0) {
      playSuccess();
      setShowCelebration(true);
      setHasShownCelebration(true);
    }
  }, [answeredCount, category, hasShownCelebration, playSuccess]);

  const handleFlip = useCallback(() => {
    playFlip();
    setIsFlipped((prev) => !prev);
  }, [playFlip]);

  // Handle timer tick for last 5 seconds
  const handleTimerTick = useCallback((secondsLeft: number) => {
    if (timerSettings.soundEnabled && secondsLeft <= 5) {
      playTick();
    }
    if (timerSettings.vibrationEnabled && navigator.vibrate && secondsLeft <= 3) {
      navigator.vibrate(50);
    }
  }, [timerSettings.soundEnabled, timerSettings.vibrationEnabled, playTick]);

  const handleNextQuestion = useCallback(() => {
    if (!category || isTransitioning) return;

    setIsTransitioning(true);
    playTap();

    // Mark current question as answered and add to history
    if (currentQuestion) {
      markAnswered(categoryId, currentQuestion.id);
      addToHistory({
        id: currentQuestion.id,
        categoryId: currentQuestion.categoryId,
        text: currentQuestion.text,
        depth: currentQuestion.depth,
      });
      // Record streak activity
      recordActivity();
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

      // Check if all filtered questions have been answered - trigger celebration!
      const isComplete = newAskedIds.length >= filteredQuestionCount;
      if (isComplete && newAskedIds.length > 0) {
        triggerConfetti();
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }

      // Reset if all questions have been asked
      const idsToExclude = isComplete ? [] : newAskedIds;

      const nextQuestion = getRandomQuestion(categoryId, idsToExclude, difficultyFilter);

      if (nextQuestion) {
        setAskedQuestionIds(
          idsToExclude.length === 0 ? [nextQuestion.id] : [...idsToExclude]
        );
        setCurrentQuestion(nextQuestion);
        setAnsweredCount((prev) => prev + 1);
        // Reset timer for new question
        setTimerKey((prev) => prev + 1);
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
    addToHistory,
    playTap,
    triggerConfetti,
    difficultyFilter,
    filteredQuestionCount,
  ]);

  // Handle timer timeout - auto skip to next question
  const handleTimerTimeout = useCallback(() => {
    if (timerSettings.soundEnabled) {
      playTimeout();
    }
    if (timerSettings.vibrationEnabled && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]); // Vibration pattern
    }
    // Auto-skip to next question
    handleNextQuestion();
  }, [timerSettings.soundEnabled, timerSettings.vibrationEnabled, playTimeout, handleNextQuestion]);

  const handleResetProgress = useCallback(() => {
    resetCategory(categoryId);
    setAskedQuestionIds([]);
    setAnsweredCount(0);
    setHasShownCelebration(false);
    const firstQuestion = getRandomQuestion(categoryId, [], difficultyFilter);
    setCurrentQuestion(firstQuestion);
    setIsFlipped(false);
  }, [categoryId, resetCategory, difficultyFilter]);

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

  // Handle going back to category list
  const handleBack = useCallback(() => {
    router.push("/spil");
  }, [router]);

  // Keyboard shortcuts for better navigation
  useKeyboardShortcuts({
    onFlip: handleFlip,
    onNext: handleNextQuestion,
    onToggleFavorite: handleToggleFavorite,
    onBack: handleBack,
    enabled: !isTransitioning,
  });

  if (!category) {
    notFound();
  }

  // Show loading state while localStorage loads
  if (!progressLoaded || !favoritesLoaded || !timerLoaded || !filterLoaded) {
    return (
      <div 
        className={`min-h-screen bg-gradient-to-br ${category.color} flex flex-col items-center justify-center px-6`}
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
          <QuestionCardSkeleton color={category.color} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-white/80 text-sm"
        >
          Forbereder dine spørgsmål...
        </motion.div>
        <span className="sr-only">Indlæser...</span>
      </div>
    );
  }

  const activeQuestionCount = filteredQuestionCount > 0 ? filteredQuestionCount : totalQuestionCount;
  const progress = Math.min((answeredCount / activeQuestionCount) * 100, 100);

  return (
    <>
      {/* Confetti celebration */}
      <Confetti isActive={confettiActive} />
      
      {/* Achievement toast */}
      <AchievementToast 
        achievement={pendingAchievement}
        onDismiss={dismissPendingAchievement}
      />
      
      {/* Streak celebration */}
      <StreakCelebration />
      
      {/* Badge unlock celebration with confetti */}
      <BadgeCelebrationWithConfetti />
      
      {/* Celebration overlay */}
      <CelebrationOverlay
        isVisible={showCelebration}
        message="🎉 Kategori fuldført!"
        subMessage={`Du har besvaret alle ${activeQuestionCount} ${difficultyFilter !== "alle" ? `${difficultyFilter} ` : ""}spørgsmål i ${category.name}!`}
        onDismiss={handleDismissCelebration}
      />
      
      <div
        className={`min-h-screen bg-gradient-to-br ${category.color} relative overflow-hidden`}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true" role="presentation">
          <FloatingParticles count={12} opacity={0.08} />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          />
        </div>

      <main id="main-content" className="relative flex min-h-screen flex-col items-center px-4 sm:px-6 py-6 sm:py-8" role="main">
        {/* Mobile-optimized header with overflow menu */}
        <GameHeader
          category={category}
          currentStreak={currentStreak}
          difficultyFilter={difficultyFilter}
          onFilterChange={setDifficultyFilter}
          filteredQuestionCount={filteredQuestionCount}
          totalQuestionCount={totalQuestionCount}
          timerEnabled={timerSettings.enabled}
          timerDuration={timerSettings.duration}
          timerSoundEnabled={timerSettings.soundEnabled}
          timerVibrationEnabled={timerSettings.vibrationEnabled}
          onTimerToggle={toggleTimer}
          onTimerDurationChange={setTimerDuration}
          onTimerSoundToggle={toggleTimerSound}
          onTimerVibrationToggle={toggleTimerVibration}
        />

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
              aria-label="Nulstil fremskridt for denne kategori"
            >
              Nulstil
            </button>
            <span aria-live="polite">
              {answeredCount} / {activeQuestionCount} spørgsmål
              {difficultyFilter !== "alle" && ` (${difficultyFilter})`}
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
              isPaused={!isFlipped} // Pause timer until card is flipped
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
          className="mt-6 sm:mt-8 w-full max-w-sm px-2 sm:px-0"
        >
          <motion.button
            type="button"
            onClick={handleNextQuestion}
            disabled={isTransitioning}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group w-full min-h-[56px] sm:min-h-[52px] px-6 sm:px-8 py-4 sm:py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-2xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 focus:ring-4 focus:ring-white/50 overflow-hidden relative touch-manipulation select-none active:scale-95"
            aria-label="Gå til næste spørgsmål"
            aria-busy={isTransitioning}
          >
            {/* Shine effect */}
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

          {/* Mobile hint */}
          <p className="text-center text-white/80 text-sm mt-4 sm:hidden">
            Tryk på kortet for at vende det <span aria-hidden="true">•</span> <span aria-hidden="true">❤️</span> for at gemme
          </p>
          
          {/* Desktop keyboard shortcuts hint */}
          <div className="hidden sm:block mt-4">
            <KeyboardShortcutHints className="text-white/70" />
          </div>
        </motion.div>
      </main>
      </div>
    </>
  );
}
