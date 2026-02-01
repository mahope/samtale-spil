"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Player, MultiplayerSettings } from "@/types/multiplayer";
import { PLAYER_EMOJIS } from "@/types/multiplayer";
import { categories } from "@/data/categories";

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
    setTimeout(() => setCopied(false), 2000);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center px-4 py-8">
      {/* Header with room code */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Multiplayer Lobby</h1>
        <motion.button
          onClick={copyRoomCode}
          className="group relative px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-white/70 text-sm">Rumkode:</span>
            <span className="text-3xl font-mono font-bold text-white tracking-widest">
              {roomCode}
            </span>
            <motion.span
              animate={copied ? { scale: [1, 1.2, 1] } : {}}
              className="text-white/70"
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
        <p className="text-white/70 text-sm mt-4">
          Del koden med de andre spillere
        </p>
      </motion.div>

      {/* Players list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
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
                className={`flex items-center justify-between p-3 rounded-xl ${
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
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {player.emoji}
                    </button>
                  ) : (
                    <span className="text-2xl">{player.emoji}</span>
                  )}

                  {/* Name */}
                  <div className="flex flex-col">
                    {editingName && player.id === currentPlayerId ? (
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={handleNameSave}
                        onKeyDown={(e) => e.key === "Enter" && handleNameSave()}
                        className="bg-white/20 rounded px-2 py-1 text-white text-sm outline-none"
                        autoFocus
                        maxLength={20}
                      />
                    ) : (
                      <span
                        className={`font-medium text-white ${
                          player.id === currentPlayerId
                            ? "cursor-pointer hover:underline"
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
                    className="p-2 text-white/50 hover:text-red-400 transition-colors"
                    title="Fjern spiller"
                  >
                    ✕
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
              <p className="text-sm text-white/70 mb-2">Vælg emoji:</p>
              <div className="flex flex-wrap gap-2">
                {PLAYER_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      onUpdatePlayer({ emoji });
                      setShowEmojiPicker(false);
                    }}
                    className={`text-2xl p-1 rounded hover:bg-white/20 transition-colors ${
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
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>⚙️</span> Spilindstillinger
          </h2>

          {/* Category selection */}
          <div className="mb-4">
            <label className="text-sm text-white/70 block mb-2">
              Kategori
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onUpdateSettings({ categoryId: cat.id })}
                  className={`p-3 rounded-xl text-left transition-all ${
                    settings.categoryId === cat.id
                      ? "bg-white/30 border-2 border-white"
                      : "bg-white/10 border-2 border-transparent hover:bg-white/20"
                  }`}
                >
                  <span className="text-lg">{cat.emoji}</span>
                  <span className="ml-2 text-white text-sm font-medium">
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
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    settings.turnDuration === duration
                      ? "bg-white/30 border-2 border-white"
                      : "bg-white/10 border-2 border-transparent hover:bg-white/20"
                  }`}
                >
                  <span className="text-white font-medium">{duration}s</span>
                </button>
              ))}
            </div>
          </div>

          {/* Turn order */}
          <div className="mb-4">
            <label className="text-sm text-white/70 block mb-2">
              Tur-rækkefølge
            </label>
            <div className="flex gap-2">
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
                  className={`flex-1 py-2 px-3 rounded-xl transition-all ${
                    settings.turnOrderMode === id
                      ? "bg-white/30 border-2 border-white"
                      : "bg-white/10 border-2 border-transparent hover:bg-white/20"
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="ml-1 text-white text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Settings display for non-host */}
      {!isHost && settings.categoryId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20"
        >
          <p className="text-white/70 text-center">
            Venter på at værten starter spillet...
          </p>
          <div className="flex justify-center gap-4 mt-3 text-white">
            <span>
              {categories.find((c) => c.id === settings.categoryId)?.emoji}{" "}
              {categories.find((c) => c.id === settings.categoryId)?.name}
            </span>
            <span>⏱️ {settings.turnDuration}s</span>
          </div>
        </motion.div>
      )}

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md space-y-3"
      >
        {isHost && (
          <motion.button
            onClick={onStartGame}
            disabled={!canStart}
            whileHover={canStart ? { scale: 1.02 } : {}}
            whileTap={canStart ? { scale: 0.98 } : {}}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
              canStart
                ? "bg-white text-purple-600 hover:shadow-xl"
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
          className="w-full py-3 rounded-2xl bg-white/10 text-white font-medium border border-white/20 hover:bg-white/20 transition-all"
        >
          Forlad rum
        </motion.button>
      </motion.div>
    </div>
  );
}
