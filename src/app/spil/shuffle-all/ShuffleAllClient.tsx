"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback, useEffect, useRef } from "react";
import { getCategory, getRandomQuestionFromAllWithCustom, getTotalQuestionCountWithCustom } from "@/data/categories";
import { useCustomQuestions } from "@/hooks/useCustomQuestions";
import type { Question } from "@/types";
import { useFavorites, useProgress, useTimerSettings, useDifficultyFilter } from "@/hooks/useLocalStorage";
import { useSound } from "@/hooks/useSound";
import { useStreak } from "@/hooks/useStreak";
import { Confetti, useConfetti, CelebrationOverlay } from "@/components/Confetti";
import { TimerDisplay, TimerSettingsPanel } from "@/components/TimerDisplay";
import { DifficultyFilter, DifficultyFilterIndicator } from "@/components/DifficultyFilter";
import { QuestionCard } from "@/components/QuestionCard";
import { PlayScreen, PlayScreenLoading, dealMotion } from "@/components/PlayScreen";
import { TIMING } from "@/constants";
import { track } from "@/utils/track";

const SHUFFLE_ALL_ID = "shuffle-all";

/** Display name of the deck a card comes from; custom questions belong to "Dine egne". */
function categoryNameFor(question: Question): string {
  return getCategory(question.categoryId)?.name ?? "Dine egne";
}

/** Custom questions are stored with categoryId "custom"; on the table they use the "egne" deck. */
function asDisplayed(question: Question): Question {
  return question.categoryId === "custom" ? { ...question, categoryId: "egne" } : question;
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
  const { recordActivity } = useStreak();
  const { questionsForGame: customQuestions, isLoaded: customLoaded } = useCustomQuestions();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebration, setHasShownCelebration] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const totalQuestions = getTotalQuestionCountWithCustom(customQuestions);
  const filteredQuestionCount = getTotalQuestionCountWithCustom(customQuestions, difficultyFilter);
  const activeQuestionCount = filteredQuestionCount > 0 ? filteredQuestionCount : totalQuestions;

  // Track if initial load has been done
  const hasInitializedRef = useRef(false);

  // Initialize from saved progress - only run once per mount
  useEffect(() => {
    if (!progressLoaded || !filterLoaded || !customLoaded) return;
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    const savedProgress = getCategoryProgress(SHUFFLE_ALL_ID);
    
    // Use requestAnimationFrame to defer state updates
    requestAnimationFrame(() => {
      if (savedProgress.answeredIds.length > 0) {
        setAskedQuestionIds(savedProgress.answeredIds);
        setAnsweredCount(savedProgress.answeredIds.length);
      }
      
      // Get initial question excluding already answered ones, respecting filter
      const excludeIds = savedProgress.answeredIds.length >= activeQuestionCount 
        ? [] 
        : savedProgress.answeredIds;
      const firstQuestion = getRandomQuestionFromAllWithCustom(customQuestions, excludeIds, difficultyFilter);
      setCurrentQuestion(firstQuestion);
    });
  }, [progressLoaded, filterLoaded, customLoaded, activeQuestionCount, getCategoryProgress, difficultyFilter, customQuestions]);

  // Check for completion - use callback pattern to avoid setState in effect
  const checkCompletion = useCallback(() => {
    if (hasShownCelebration) return;
    
    if (answeredCount >= activeQuestionCount && answeredCount > 0) {
      playSuccess();
      setShowCelebration(true);
      setHasShownCelebration(true);
    }
  }, [answeredCount, activeQuestionCount, hasShownCelebration, playSuccess]);

  // Trigger completion check with requestAnimationFrame to avoid cascading renders
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      checkCompletion();
    });
    return () => cancelAnimationFrame(frameId);
  }, [checkCompletion]);

  const hasTrackedStartRef = useRef(false);
  const handleFlip = useCallback(() => {
    playFlip();
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      track("Spil startet", { kategori: "blandet" });
    }
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
      recordActivity();
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
        setTimeout(() => setShowCelebration(false), TIMING.CELEBRATION_SHORT);
      }

      const idsToExclude = isComplete ? [] : newAskedIds;
      const nextQuestion = getRandomQuestionFromAllWithCustom(customQuestions, idsToExclude, difficultyFilter);

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
    customQuestions,
    recordActivity,
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
    const firstQuestion = getRandomQuestionFromAllWithCustom(customQuestions, [], difficultyFilter);
    setCurrentQuestion(firstQuestion);
    setIsFlipped(false);
  }, [resetCategory, difficultyFilter, customQuestions]);

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

  if (!progressLoaded || !favoritesLoaded || !timerLoaded || !filterLoaded) {
    return <PlayScreenLoading />;
  }

  const depthWord = difficultyFilter === "let" ? "lette " : difficultyFilter === "dyb" ? "dybe " : difficultyFilter === "medium" ? "medium-" : "";

  return (
    <>
      <Confetti isActive={confettiActive} />
      <CelebrationOverlay
        isVisible={showCelebration}
        message="Hele bunken er spillet"
        subMessage={`I har været alle ${activeQuestionCount} ${depthWord}kort igennem. Bunken bliver blandet igen.`}
        onDismiss={handleDismissCelebration}
      />

      <PlayScreen
        deckId="blandet"
        title="Bland alle"
        actions={
          <>
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
          </>
        }
        answered={answeredCount}
        total={activeQuestionCount}
        onReset={handleResetProgress}
        aboveProgress={
          difficultyFilter !== "alle" && (
            <div className="mb-2 flex justify-center">
              <DifficultyFilterIndicator filter={difficultyFilter} questionCount={filteredQuestionCount} />
            </div>
          )
        }
        beforeCard={
          timerSettings.enabled &&
          currentQuestion && (
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
          )
        }
        onNext={handleNextQuestion}
        isTransitioning={isTransitioning}
        hint="Kortene kommer fra alle bunker, også dine egne"
      >
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div key={currentQuestion.id} {...dealMotion} className="w-full">
              <QuestionCard
                question={asDisplayed(currentQuestion)}
                categoryName={categoryNameFor(currentQuestion)}
                isFlipped={isFlipped}
                onFlip={handleFlip}
                isFavorite={isFavorite(currentQuestion.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </PlayScreen>
    </>
  );
}
