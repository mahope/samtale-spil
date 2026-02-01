"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TIMING } from "@/constants";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: number;
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, TIMING.ACHIEVEMENT_DISMISS);
      }, TIMING.TOAST_DURATION);
      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4"
        >
          <motion.div
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl shadow-2xl p-4 border border-amber-300"
            animate={{ 
              boxShadow: [
                "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                "0 20px 25px -5px rgba(245, 158, 11, 0.4)",
                "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="text-3xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity, 
                  repeatDelay: 1 
                }}
              >
                {achievement.emoji}
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium opacity-90">🏆 Præstation låst op!</span>
                </div>
                <h3 className="font-bold text-lg leading-tight">{achievement.title}</h3>
                <p className="text-sm opacity-90 leading-tight">{achievement.description}</p>
              </div>
              <motion.button
                onClick={() => setIsVisible(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Achievement definitions
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_question",
    title: "Første skridt",
    description: "Besvaret dit første spørgsmål",
    emoji: "🌱",
    unlocked: false,
  },
  {
    id: "ten_questions",
    title: "Samtale-explorer",
    description: "Besvaret 10 spørgsmål",
    emoji: "🗺️",
    unlocked: false,
  },
  {
    id: "first_category_complete",
    title: "Kategori-mester",
    description: "Fuldført din første kategori",
    emoji: "🎯",
    unlocked: false,
  },
  {
    id: "fifty_questions",
    title: "Dyb tænker",
    description: "Besvaret 50 spørgsmål",
    emoji: "🧠",
    unlocked: false,
  },
  {
    id: "three_categories_complete",
    title: "Samtale-guru",
    description: "Fuldført 3 kategorier",
    emoji: "🎪",
    unlocked: false,
  },
  {
    id: "hundred_questions",
    title: "Samtalekort-legende",
    description: "Besvaret 100 spørgsmål",
    emoji: "👑",
    unlocked: false,
  },
  {
    id: "all_categories_complete",
    title: "Fuldstændig mester",
    description: "Fuldført alle kategorier",
    emoji: "🏆",
    unlocked: false,
  },
  {
    id: "first_favorite",
    title: "Hjerte-samler",
    description: "Gemt dit første favoritspørgsmål",
    emoji: "❤️",
    unlocked: false,
  },
  {
    id: "ten_favorites",
    title: "Kærligheds-arkiv",
    description: "Gemt 10 favoritspørgsmål",
    emoji: "💕",
    unlocked: false,
  },
  {
    id: "deep_diver",
    title: "Dybhavs-dykker",
    description: "Besvaret 10 'dybe' spørgsmål",
    emoji: "🌊",
    unlocked: false,
  },
];