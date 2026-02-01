"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Reaction {
  id: string;
  emoji: string;
  playerName: string;
  x: number; // Random horizontal position (0-100%)
}

interface ReactionOverlayProps {
  reactions: Reaction[];
}

export function ReactionOverlay({ reactions }: ReactionOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {reactions.map((reaction) => (
          <motion.div
            key={reaction.id}
            initial={{ y: 100, opacity: 0, scale: 0.5 }}
            animate={{ y: -200, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute bottom-0"
            style={{ left: `${reaction.x}%` }}
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl" aria-hidden="true">{reaction.emoji}</span>
              <span className="text-xs text-white/80 bg-black/30 px-2 py-0.5 rounded-full">
                {reaction.playerName}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}