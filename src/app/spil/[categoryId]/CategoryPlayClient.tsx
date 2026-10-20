"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCategory, getRandomQuestion, getCategoryQuestionCount } from "@/data/categories";
import { notFound } from "next/navigation";
import type { Question } from "@/types";
import { useFavorites, useProgress, useTimerSettings, useDifficultyFilter, useQuestionHistory } from "@/hooks/useLocalStorage";
import { useSound } from "@/hooks/useSound";
import { useStreak } from "@/hooks/useStreak";
import { useKeyboardShortcuts, KeyboardShortcutHints } from "@/hooks/useKeyboardShortcuts";
import { Confetti, useConfetti, CelebrationOverlay } from "@/components/Confetti";
import { TimerDisplay } from "@/components/TimerDisplay";
import { DifficultyFilterIndicator } from "@/components/DifficultyFilter";
import { GameHeader } from "@/components/GameHeader";
import { QuestionCard } from "@/components/QuestionCard";
import { TIMING } from "@/constants";
import { getDeck } from "@/data/decks";
import { track } from "@/utils/track";
import { tap } from "@/lib/platform";

interface Props {
  categoryId: string;
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
  const { recordActivity, currentStreak, isAtRisk } = useStreak();
  
  // Calculate filtered question count
  const filteredQuestionCount = category ? getCategoryQuestionCount(categoryId, difficultyFilter) : 0;
  const totalQuestionCount = category ? category.questions.length : 0;

  // Lazy initializer for asked question IDs and answered count
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>(() => {
    if (progressLoaded && category) {
      const savedProgress = getCategoryProgress(categoryId);
      return savedProgress.answeredIds;
    }
    return [];
  });

  const [answeredCount, setAnsweredCount] = useState(() => {
    if (progressLoaded && category) {
      const savedProgress = getCategoryProgress(categoryId);
      return savedProgress.answeredIds.length;
    }
    return 0;
  });

  // Lazy initializer for current question
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(() => {
    if (!progressLoaded || !filterLoaded || !category) return null;
    
    // Check if we have an initial question ID from URL (e.g., from recommendations)
    if (initialQuestionId) {
      const specificQuestion = category.questions.find(q => q.id === initialQuestionId);
      if (specificQuestion) {
        return specificQuestion;
      }
    }
    
    // Get initial question excluding already answered ones, respecting filter
    const savedProgress = getCategoryProgress(categoryId);
    const excludeIds = savedProgress.answeredIds.length >= filteredQuestionCount 
      ? [] 
      : savedProgress.answeredIds;
    return getRandomQuestion(categoryId, excludeIds, difficultyFilter);
  });

