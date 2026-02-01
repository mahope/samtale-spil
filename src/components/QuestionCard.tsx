"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Question } from "@/types";
import { ShareButton } from "@/components/ShareButton";
import { FavoriteButton } from "@/components/FavoriteButton";
import { DepthIndicator } from "@/components/DepthBadge";

interface QuestionCardProps {
  question: Question;
  categoryName: string;
  isFlipped: boolean;
  onFlip: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

/**
 * Interactive 3D flip card for displaying questions.
 * Features smooth flip animation, depth indicator, and action buttons.
 */
export function QuestionCard({
  question,
  categoryName,
  isFlipped,
  onFlip,
  isFavorite,
  onToggleFavorite,
}: QuestionCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="perspective-1000 w-full max-w-[320px] sm:max-w-sm mx-auto px-2 sm:px-0">
      <motion.div
        className="relative w-full h-[320px] xs:h-[360px] sm:h-[400px] lg:h-[440px] cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/50 rounded-3xl touch-manipulation"
        onClick={onFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onFlip();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? `Spørgsmål: ${question.text}. Tryk for at vende kortet` : "Tryk for at se spørgsmålet"}
        aria-pressed={isFlipped}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card (hidden question) */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
          aria-hidden={isFlipped}
        >
          <div className="w-full h-full bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-white/20 flex flex-col items-center justify-center p-6 sm:p-8">
            <motion.div
              animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
              transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 2 }}
              className="text-5xl sm:text-7xl mb-4 sm:mb-6"
              aria-hidden="true"
            >
              🎴
            </motion.div>
            <p className="text-white text-lg sm:text-xl font-medium text-center">
              Tryk for at se spørgsmålet
            </p>
            <motion.div
              className="mt-4 flex gap-1"
              animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
              transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 1.5 }}
              aria-hidden="true"
            >
              <span className="text-white/60">•</span>
              <span className="text-white/60">•</span>
              <span className="text-white/60">•</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Back of card (question revealed) */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          aria-hidden={!isFlipped}
        >
          <div className="w-full h-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-5 sm:p-8 relative">
            {/* Top bar with depth, share and favorite */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-center">
              <DepthIndicator depth={question.depth} />
              <div className="flex items-center gap-0.5 sm:gap-1">
                <ShareButton 
                  text={question.text} 
                  categoryName={categoryName}
                />
                <FavoriteButton
                  isFavorite={isFavorite}
                  onToggle={onToggleFavorite}
                />
              </div>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-800 dark:text-slate-100 text-xl sm:text-2xl font-medium text-center leading-relaxed px-2"
            >
              {question.text}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
