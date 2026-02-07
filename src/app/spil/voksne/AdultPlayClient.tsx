"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { adultQuestions, ADULT_CATEGORY_ID, adultCategory } from "@/data/questions/voksne";
import type { Question } from "@/types";
import { useFavorites, useProgress, useDifficultyFilter } from "@/hooks/useLocalStorage";
import { useSound } from "@/hooks/useSound";
import { AgeVerificationModal, useAdultContentVerification } from "@/components/AgeVerificationModal";
import { Confetti, useConfetti, CelebrationOverlay } from "@/components/Confetti";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TIMING } from "@/constants";

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

function DepthIndicator({ depth }: { depth: Question["depth"] }) {
  const config = {
    let: { label: "Let", dots: 1, color: "bg-green-400" },
    medium: { label: "Medium", dots: 2, color: "bg-yellow-400" },
    dyb: { label: "Dyb", dots: 3, color: "bg-red-400" },
  };

  const { label, dots, color } = config[depth];

  return (
    <div className="flex items-center gap-2" aria-label={`Sværhedsgrad: ${label}`}>
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i <= dots ? color : "bg-slate-600"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-red-200 font-medium">{label}</span>
    </div>
  );
}

export default function AdultPlayClient() {
  const router = useRouter();
  const { isVerified, clearVerification } = useAdultContentVerification();
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
    router.push("/spil");
  }, [router]);

  const handleFlip = useCallback(() => {
    playFlip();
    setIsFlipped(true);
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

  // Show verification modal if not verified
  if (!isVerifiedState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <AgeVerificationModal
          isOpen={showVerificationModal}
          onVerify={handleVerify}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  // Loading state
  const isLoaded = progressLoaded && favoritesLoaded;
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-3 border-red-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const progress = Math.min((answeredCount / activeQuestionCount) * 100, 100);

  return (
    <>
      <Confetti isActive={confettiActive} />

      <CelebrationOverlay
        isVisible={showCelebration}
        message="🔥 Alle spørgsmål besvaret!"
        subMessage={`I har gennemført alle ${activeQuestionCount} intime spørgsmål!`}
        onDismiss={() => setShowCelebration(false)}
      />

      {/* Dark/Red adult theme background */}
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-rose-900 to-slate-900 relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
        </div>

        <main className="relative flex min-h-screen flex-col items-center px-6 py-8">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md flex items-center justify-between mb-8"
          >
            <Link
              href="/spil"
              className="inline-flex items-center gap-2 text-red-200/80 hover:text-red-200 transition-colors"
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
              <span>Tilbage</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                {adultCategory.emoji}
              </span>
              <span className="text-red-100 font-semibold">{adultCategory.name}</span>
              <span className="px-2 py-0.5 bg-red-500/20 text-red-300 text-xs font-medium rounded-full">
                18+
              </span>
            </div>

            <ThemeToggle className="text-red-200" />
          </motion.header>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="w-full max-w-md mb-8"
          >
            <div className="h-2 bg-red-500/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-2 text-red-200/70 text-xs">
              <button
                type="button"
                onClick={handleResetProgress}
                className="hover:text-red-200 transition-colors underline"
              >
                Nulstil
              </button>
              <span>
                {answeredCount} / {activeQuestionCount} spørgsmål
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
                  className="w-full max-w-sm"
                >
                  <div className="perspective-1000">
                    <motion.div
                      className="relative w-full h-[400px] cursor-pointer rounded-3xl"
                      onClick={!isFlipped ? handleFlip : undefined}
                      initial={false}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Front of card */}
                      <div
                        className="absolute inset-0 w-full h-full backface-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-rose-500/20 backdrop-blur-md rounded-3xl shadow-2xl border border-red-500/30 flex flex-col items-center justify-center p-8">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-7xl mb-6"
                          >
                            🔥
                          </motion.div>
                          <p className="text-red-100 text-xl font-medium text-center">
                            Tryk for at se spørgsmålet
                          </p>
                          <p className="text-red-200/60 text-sm mt-2">
                            Intimt indhold for par
                          </p>
                        </div>
                      </div>

                      {/* Back of card */}
                      <div
                        className="absolute inset-0 w-full h-full backface-hidden"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="w-full h-full bg-slate-900 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 relative border border-red-500/20">
                          {/* Top bar */}
                          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                            <DepthIndicator depth={currentQuestion.depth} />
                            <motion.button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite();
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-full hover:bg-red-500/20 transition-colors"
                            >
                              <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill={
                                  isFavorite(currentQuestion.id)
                                    ? "#ef4444"
                                    : "none"
                                }
                                stroke={
                                  isFavorite(currentQuestion.id)
                                    ? "#ef4444"
                                    : "#fca5a5"
                                }
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </motion.button>
                          </div>

                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-red-50 text-2xl font-medium text-center leading-relaxed"
                          >
                            {currentQuestion.text}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Next question button */}
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 w-full max-w-sm"
            >
              <motion.button
                type="button"
                onClick={handleNextQuestion}
                disabled={isTransitioning}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
}
