"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Player } from "@/types/multiplayer";

interface PlayerListProps {
  players: Player[];
  currentTurnPlayerId: string | null;
  currentPlayerId: string;
  scores?: Record<string, number>;
  speedBonuses?: Record<string, number>;
  speedRound?: boolean;
  compact?: boolean;
}

export function PlayerList({
  players,
  currentTurnPlayerId,
  currentPlayerId,
  scores = {},
  speedBonuses = {},
  speedRound = false,
  compact = false,
}: PlayerListProps) {
  // Calculate total score (base + speed bonus)
  const getTotalScore = (playerId: string) => {
    const base = scores[playerId] || 0;
    const bonus = speedBonuses[playerId] || 0;
    return base + bonus;
  };

  if (compact) {
    // Sort by total score in speed round mode
    const sortedPlayers = speedRound 
      ? [...players].sort((a, b) => getTotalScore(b.id) - getTotalScore(a.id))
      : players;

    return (
      <div className="flex items-center gap-1 flex-wrap">
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            layout
            className={`relative flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
              player.id === currentTurnPlayerId
                ? "bg-white text-slate-800 shadow-md"
                : speedRound && index === 0
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-800"
                : "bg-white/20 text-white"
            } ${player.id === currentPlayerId ? "ring-2 ring-white/50" : ""}`}
          >
            {speedRound && index === 0 && (
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-xs"
              >
                👑
              </motion.span>
            )}
            <span>{player.emoji}</span>
            <span className="max-w-[60px] truncate">{player.name}</span>
            {speedRound ? (
              <span className="text-xs font-bold">
                {getTotalScore(player.id)}
                {(speedBonuses[player.id] || 0) > 0 && (
                  <span className="text-orange-500 ml-0.5">+{speedBonuses[player.id]}</span>
                )}
              </span>
            ) : scores[player.id] !== undefined && (
              <span className="text-xs opacity-70">({scores[player.id]})</span>
            )}
            {player.id === currentTurnPlayerId && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -top-1 -right-1 text-xs"
              >
                🎯
              </motion.span>
            )}
            {!player.isConnected && (
              <span className="absolute -top-1 -left-1 text-xs">⚠️</span>
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  // Sort by total score in speed round mode
  const sortedPlayers = speedRound 
    ? [...players].sort((a, b) => getTotalScore(b.id) - getTotalScore(a.id))
    : players;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
      <h3 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
        Spillere
        {speedRound && (
          <span className="text-orange-400 text-xs font-bold">⚡ SPEED</span>
        )}
      </h3>
      <div className="space-y-2">
        <AnimatePresence>
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
              className={`flex items-center justify-between p-2 rounded-xl ${
                player.id === currentTurnPlayerId
                  ? "bg-white/30 ring-2 ring-white"
                  : speedRound && index === 0
                  ? "bg-gradient-to-r from-yellow-400/30 to-orange-400/30 ring-1 ring-orange-400"
                  : "bg-white/10"
              } ${!player.isConnected ? "opacity-50" : ""}`}
            >
              <div className="flex items-center gap-2">
                {speedRound && index === 0 && (
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-lg"
                  >
                    👑
                  </motion.span>
                )}
                <span className="text-xl">{player.emoji}</span>
                <div>
                  <span className="text-white font-medium text-sm">
                    {player.name}
                    {player.id === currentPlayerId && " (dig)"}
                  </span>
                  {player.isHost && !speedRound && (
                    <span className="ml-1 text-yellow-300 text-xs">👑</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {speedRound ? (
                  <div className="text-right">
                    <span className="text-white font-bold text-sm">
                      {getTotalScore(player.id)} point
                    </span>
                    {(speedBonuses[player.id] || 0) > 0 && (
                      <span className="block text-orange-400 text-xs font-medium">
                        +{speedBonuses[player.id]} bonus
                      </span>
                    )}
                  </div>
                ) : scores[player.id] !== undefined && (
                  <span className="text-white/70 text-sm">
                    {scores[player.id]} svar
                  </span>
                )}
                {player.id === currentTurnPlayerId && (
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-lg"
                  >
                    🎤
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface TurnIndicatorProps {
  currentPlayer: Player | undefined;
  isMyTurn: boolean;
  turnStartedAt: number | null;
  turnDuration: number;
}

export function TurnIndicator({
  currentPlayer,
  isMyTurn,
  turnStartedAt,
  turnDuration,
}: TurnIndicatorProps) {
  if (!currentPlayer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center gap-3 px-4 py-2 rounded-full ${
        isMyTurn
          ? "bg-green-500/30 border-2 border-green-400"
          : "bg-white/20 border border-white/30"
      }`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="text-2xl" aria-hidden="true">{currentPlayer.emoji}</span>
      <span className="text-white font-medium">
        {isMyTurn ? "Din tur!" : `${currentPlayer.name}s tur`}
      </span>
      {turnStartedAt && (
        <TurnTimer startedAt={turnStartedAt} duration={turnDuration} />
      )}
    </motion.div>
  );
}

function TurnTimer({ startedAt, duration }: { startedAt: number; duration: number }) {
  // Simple timer display - actual countdown is handled elsewhere
  return (
    <motion.span
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="text-white/70"
    >
      ⏱️ {duration}s
    </motion.span>
  );
}

interface FavoriteIndicatorsProps {
  favoritedByPlayers: Record<string, string[]>;
  questionId: string | null;
  players: Player[];
  showOthersFavorites: boolean;
  currentPlayerId: string;
}

export function FavoriteIndicators({
  favoritedByPlayers,
  questionId,
  players,
  showOthersFavorites,
  currentPlayerId,
}: FavoriteIndicatorsProps) {
  if (!questionId) return null;

  const favoriters = favoritedByPlayers[questionId] || [];
  if (favoriters.length === 0) return null;

  const displayPlayers = showOthersFavorites
    ? favoriters
    : favoriters.filter((id) => id === currentPlayerId);

  if (displayPlayers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-1 mt-2"
    >
      <span className="text-sm text-white/60">Favoriteret af:</span>
      <div className="flex -space-x-1">
        {displayPlayers.map((playerId) => {
          const player = players.find((p) => p.id === playerId);
          return player ? (
            <motion.span
              key={playerId}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block"
              title={player.name}
            >
              {player.emoji}
            </motion.span>
          ) : null;
        })}
      </div>
    </motion.div>
  );
}
