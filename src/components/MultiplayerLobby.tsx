"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Player, MultiplayerSettings } from "@/types/multiplayer";
import { PLAYER_EMOJIS } from "@/types/multiplayer";
import { categories } from "@/data/categories";
import { TIMING } from "@/constants";

interface MultiplayerLobbyProps {
  roomCode: string;
  players: Player[];
  settings: MultiplayerSettings;
  currentPlayerId: string;
  isHost: boolean;
  onUpdateSettings: (settings: Partial<MultiplayerSettings>) => void;
  onStartGame: () => void;
  onLeaveRoom: () => void;
  onKickPlayer?: (playerId: string) => void;
  onUpdatePlayer: (updates: { name?: string; emoji?: string }) => void;
}

export function MultiplayerLobby({
  roomCode,
  players,
  settings,
  currentPlayerId,
  isHost,
  onUpdateSettings,
  onStartGame,
  onLeaveRoom,
  onKickPlayer,
  onUpdatePlayer,
}: MultiplayerLobbyProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const [copied, setCopied] = useState(false);

  const currentPlayer = players.find((p) => p.id === currentPlayerId);

  const copyRoomCode = useCallback(async () => {
    await navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), TIMING.COPY_FEEDBACK);
  }, [roomCode]);

  const handleNameEdit = useCallback(() => {
    if (currentPlayer) {
      setTempName(currentPlayer.name);
      setEditingName(true);
    }
  }, [currentPlayer]);

  const handleNameSave = useCallback(() => {
    if (tempName.trim()) {
      onUpdatePlayer({ name: tempName.trim() });
    }
    setEditingName(false);
  }, [tempName, onUpdatePlayer]);

  const canStart =
    isHost &&
    settings.categoryId !== null &&
    players.length >= 2 &&
    players.filter((p) => p.isConnected).length >= 2;

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center px-4 py-6 sm:py-8 overflow-y-auto pb-safe">
      {/* Header with room code */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8 w-full max-w-md"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Multiplayer Lobby</h1>
        <motion.button
          onClick={copyRoomCode}
          className="group relative w-full sm:w-auto px-4 sm:px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 active:bg-white/40 transition-all touch-manipulation"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-white/70 text-xs sm:text-sm">Rumkode:</span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-widest">
              {roomCode}
            </span>
            <motion.span
              animate={copied ? { scale: [1, 1.2, 1] } : {}}
              className="text-white/70 text-lg"
            >
              {copied ? "✓" : "📋"}
            </motion.span>
          </div>
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white text-sm"
              >
                Kopieret!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <p className="text-white/70 text-xs sm:text-sm mt-4">
          Del koden med de andre spillere
        </p>
      </motion.div>

      {/* Players list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 sm:mb-6 border border-white/20"
      >
        <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span>👥</span> Spillere ({players.length}/{settings.maxPlayers})
        </h2>
        <div className="space-y-2">
          <AnimatePresence>
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${
                  player.id === currentPlayerId
                    ? "bg-white/30"
                    : "bg-white/10"
                } ${!player.isConnected ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  {/* Emoji (clickable for current player) */}
                  {player.id === currentPlayerId ? (
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-2xl sm:text-3xl min-w-[44px] min-h-[44px] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform touch-manipulation"
                      aria-label="Vælg emoji"
                    >
                      {player.emoji}
                    </button>
                  ) : (
                    <span className="text-2xl sm:text-3xl min-w-[44px] flex items-center justify-center">{player.emoji}</span>
                  )}

                  {/* Name */}
                  <div className="flex flex-col min-w-0">
                    {editingName && player.id === currentPlayerId ? (
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={handleNameSave}
                        onKeyDown={(e) => e.key === "Enter" && handleNameSave()}
                        className="bg-white/20 rounded px-2 py-1 text-white text-sm outline-none w-full max-w-[150px]"
                        autoFocus
                        maxLength={20}
                      />
                    ) : (
                      <span
                        className={`font-medium text-white text-sm sm:text-base truncate ${
                          player.id === currentPlayerId
                            ? "cursor-pointer hover:underline active:opacity-70"
                            : ""
                        }`}
                        onClick={
                          player.id === currentPlayerId
                            ? handleNameEdit
                            : undefined
                        }
                      >
                        {player.name}
                      </span>
                    )}
                    <span className="text-xs text-white/60">
                      {player.isHost && "👑 Vært"}
                      {player.id === currentPlayerId && !player.isHost && "Du"}
                      {!player.isConnected && " • Afbrudt"}
                    </span>
                  </div>
                </div>

                {/* Kick button (host only, not self) */}
                {isHost && player.id !== currentPlayerId && onKickPlayer && (
                  <button
                    onClick={() => onKickPlayer(player.id)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/50 hover:text-red-400 active:text-red-500 transition-colors touch-manipulation"
                    title="Fjern spiller"
                    aria-label="Fjern spiller"
                  >
                    <span className="text-lg">✕</span>
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Emoji picker */}
        <AnimatePresence>
          {showEmojiPicker && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/20"
            >
              <p className="text-sm text-white/70 mb-3">Vælg emoji:</p>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-1">
                {PLAYER_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      onUpdatePlayer({ emoji });
                      setShowEmojiPicker(false);
                    }}
                    className={`text-2xl min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation ${
                      currentPlayer?.emoji === emoji ? "bg-white/30" : ""
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Game settings (host only) */}
      {isHost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 sm:mb-6 border border-white/20"
        >
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <span>⚙️</span> Spilindstillinger
          </h2>

          {/* Category selection */}
          <div className="mb-4">
            <label className="text-sm text-white/70 block mb-2">
              Kategori
            </label>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onUpdateSettings({ categoryId: cat.id })}
                  className={`min-h-[52px] p-3 sm:p-4 rounded-xl text-left transition-all touch-manipulation active:scale-[0.98] ${
                    settings.categoryId === cat.id
                      ? "bg-white/30 border-2 border-white shadow-lg"
                      : "bg-white/10 border-2 border-transparent hover:bg-white/20 active:bg-white/25"
                  }`}
                >
                  <span className="text-xl sm:text-lg">{cat.emoji}</span>
                  <span className="ml-2 text-white text-sm sm:text-base font-medium">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Turn duration */}
          <div className="mb-4">
            <label className="text-sm text-white/70 block mb-2">
              Tid pr. tur
            </label>
            <div className="flex gap-2">
              {([30, 60, 90] as const).map((duration) => (
                <button
                  key={duration}
                  onClick={() => onUpdateSettings({ turnDuration: duration })}
                  className={`flex-1 min-h-[48px] py-3 rounded-xl transition-all touch-manipulation active:scale-[0.98] ${
                    settings.turnDuration === duration
                      ? "bg-white/30 border-2 border-white shadow-lg"
                      : "bg-white/10 border-2 border-transparent hover:bg-white/20 active:bg-white/25"
                  }`}
                >
                  <span className="text-white font-medium text-base">{duration}s</span>
                </button>
              ))}
            </div>
          </div>

          {/* Turn order */}
          <div className="mb-4">
            <label className="text-sm text-white/70 block mb-2">
              Tur-rækkefølge
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "round-robin", label: "Rundt", icon: "🔄" },
                { id: "random", label: "Tilfældig", icon: "🎲" },
                { id: "free", label: "Fri", icon: "🆓" },
              ].map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() =>
                    onUpdateSettings({
                      turnOrderMode: id as MultiplayerSettings["turnOrderMode"],
                    })
                  }
                  className={`min-h-[56px] py-3 px-2 rounded-xl transition-all touch-manipulation active:scale-[0.98] flex flex-col items-center justify-center gap-1 ${
                    settings.turnOrderMode === id
                      ? "bg-white/30 border-2 border-white shadow-lg"
                      : "bg-white/10 border-2 border-transparent hover:bg-white/20 active:bg-white/25"
                  }`}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-white text-xs sm:text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Speed Round toggle */}
          <div className="mb-2">
            <button
              onClick={() => {
                const newSpeedRound = !settings.speedRound;
                if (newSpeedRound && settings.turnOrderMode === "free") {
                  // Force round-robin when enabling speed round in free mode
                  onUpdateSettings({ speedRound: true, turnOrderMode: "round-robin" });
                } else {
                  onUpdateSettings({ speedRound: newSpeedRound });
                }
              }}
              className={`w-full min-h-[64px] py-4 px-4 rounded-xl transition-all touch-manipulation active:scale-[0.98] flex items-center justify-between ${
                settings.speedRound
                  ? "bg-gradient-to-r from-orange-500 to-red-500 border-2 border-white shadow-lg"
                  : "bg-white/10 border-2 border-transparent hover:bg-white/20 active:bg-white/25"
              }`}
            >
              <div className="flex items-center gap-3">
                <motion.span 
                  className="text-2xl"
                  animate={settings.speedRound ? { rotate: [0, -10, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5, repeat: settings.speedRound ? Infinity : 0, repeatDelay: 1 }}
                >
                  ⚡
                </motion.span>
                <div className="text-left">
                  <span className="text-white font-bold block">Speed Round</span>
                  <span className="text-white/70 text-xs">10 sek timer • Bonus for hurtige svar</span>
                </div>
              </div>
              <div
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.speedRound ? "bg-white/30" : "bg-white/10"
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  animate={{ x: settings.speedRound ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </button>
            
            {/* Speed Round + Free Mode Conflict Warning */}
            {settings.speedRound && settings.turnOrderMode === "free" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg"
              >
                <p className="text-amber-200 text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  Speed round automatisk skifter til &quot;Rundt om bordet&quot; mode for bedre spilflow
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Settings display for non-host */}
      {!isHost && settings.categoryId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 sm:mb-6 border border-white/20"
        >
          <p className="text-white/70 text-center text-sm sm:text-base">
            Venter på at værten starter spillet...
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-3 text-white text-sm sm:text-base">
            <span className="flex items-center gap-1">
              <span>{categories.find((c) => c.id === settings.categoryId)?.emoji}</span>
              <span>{categories.find((c) => c.id === settings.categoryId)?.name}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>⏱️</span>
              <span>{settings.speedRound ? "10s" : `${settings.turnDuration}s`}</span>
            </span>
            {settings.speedRound && (
              <motion.span 
                className="flex items-center gap-1 text-orange-300 font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span>⚡</span>
                <span>Speed Round!</span>
              </motion.span>
            )}
          </div>
        </motion.div>
      )}

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md space-y-3 mt-auto"
      >
        {isHost && (
          <motion.button
            onClick={onStartGame}
            disabled={!canStart}
            whileHover={canStart ? { scale: 1.02 } : {}}
            whileTap={canStart ? { scale: 0.98 } : {}}
            className={`w-full min-h-[56px] py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg transition-all touch-manipulation ${
              canStart
                ? "bg-white text-purple-600 hover:shadow-xl active:bg-gray-100"
                : "bg-white/30 text-white/50 cursor-not-allowed"
            }`}
          >
            {!settings.categoryId
              ? "Vælg en kategori"
              : players.length < 2
              ? "Venter på spillere..."
              : "Start spillet 🎮"}
          </motion.button>
        )}

        <motion.button
          onClick={onLeaveRoom}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full min-h-[52px] py-3 rounded-2xl bg-white/10 text-white font-medium border border-white/20 hover:bg-white/20 active:bg-white/30 transition-all touch-manipulation"
        >
          Forlad rum
        </motion.button>
      </motion.div>

      {/* Bottom safe area spacer */}
      <div className="h-4 sm:h-0" />
    </div>
  );
}
