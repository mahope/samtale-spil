"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface MultiplayerJoinProps {
  onCreateRoom: (playerName: string) => void;
  onJoinRoom: (roomCode: string, playerName: string) => boolean;
  error: string | null;
  isLoading: boolean;
}

export function MultiplayerJoin({
  onCreateRoom,
  onJoinRoom,
  error,
  isLoading,
}: MultiplayerJoinProps) {
  const [mode, setMode] = useState<"select" | "create" | "join">("select");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleCreate = useCallback(() => {
    if (!playerName.trim()) {
      setLocalError("Indtast dit navn");
      return;
    }
    onCreateRoom(playerName.trim());
  }, [playerName, onCreateRoom]);

  const handleJoin = useCallback(() => {
    if (!playerName.trim()) {
      setLocalError("Indtast dit navn");
      return;
    }
    if (!roomCode.trim() || roomCode.length !== 4) {
      setLocalError("Rumkode skal være 4 bogstaver");
      return;
    }
    const success = onJoinRoom(roomCode.toUpperCase(), playerName.trim());
    if (!success) {
      setLocalError("Kunne ikke deltage i rummet");
    }
  }, [playerName, roomCode, onJoinRoom]);

  const displayError = error || localError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center px-4 py-8">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-4 left-4"
      >
        <Link
          href="/spil"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tilbage
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          🎮
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-2">Multiplayer</h1>
        <p className="text-white/70">Spil sammen med andre</p>
      </motion.div>

      {/* Mode selection */}
      {mode === "select" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-4"
        >
          <motion.button
            onClick={() => setMode("create")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 hover:bg-white/30 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🏠</span>
              <div>
                <h2 className="text-xl font-bold text-white">Opret rum</h2>
                <p className="text-white/70 text-sm">Start et nyt spil som vært</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setMode("join")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 hover:bg-white/30 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🚪</span>
              <div>
                <h2 className="text-xl font-bold text-white">Deltag i rum</h2>
                <p className="text-white/70 text-sm">Brug en rumkode fra en ven</p>
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Create room form */}
      {mode === "create" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🏠</span> Opret rum
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/70 block mb-2">
                  Dit navn
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                    setLocalError(null);
                  }}
                  placeholder="Indtast dit navn..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  maxLength={20}
                />
              </div>

              {displayError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-300 text-sm"
                >
                  {displayError}
                </motion.p>
              )}

              <motion.button
                onClick={handleCreate}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isLoading ? "Opretter..." : "Opret rum"}
              </motion.button>

              <button
                onClick={() => {
                  setMode("select");
                  setLocalError(null);
                }}
                className="w-full py-2 text-white/70 hover:text-white transition-colors"
              >
                ← Tilbage
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Join room form */}
      {mode === "join" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🚪</span> Deltag i rum
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/70 block mb-2">
                  Dit navn
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                    setLocalError(null);
                  }}
                  placeholder="Indtast dit navn..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  maxLength={20}
                />
              </div>

              <div>
                <label className="text-sm text-white/70 block mb-2">
                  Rumkode
                </label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => {
                    setRoomCode(e.target.value.toUpperCase().slice(0, 4));
                    setLocalError(null);
                  }}
                  placeholder="XXXX"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-center text-2xl font-mono tracking-widest"
                  maxLength={4}
                />
              </div>

              {displayError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-300 text-sm"
                >
                  {displayError}
                </motion.p>
              )}

              <motion.button
                onClick={handleJoin}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isLoading ? "Deltager..." : "Deltag"}
              </motion.button>

              <button
                onClick={() => {
                  setMode("select");
                  setLocalError(null);
                }}
                className="w-full py-2 text-white/70 hover:text-white transition-colors"
              >
                ← Tilbage
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Info about multiplayer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center text-white/60 text-sm max-w-sm"
      >
        <p>
          💡 Multiplayer fungerer mellem browser-faner på samme enhed.
          Del rumkoden for at spille sammen!
        </p>
      </motion.div>
    </div>
  );
}