  // Lazy initializer for isFlipped - auto-flip if we have an initial question ID
  const [isFlipped, setIsFlipped] = useState(() => {
    return Boolean(initialQuestionId && progressLoaded && filterLoaded && category);
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebration, setHasShownCelebration] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // Used to reset timer on new question

  // Track if initial load has been done
  const hasInitializedRef = useRef(false);

  // Update state when dependencies change - defer state updates to avoid cascading renders
  useEffect(() => {
    if (!progressLoaded || !filterLoaded || !category) return;
    if (hasInitializedRef.current) return;
    
    const savedProgress = getCategoryProgress(categoryId);
    // Claim initialisation now, so a dependency change before the frame cannot schedule a second draw
    hasInitializedRef.current = true;

    // Use requestAnimationFrame to defer state updates
    requestAnimationFrame(() => {
      
      // Only update if state is stale
      if (askedQuestionIds.length === 0 && savedProgress.answeredIds.length > 0) {
        setAskedQuestionIds(savedProgress.answeredIds);
        setAnsweredCount(savedProgress.answeredIds.length);
      }
      
      // Only set initial question if we don't have one yet
      if (!currentQuestion) {
        // Check if we have an initial question ID from URL
        if (initialQuestionId) {
          const specificQuestion = category.questions.find(q => q.id === initialQuestionId);
          if (specificQuestion) {
            setCurrentQuestion(specificQuestion);
            setIsFlipped(true);
            return;
          }
        }
        
        // Get initial question excluding already answered ones, respecting filter
        const excludeIds = savedProgress.answeredIds.length >= filteredQuestionCount 
          ? [] 
          : savedProgress.answeredIds;
        const firstQuestion = getRandomQuestion(categoryId, excludeIds, difficultyFilter);
        setCurrentQuestion(firstQuestion);
      }
    });
  }, [progressLoaded, filterLoaded, category, categoryId, getCategoryProgress, difficultyFilter, filteredQuestionCount, initialQuestionId, askedQuestionIds.length, currentQuestion]);

  // Check for category completion - use callback to avoid setState in effect
  const handleCelebration = useCallback(() => {
    if (!category || hasShownCelebration) return;
    
    const totalQuestions = category.questions.length;
    // Show celebration when they've answered all questions
    if (answeredCount >= totalQuestions && answeredCount > 0) {
      playSuccess();
      setShowCelebration(true);
      setHasShownCelebration(true);
    }
  }, [answeredCount, category, hasShownCelebration, playSuccess]);

  // Trigger celebration check when answered count changes - defer with requestAnimationFrame
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      handleCelebration();
    });
    return () => cancelAnimationFrame(frameId);
  }, [handleCelebration]);

  const hasTrackedStartRef = useRef(false);
  const handleFlip = useCallback(() => {
    playFlip();
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      track("Spil startet", { kategori: categoryId });
    }
    setIsFlipped((prev) => !prev);
  }, [playFlip, categoryId]);

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
        track("Spil gennemført", { kategori: categoryId, dybde: difficultyFilter });
        triggerConfetti();
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), TIMING.CELEBRATION_SHORT);
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
    recordActivity,
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
    if (!isFavorite(currentQuestion.id)) {
      track("Favorit gemt", { kategori: currentQuestion.categoryId, dybde: currentQuestion.depth });
    }
    toggleFavorite({
      id: currentQuestion.id,
      categoryId: currentQuestion.categoryId,
      text: currentQuestion.text,
      depth: currentQuestion.depth,
    });
  }, [currentQuestion, toggleFavorite, playSuccess, isFavorite]);

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

  const deck = getDeck(category.id);

  // Show the empty table while localStorage loads
  if (!progressLoaded || !favoritesLoaded || !timerLoaded || !filterLoaded) {
    return (
      <div className="filt flex min-h-dvh items-center justify-center px-6" role="status" aria-live="polite">
        <div className="aspect-[5/7] w-full max-w-sm animate-pulse rounded-[1.25rem] bg-white/10" />
        <span className="sr-only">Blander kortene</span>
      </div>
    );
  }

  const activeQuestionCount = filteredQuestionCount > 0 ? filteredQuestionCount : totalQuestionCount;
  const progress = Math.min((answeredCount / activeQuestionCount) * 100, 100);

  return (
    <>
      <Confetti isActive={confettiActive} />

      <CelebrationOverlay
        isVisible={showCelebration}
        message="Hele bunken er spillet"
        subMessage={`I har været alle ${activeQuestionCount} ${difficultyFilter === "let" ? "lette " : difficultyFilter === "dyb" ? "dybe " : difficultyFilter === "medium" ? "medium-" : ""}kort i ${category.name} igennem. Bunken bliver blandet igen.`}
        onDismiss={handleDismissCelebration}
      />

      <div className="filt min-h-dvh">
        <main id="main-content" className="mx-auto flex min-h-dvh max-w-xl flex-col items-center px-4 pb-safe pt-safe sm:px-6">
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

          {/* How far into the pile */}
          <div className="w-full max-w-[23rem]" role="region" aria-label="Fremskridt">
            {difficultyFilter !== "alle" && (
              <div className="mb-2 flex justify-center">
                <DifficultyFilterIndicator filter={difficultyFilter} questionCount={filteredQuestionCount} />
              </div>
            )}
            <div
              className="h-1.5 overflow-hidden rounded-full bg-white/15"
              role="progressbar"
              aria-valuenow={answeredCount}
              aria-valuemin={0}
              aria-valuemax={activeQuestionCount}
              aria-label={`${answeredCount} af ${activeQuestionCount} kort spillet`}
            >
              <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${progress}%`, background: deck.bg === "#1d4a38" ? "#f4c04e" : deck.bg }} />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-white/75">
              <span aria-live="polite" className="tabular-nums">
                {Math.min(answeredCount, activeQuestionCount).toLocaleString("da-DK")} af {activeQuestionCount.toLocaleString("da-DK")} kort
              </span>
              <button
                type="button"
                onClick={handleResetProgress}
                className="min-h-11 rounded px-2 underline decoration-white/40 underline-offset-4 hover:text-white"
              >
                Bland forfra
              </button>
            </div>
          </div>

          {timerSettings.enabled && currentQuestion && (
            <div className="mt-2">
              <TimerDisplay
                key={timerKey}
                duration={timerSettings.duration}
                isActive={timerSettings.enabled && !isTransitioning}
                onTimeout={handleTimerTimeout}
                onTick={handleTimerTick}
                isPaused={!isFlipped}
              />
              {!isFlipped && <p className="mt-2 text-center text-xs text-white/70">Uret starter, når kortet er vendt</p>}
            </div>
          )}

          {/* The card */}
          <div className="flex w-full flex-1 items-center justify-center py-6">
            <AnimatePresence mode="wait">
              {currentQuestion && (
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 70, rotate: 6 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: -90, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
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

          <div className="w-full max-w-[23rem] pb-6">
            <button
              type="button"
              onClick={() => {
                tap("fast");
                handleNextQuestion();
              }}
              disabled={isTransitioning}
              className="min-h-14 w-full touch-manipulation select-none rounded-full bg-kridt px-6 text-lg font-bold text-kridt-blaek shadow-[0_3px_0_rgb(0_0_0/0.3)] transition-transform active:translate-y-0.5 disabled:opacity-60"
              aria-busy={isTransitioning}
            >
              Næste kort
            </button>
            <p className="mt-3 text-center text-sm text-white/70 sm:hidden">Tryk på kortet for at vende det</p>
            <div className="mt-3 hidden sm:block">
              <KeyboardShortcutHints className="text-white/70" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
