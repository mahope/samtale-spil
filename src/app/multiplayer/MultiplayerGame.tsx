"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GameRoom, Player } from "@/types/multiplayer";
import { getCategory, getRandomQuestion } from "@/data/categories";
import type { Question } from "@/types";
import { useFavorites } from "@/hooks/useLocalStorage";
import { useSound } from "@/hooks/useSound";
import { PlayerList, TurnIndicator, FavoriteIndicators } from "@/components/PlayerList";
import { TimerDisplay } from "@/components/TimerDisplay";
import { Confetti, CelebrationOverlay, useConfetti } from "@/components/Confetti";
import { FloatingParticles } from "@/components/FloatingParticles";

interface MultiplayerGameProps {
  room: GameRoom;
  currentPlayerId: string;
  isHost: boolean;
  isMyTurn: boolean;
  currentTurnPlayer: Player | undefined;
  isCardFlipped: boolean;
  onNextQuestion: (questionId: string, questionIndex: number) => void;
  onToggleCardFlip: (questionId: string) => void;
  onToggleFavorite: (questionId: string, isFavorite: boolean) => void;
  onLeaveRoom: () => void;
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
      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {label}
      </span>
    </div>
  );
}

export function MultiplayerGame({
  room,
  currentPlayerId,
  isHost,
  isMyTurn,
  currentTurnPlayer,
  isCardFlipped,
  onNextQuestion,
  onToggleCardFlip,
  onToggleFavorite,
  onLeaveRoom,
}: MultiplayerGameProps) {
  const category = room.settings.categoryId
    ? getCategory(room.settings.categoryId)
    : null;

  const { isFavorite, toggleFavorite: toggleLocalFavorite } = useFavorites();
  const { playFlip, playSuccess, playTap, playTimeout, playTick } = useSound();
  const { isActive: confettiActive, trigger: triggerConfetti } = useConfetti();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  // Initialize question when game starts or question changes
  useEffect(() => {
    if (!category) return;

    if (room.gameState.currentQuestionId) {
      // Find the current question
      const question = category.questions.find(
        (q) => q.id === room.gameState.currentQuestionId
      );
      if (question) {
        setCurrentQuestion(question);
      }
    } else {
      // Get first question
      const firstQuestion = getRandomQuestion(
        category.id,
        room.gameState.answeredQuestionIds
      );
      if (firstQuestion && isHost) {
        onNextQuestion(firstQuestion.id, 0);
      }
    }
  }, [
    category,
    room.gameState.currentQuestionId,
    room.gameState.answeredQuestionIds,
    isHost,
    onNextQuestion,
  ]);

  // Update question when it changes in room state
  useEffect(() => {
    if (!category || !room.gameState.currentQuestionId) return;

    const question = category.questions.find(
      (q) => q.id === room.gameState.currentQuestionId
    );
    if (question && question.id !== currentQuestion?.id) {
      setCurrentQuestion(question);
      setTimerKey((prev) => prev + 1);
    }
  }, [category, room.gameState.currentQuestionId, currentQuestion?.id]);

  const handleFlip = useCallback(() => {
    if (!currentQuestion) return;

    // Only current turn player can flip in turn-based modes
    if (room.settings.turnOrderMode !== "free" && !isMyTurn) {
      return;
    }

    playFlip();
    onToggleCardFlip(currentQuestion.id);
  }, [currentQuestion, room.settings.turnOrderMode, isMyTurn, playFlip, onToggleCardFlip]);

  const handleNextQuestion = useCallback(() => {
    if (!category) return;

    // Only current turn player or host can advance in turn-based modes
    if (room.settings.turnOrderMode !== "free" && !isMyTurn && !isHost) {
      return;
    }

    playTap();

    // Get next question
    const answeredIds = currentQuestion
      ? [...room.gameState.answeredQuestionIds, currentQuestion.id]
      : room.gameState.answeredQuestionIds;

    // Check if all questions have been answered
    const isComplete = answeredIds.length >= category.questions.length;
    if (isComplete) {
      triggerConfetti();
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    const idsToExclude = isComplete ? [] : answeredIds;
    const nextQuestion = getRandomQuestion(category.id, idsToExclude);

    if (nextQuestion) {
      onNextQuestion(nextQuestion.id, room.gameState.currentQuestionIndex + 1);
    }
  }, [
    category,
    currentQuestion,
    room.gameState.answeredQuestionIds,
    room.gameState.currentQuestionIndex,
    room.settings.turnOrderMode,
    isMyTurn,
    isHost,
    playTap,
    triggerConfetti,
    onNextQuestion,
  ]);

  const handleToggleFavorite = useCallback(() => {
    if (!currentQuestion) return;

    playSuccess();
    const isCurrentlyFavorite = isFavorite(currentQuestion.id);
    const newFavoriteState = !isCurrentlyFavorite;

    // Update local favorites
    toggleLocalFavorite({
      id: currentQuestion.id,
      categoryId: currentQuestion.categoryId,
      text: currentQuestion.text,
      depth: currentQuestion.depth,
    });

    // Sync to multiplayer
    onToggleFavorite(currentQuestion.id, newFavoriteState);
  }, [currentQuestion, isFavorite, toggleLocalFavorite, onToggleFavorite, playSuccess]);

  const handleTimerTimeout = useCallback(() => {
    playTimeout();
    // Auto-advance on timeout
    if (isMyTurn || room.settings.turnOrderMode === "free") {
      handleNextQuestion();
    }
  }, [playTimeout, isMyTurn, room.settings.turnOrderMode, handleNextQuestion]);

  const handleTimerTick = useCallback(
    (secondsLeft: number) => {
      if (secondsLeft <= 5) {
        playTick();
      }
    },
    [playTick]
  );

  if (!category || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
        />
      </div>
    );
  }

  const totalQuestions = category.questions.length;
  const answeredCount = room.gameState.answeredQuestionIds.length;
  const progress = Math.min((answeredCount / totalQuestions) * 100, 100);

  return (
    <>
      <Confetti isActive={confettiActive} />
      <CelebrationOverlay
        isVisible={showCelebration}
        message="🎉 Alle spørgsmål besvaret!"
        subMessage={`I har gennemført alle ${totalQuestions} spørgsmål sammen!`}
        onDismiss={() => setShowCelebration(false)}
      />

      <div
        className={`min-h-screen bg-gradient-to-br ${category.color} relative overflow-hidden`}
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <FloatingParticles count={8} opacity={0.06} />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>

        <main className="relative flex min-h-screen flex-col px-4 py-6">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4"
          >
            <button
              onClick={() => setShowLeaveConfirm(true)}
              className="text-white/80 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-2xl">{category.emoji}</span>
              <span className="text-white font-semibold">{category.name}</span>
              <span className="text-white/60 text-sm">
                ({room.roomCode})
              </span>
            </div>

            <div className="w-10" /> {/* Spacer for alignment */}
          </motion.header>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md mx-auto mb-4"
          >
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/80 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-center text-white/70 text-xs mt-1">
              {answeredCount} / {totalQuestions}
            </p>
          </motion.div>

          {/* Player list (compact) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <PlayerList
              players={room.players}
              currentTurnPlayerId={room.gameState.currentTurnPlayerId}
              currentPlayerId={currentPlayerId}
              scores={room.gameState.scores}
              compact
            />
          </motion.div>

          {/* Turn indicator */}
          {room.settings.turnOrderMode !== "free" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mb-4"
            >
              <TurnIndicator
                currentPlayer={currentTurnPlayer}
                isMyTurn={isMyTurn}
                turnStartedAt={room.gameState.turnStartedAt}
                turnDuration={room.settings.turnDuration}
              />
            </motion.div>
          )}

          {/* Timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mb-4"
          >
            <TimerDisplay
              key={timerKey}
              duration={room.settings.turnDuration}
              isActive={isCardFlipped && (isMyTurn || room.settings.turnOrderMode === "free")}
              onTimeout={handleTimerTimeout}
              onTick={handleTimerTick}
              isPaused={!isCardFlipped}
            />
          </motion.div>

          {/* Question Card */}
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                className="w-full max-w-sm mx-auto perspective-1000"
              >
                <motion.div
                  className={`relative w-full h-[380px] cursor-pointer rounded-3xl ${
                    room.settings.turnOrderMode !== "free" && !isMyTurn
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                  onClick={handleFlip}
                  initial={false}
                  animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-full h-full bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 flex flex-col items-center justify-center p-8">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-7xl mb-6"
                      >
                        🎴
                      </motion.div>
                      <p className="text-white text-xl font-medium text-center">
                        {room.settings.turnOrderMode !== "free" && !isMyTurn
                          ? `Vent på ${currentTurnPlayer?.name || "spilleren"}...`
                          : "Tryk for at se spørgsmålet"}
                      </p>
                    </div>
                  </div>

                  {/* Back of card (question) */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="w-full h-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 relative">
                      {/* Top bar */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                        <DepthIndicator depth={currentQuestion.depth} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite();
                          }}
                          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill={isFavorite(currentQuestion.id) ? "#ef4444" : "none"}
                            stroke={isFavorite(currentQuestion.id) ? "#ef4444" : "currentColor"}
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-slate-800 dark:text-slate-100 text-2xl font-medium text-center leading-relaxed"
                      >
                        {currentQuestion.text}
                      </motion.p>

                      {/* Favorite indicators from other players */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <FavoriteIndicators
                          favoritedByPlayers={room.gameState.favoritedByPlayers}
                          questionId={currentQuestion.id}
                          players={room.players}
                          showOthersFavorites={room.settings.showOthersFavorites}
                          currentPlayerId={currentPlayerId}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next question button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 w-full max-w-sm mx-auto"
          >
            <motion.button
              onClick={handleNextQuestion}
              disabled={room.settings.turnOrderMode !== "free" && !isMyTurn && !isHost}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
                room.settings.turnOrderMode !== "free" && !isMyTurn && !isHost
                  ? "bg-white/30 text-white/50 cursor-not-allowed"
                  : "bg-white text-slate-800 hover:shadow-xl"
              }`}
            >
              {room.settings.turnOrderMode !== "free" && !isMyTurn && !isHost
                ? `Venter på ${currentTurnPlayer?.name || "spilleren"}...`
                : "Næste spørgsmål →"}
            </motion.button>
          </motion.div>
        </main>

        {/* Leave confirmation modal */}
        <AnimatePresence>
          {showLeaveConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowLeaveConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              >
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  Forlad spillet?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Er du sikker på at du vil forlade multiplayer-spillet?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLeaveConfirm(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white font-medium"
                  >
                    Annuller
                  </button>
                  <button
                    onClick={() => {
                      setShowLeaveConfirm(false);
                      onLeaveRoom();
                    }}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium"
                  >
                    Forlad
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
