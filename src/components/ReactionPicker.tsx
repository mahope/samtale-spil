"use client";

import { motion } from "framer-motion";
import { REACTION_EMOJIS } from "@/types/multiplayer";

interface ReactionPickerProps {
  onReact: (emoji: string) => void;
  disabled?: boolean;
}

export function ReactionPicker({ onReact, disabled }: ReactionPickerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-1 justify-center flex-wrap"
    >
      {REACTION_EMOJIS.map((emoji) => (
        <motion.button
          key={emoji}
          type="button"
          onClick={() => onReact(emoji)}
          disabled={disabled}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-2xl p-1 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
          aria-label={`React with ${emoji}`}
        >
          {emoji}
        </motion.button>
      ))}
    </motion.div>
  );
}