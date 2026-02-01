"use client";

import { useMultiplayer } from "@/hooks/useMultiplayer";
import { MultiplayerJoin } from "@/components/MultiplayerJoin";
import { MultiplayerLobby } from "@/components/MultiplayerLobby";
import { MultiplayerGame } from "./MultiplayerGame";
import { motion } from "framer-motion";
import { logger } from "@/utils/logger";

export default function MultiplayerPage() {
  const {
    isLoading,
    room,
    currentPlayer,
    error,
    isHost,
    isMyTurn,
    currentTurnPlayer,
    isCardFlipped,
    createRoom,
    joinRoom,
    leaveRoom,
    updatePlayer,
    updateSettings,
    startGame,
    nextQuestion,
    toggleCardFlip,
    toggleFavorite,
    kickPlayer,
  } = useMultiplayer({
    onPlayerJoin: (player) => {
      logger.debug("Player joined:", player.name);
    },
    onPlayerLeave: (playerId) => {
      logger.debug("Player left:", playerId);
    },
    onGameStart: () => {
      logger.debug("Game started!");
    },
    onNextQuestion: (questionId) => {
      logger.debug("Next question:", questionId);
    },
    onError: (error) => {
      logger.error("Multiplayer error:", error);
    },
  });

  // Loading state
  if (isLoading) {
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

  // No room - show join/create screen
  if (!room || !currentPlayer) {
    return (
      <MultiplayerJoin
        onCreateRoom={createRoom}
        onJoinRoom={joinRoom}
        error={error}
        isLoading={isLoading}
      />
    );
  }

  // In lobby - show lobby screen
  if (room.gameState.status === "lobby") {
    return (
      <MultiplayerLobby
        roomCode={room.roomCode}
        players={room.players}
        settings={room.settings}
        currentPlayerId={currentPlayer.id}
        isHost={isHost}
        onUpdateSettings={updateSettings}
        onStartGame={startGame}
        onLeaveRoom={leaveRoom}
        onKickPlayer={isHost ? kickPlayer : undefined}
        onUpdatePlayer={updatePlayer}
      />
    );
  }

  // Playing - show game screen
  return (
    <MultiplayerGame
      room={room}
      currentPlayerId={currentPlayer.id}
      isHost={isHost}
      isMyTurn={isMyTurn}
      currentTurnPlayer={currentTurnPlayer}
      isCardFlipped={isCardFlipped}
      onNextQuestion={nextQuestion}
      onToggleCardFlip={toggleCardFlip}
      onToggleFavorite={toggleFavorite}
      onLeaveRoom={leaveRoom}
    />
  );
}
