"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { adultQuestions, ADULT_CATEGORY_ID } from "@/data/questions/voksne";
import type { Question } from "@/types";
import { useFavorites, useProgress, useDifficultyFilter } from "@/hooks/useLocalStorage";
import { useSound } from "@/hooks/useSound";
import { AgeVerificationModal, useAdultContentVerification } from "@/components/AgeVerificationModal";
import { Confetti, useConfetti, CelebrationOverlay } from "@/components/Confetti";
import { QuestionCard } from "@/components/QuestionCard";
import { PlayScreen, PlayScreenLoading, dealMotion } from "@/components/PlayScreen";
import { TIMING } from "@/constants";
import { track } from "@/utils/track";

// Seeded random for deterministic shuffle
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRandomQuestion(
  excludeIds: string[] = [],
  difficultyFilter: "alle" | "let" | "medium" | "dyb" = "alle"
): Question | null {
  let questions = adultQuestions;

  if (difficultyFilter !== "alle") {
    questions = questions.filter((q) => q.depth === difficultyFilter);
  }

  const available = questions.filter((q) => !excludeIds.includes(q.id));
  if (available.length === 0) return null;

  const seed = 42 + excludeIds.length;
  const index = Math.floor(seededRandom(seed) * available.length);
  return available[index];
}

export default function AdultPlayClient() {
  const router = useRouter();
  const { isVerified } = useAdultContentVerification();
  const { isFavorite, toggleFavorite, isLoaded: favoritesLoaded } = useFavorites();
  const { getCategoryProgress, markAnswered, resetCategory, isLoaded: progressLoaded } = useProgress();
  const { filter: difficultyFilter } = useDifficultyFilter();
  const { playFlip, playSuccess, playTap } = useSound();
  const { isActive: confettiActive, trigger: triggerConfetti } = useConfetti();

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isVerifiedState, setIsVerifiedState] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebration, setHasShownCelebration] = useState(false);

  const hasInitializedRef = useRef(false);

  // Check verification on mount - defer state updates
  useEffect(() => {
    requestAnimationFrame(() => {
      const verified = isVerified();
      if (verified) {
        setIsVerifiedState(true);
      } else {
        setShowVerificationModal(true);
      }
    });
  }, [isVerified]);

  // Initialize from saved progress
  useEffect(() => {
    if (!progressLoaded || !isVerifiedState) return;
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const savedProgress = getCategoryProgress(ADULT_CATEGORY_ID);

    requestAnimationFrame(() => {
      if (savedProgress.answeredIds.length > 0) {
        setAskedQuestionIds(savedProgress.answeredIds);
        setAnsweredCount(savedProgress.answeredIds.length);
      }

      const excludeIds =
        savedProgress.answeredIds.length >= adultQuestions.length
          ? []
          : savedProgress.answeredIds;
      const firstQuestion = getRandomQuestion(excludeIds, difficultyFilter);
      setCurrentQuestion(firstQuestion);
    });
  }, [progressLoaded, isVerifiedState, getCategoryProgress, difficultyFilter]);

  // Check for completion
  const totalQuestions = adultQuestions.length;
  const filteredCount =
    difficultyFilter === "alle"
      ? totalQuestions
      : adultQuestions.filter((q) => q.depth === difficultyFilter).length;
  const activeQuestionCount = filteredCount > 0 ? filteredCount : totalQuestions;

  useEffect(() => {
    if (hasShownCelebration) return;

    if (answeredCount >= activeQuestionCount && answeredCount > 0) {
      requestAnimationFrame(() => {
        playSuccess();
        triggerConfetti();
        setShowCelebration(true);
        setHasShownCelebration(true);
      });
    }
  }, [answeredCount, activeQuestionCount, hasShownCelebration, playSuccess, triggerConfetti]);

  const handleVerify = useCallback(() => {
    setShowVerificationModal(false);
    setIsVerifiedState(true);
  }, []);

  const handleCancel = useCallback(() => {
    router.push("/spil/");
  }, [router]);

  const hasTrackedStartRef = useRef(false);
  const handleFlip = useCallback(() => {
    playFlip();
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      track("Spil startet", { kategori: ADULT_CATEGORY_ID });
    }
    setIsFlipped((prev) => !prev);
  }, [playFlip]);

  const handleNextQuestion = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    playTap();

    if (currentQuestion) {
      markAnswered(ADULT_CATEGORY_ID, currentQuestion.id);
    }

    if (isFlipped) {
      setIsFlipped(false);
    }

    setTimeout(
      () => {
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
        const nextQuestion = getRandomQuestion(idsToExclude, difficultyFilter);

        if (nextQuestion) {
          setAskedQuestionIds(
            idsToExclude.length === 0 ? [nextQuestion.id] : [...idsToExclude]
          );
          setCurrentQuestion(nextQuestion);
          setAnsweredCount((prev) => prev + 1);
        }

        setIsTransitioning(false);
      },
      isFlipped ? 400 : 100
    );
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

  const handleResetProgress = useCallback(() => {
    resetCategory(ADULT_CATEGORY_ID);
    setAskedQuestionIds([]);
    setAnsweredCount(0);
    setHasShownCelebration(false);
    const firstQuestion = getRandomQuestion([], difficultyFilter);
    setCurrentQuestion(firstQuestion);
    setIsFlipped(false);
  }, [resetCategory, difficultyFilter]);

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

  if (!isVerifiedState) {
    return (
      <div className="filt min-h-dvh">
        <AgeVerificationModal isOpen={showVerificationModal} onVerify={handleVerify} onCancel={handleCancel} />
      </div>
    );
  }

  if (!progressLoaded || !favoritesLoaded) {
    return <PlayScreenLoading />;
  }

  return (
    <>
      <Confetti isActive={confettiActive} />
      <CelebrationOverlay
        isVisible={showCelebration}
        message="Hele bunken er spillet"
        subMessage={`I har været alle ${activeQuestionCount} kort igennem. Bunken bliver blandet igen.`}
        onDismiss={() => setShowCelebration(false)}
      />

      <PlayScreen
        deckId={ADULT_CATEGORY_ID}
        title="Kun for voksne"
        actions={
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold text-white">18+</span>
        }
        answered={answeredCount}
        total={activeQuestionCount}
        onReset={handleResetProgress}
        onNext={handleNextQuestion}
        isTransitioning={isTransitioning}
      >
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div key={currentQuestion.id} {...dealMotion} className="w-full">
              <QuestionCard
                question={currentQuestion}
                categoryName="Kun for voksne"
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
