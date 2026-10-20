"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useCustomQuestions } from "@/hooks/useCustomQuestions";
import type { CustomQuestion } from "@/hooks/useCustomQuestions";
import { useFavorites, useProgress, useDifficultyFilter } from "@/hooks/useLocalStorage";
import { useSound } from "@/hooks/useSound";
import { Confetti, useConfetti, CelebrationOverlay } from "@/components/Confetti";
import { QuestionCard } from "@/components/QuestionCard";
import { PlayScreen, PlayScreenLoading, dealMotion } from "@/components/PlayScreen";

// Seeded random for deterministic shuffle
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Pure shuffle function
function shuffleWithSeed(questions: CustomQuestion[], seed: number, initialQuestionId?: string): CustomQuestion[] {
  const shuffled = [...questions];
  
  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // If there's an initial question ID, move it to the front
  if (initialQuestionId) {
    const initialIndex = shuffled.findIndex(q => q.id === initialQuestionId);
    if (initialIndex > 0) {
      const [initialQ] = shuffled.splice(initialIndex, 1);
      shuffled.unshift(initialQ);
    }
  }
  
  return shuffled;
}

const CUSTOM_CATEGORY_ID = "custom";

/** Nothing to play yet: point to where questions are written */
function GameEmptyState() {
  return (
    <div className="filt flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl font-bold">Der er ingen kort i bunken endnu</h1>
      <p className="mt-3 max-w-sm text-white/80">
        Skriv dine egne spørgsmål, så bliver de til kort, I kan spille med.
      </p>
      <Link
        href="/mine-spoergsmaal/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-kridt px-6 font-bold text-kridt-blaek"
      >
        Skriv et spørgsmål
      </Link>
      <Link href="/spil/" className="mt-4 inline-flex min-h-11 items-center font-semibold text-white/85 underline underline-offset-4">
        Tilbage til spillene
      </Link>
    </div>
  );
}

export default function CustomQuestionsClient() {
  const searchParams = useSearchParams();
  const initialQuestionId = searchParams.get("question") ?? undefined;
  
  const { questions, isLoaded: customLoaded } = useCustomQuestions();
  const { isFavorite, toggleFavorite, isLoaded: favoritesLoaded } = useFavorites();
  const { markAnswered, resetCategory, isLoaded: progressLoaded } = useProgress();
  const { filter: difficultyFilter } = useDifficultyFilter();
  const { playFlip, playSuccess, playTap } = useSound();
  const { isActive: confettiActive, trigger: triggerConfetti } = useConfetti();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebration, setHasShownCelebration] = useState(false);

  // Filter questions by difficulty
  const filteredQuestions = useMemo(() => {
    if (difficultyFilter === "alle") return questions;
    return questions.filter(q => q.depth === difficultyFilter);
  }, [questions, difficultyFilter]);

  // Use lazy state initializer with stable seed (42) for shuffled questions
  // The shuffle happens once per mount, and is re-computed when filteredQuestions change
  const shuffledQuestions = useMemo(() => {
    return shuffleWithSeed(filteredQuestions, 42, initialQuestionId);
  }, [filteredQuestions, initialQuestionId]);
  
  // Auto-flip if coming from search - defer with requestAnimationFrame
  useEffect(() => {
    if (initialQuestionId && shuffledQuestions[0]?.id === initialQuestionId) {
      requestAnimationFrame(() => {
        setIsFlipped(true);
      });
    }
  }, [initialQuestionId, shuffledQuestions]);

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;
  const isComplete = currentIndex >= totalQuestions && totalQuestions > 0;

  const isLoaded = customLoaded && favoritesLoaded && progressLoaded;

  // Check for completion - defer state updates with requestAnimationFrame
  useEffect(() => {
    if (hasShownCelebration) return;
    
    if (isComplete && totalQuestions > 0) {
      requestAnimationFrame(() => {
        playSuccess();
        triggerConfetti();
        setShowCelebration(true);
        setHasShownCelebration(true);
      });
    }
  }, [isComplete, totalQuestions, hasShownCelebration, playSuccess, triggerConfetti]);

  const handleFlip = useCallback(() => {
    playFlip();
    setIsFlipped((prev) => !prev);
  }, [playFlip]);

  const handleNextQuestion = useCallback(() => {
    playTap();
    
    if (currentQuestion) {
      markAnswered(CUSTOM_CATEGORY_ID, currentQuestion.id);
    }
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }, isFlipped ? 300 : 50);
  }, [currentQuestion, isFlipped, markAnswered, playTap]);

  const handleResetProgress = useCallback(() => {
    resetCategory(CUSTOM_CATEGORY_ID);
    setCurrentIndex(0);
    setIsFlipped(false);
    setHasShownCelebration(false);
    setShowCelebration(false);
  }, [resetCategory]);

  const handleToggleFavorite = useCallback(() => {
    if (!currentQuestion) return;
    toggleFavorite({
      id: currentQuestion.id,
      categoryId: CUSTOM_CATEGORY_ID,
      text: currentQuestion.text,
      depth: currentQuestion.depth,
    });
  }, [currentQuestion, toggleFavorite]);

  if (!isLoaded) {
    return <PlayScreenLoading />;
  }

  if (questions.length === 0) {
    return <GameEmptyState />;
  }

  return (
    <>
      <Confetti isActive={confettiActive} />
      <CelebrationOverlay
        isVisible={showCelebration}
        onDismiss={() => setShowCelebration(false)}
        message="Hele bunken er spillet"
        subMessage={`I har været alle ${totalQuestions} af jeres egne kort igennem.`}
      />

      <PlayScreen
        deckId="egne"
        title="Dine egne kort"
        actions={
          <Link
            href="/mine-spoergsmaal/"
            className="inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-semibold text-white/85 underline underline-offset-4 hover:text-white"
          >
            Ret kort
          </Link>
        }
        answered={Math.min(currentIndex, totalQuestions)}
        total={totalQuestions}
        onReset={handleResetProgress}
        onNext={isComplete ? handleResetProgress : handleNextQuestion}
        nextLabel={isComplete ? "Bland forfra" : "Næste kort"}
        hint={isComplete ? null : undefined}
      >
        {currentQuestion && !isComplete ? (
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id} {...dealMotion} className="w-full">
              <QuestionCard
                question={{
                  id: currentQuestion.id,
                  categoryId: "egne",
                  text: currentQuestion.text,
                  depth: currentQuestion.depth,
                }}
                categoryName="Dine egne"
                isFlipped={isFlipped}
                onFlip={handleFlip}
                isFavorite={isFavorite(currentQuestion.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold">Bunken er tom</h2>
            <p className="mt-2 text-white/80">I har været alle {totalQuestions} kort igennem.</p>
          </div>
        )}
      </PlayScreen>
    </>
  );
}
