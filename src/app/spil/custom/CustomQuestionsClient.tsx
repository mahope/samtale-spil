"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useCustomQuestions, CustomQuestion, CATEGORY_TAGS } from "@/hooks/useCustomQuestions";
import { useFavorites, useProgress, useDifficultyFilter } from "@/hooks/useLocalStorage";
import { useSound } from "@/hooks/useSound";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Confetti, useConfetti, CelebrationOverlay } from "@/components/Confetti";

const CUSTOM_CATEGORY_ID = "custom";

function DepthIndicator({ depth }: { depth: "let" | "medium" | "dyb" }) {
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

function TagBadge({ tagId }: { tagId?: string }) {
  const tag = CATEGORY_TAGS.find(t => t.id === tagId);
  if (!tag) return null;

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs font-medium">
      <span>{tag.emoji}</span>
      <span>{tag.label}</span>
    </span>
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
      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      aria-label={isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"}
    >
      <motion.svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill={isFavorite ? "#ef4444" : "none"}
        stroke={isFavorite ? "#ef4444" : "currentColor"}
        strokeWidth={2}
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

function EmptyState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 to-purple-500 dark:from-violet-600 dark:to-purple-700 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl mb-6"
        >
          ✍️
        </motion.div>
        <h1 className="text-2xl font-bold text-white mb-3">
          Ingen egne spørgsmål endnu
        </h1>
        <p className="text-white/80 mb-8 max-w-sm">
          Opret dine egne spørgsmål for at spille med dem her!
        </p>
        <Link
          href="/mine-spoergsmaal"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-600 rounded-xl font-medium hover:bg-white/90 transition-colors shadow-lg"
        >
          <span>Opret spørgsmål</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 left-4"
      >
        <Link
          href="/spil"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          <span>Tilbage</span>
        </Link>
      </motion.div>
    </div>
  );
}

export default function CustomQuestionsClient() {
  const { questions, isLoaded: customLoaded } = useCustomQuestions();
  const { isFavorite, toggleFavorite, isLoaded: favoritesLoaded } = useFavorites();
  const { getCategoryProgress, markAnswered, resetCategory, isLoaded: progressLoaded } = useProgress();
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

  // Shuffle questions for variety
  const shuffledQuestions = useMemo(() => {
    const shuffled = [...filteredQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [filteredQuestions]);

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;
  const isComplete = currentIndex >= totalQuestions && totalQuestions > 0;

  const isLoaded = customLoaded && favoritesLoaded && progressLoaded;

  // Check for completion
  useEffect(() => {
    if (hasShownCelebration) return;
    
    if (isComplete && totalQuestions > 0) {
      playSuccess();
      triggerConfetti();
      setShowCelebration(true);
      setHasShownCelebration(true);
    }
  }, [isComplete, totalQuestions, hasShownCelebration, playSuccess, triggerConfetti]);

  const handleFlip = useCallback(() => {
    playFlip();
    setIsFlipped(true);
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (questions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 to-purple-500 dark:from-violet-600 dark:to-purple-700">
      <Confetti isActive={confettiActive} />
      
      <CelebrationOverlay
        isVisible={showCelebration}
        onDismiss={() => setShowCelebration(false)}
        message="🎉 Godt klaret!"
        subMessage={`Du har gennemført alle ${totalQuestions} spørgsmål!`}
      />

      <main className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 z-10 p-4 flex items-center justify-between"
        >
          <Link
            href="/spil"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            <span>Tilbage</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-white font-medium">✍️ Mine Spørgsmål</span>
          </div>

          <ThemeToggle className="text-white/80 hover:text-white" />
        </motion.header>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <p className="text-white/80 text-sm mb-2">
            Spørgsmål {Math.min(currentIndex + 1, totalQuestions)} af {totalQuestions}
          </p>
          <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Question card */}
        {currentQuestion && !isComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm"
          >
            <motion.div
              className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
              onClick={!isFlipped ? handleFlip : undefined}
              whileHover={!isFlipped ? { scale: 1.02 } : {}}
              whileTap={!isFlipped ? { scale: 0.98 } : {}}
            >
              <motion.div
                className="absolute inset-0 rounded-3xl bg-white dark:bg-slate-800 shadow-2xl p-6 flex flex-col"
                animate={{ rotateY: isFlipped ? 0 : 0 }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TagBadge tagId={currentQuestion.categoryTag} />
                    <DepthIndicator depth={currentQuestion.depth} />
                  </div>
                  <FavoriteButton
                    isFavorite={isFavorite(currentQuestion.id)}
                    onToggle={handleToggleFavorite}
                  />
                </div>

                {/* Question text */}
                <div className="flex-1 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {isFlipped ? (
                      <motion.p
                        key="question"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-xl md:text-2xl text-center text-slate-800 dark:text-slate-100 leading-relaxed font-medium"
                      >
                        {currentQuestion.text}
                      </motion.p>
                    ) : (
                      <motion.div
                        key="tap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-5xl mb-4"
                        >
                          ✍️
                        </motion.div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Tryk for at se spørgsmålet
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card footer */}
                <div className="text-center text-slate-400 text-xs">
                  {!isFlipped ? "Tryk for at vende kortet" : "Dit eget spørgsmål"}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : isComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-6"
            >
              🎉
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Alle spørgsmål gennemført!
            </h2>
            <p className="text-white/80 mb-8">
              Du har været igennem alle {totalQuestions} spørgsmål
            </p>
            <motion.button
              onClick={handleResetProgress}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-violet-600 rounded-xl font-medium shadow-lg"
            >
              Start forfra
            </motion.button>
          </motion.div>
        ) : null}

        {/* Next button */}
        {isFlipped && !isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 w-full max-w-sm"
          >
            <motion.button
              onClick={handleNextQuestion}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Næste spørgsmål</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </motion.div>
        )}

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex gap-4 text-sm"
        >
          <Link
            href="/mine-spoergsmaal"
            className="text-white/70 hover:text-white transition-colors"
          >
            Administrer spørgsmål
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
