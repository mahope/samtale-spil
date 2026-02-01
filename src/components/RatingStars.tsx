"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuestionRatings } from "@/hooks/useQuestionRatings";

interface RatingStarsProps {
  questionId: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  onRated?: (rating: number) => void;
  className?: string;
  readOnly?: boolean;
  compact?: boolean;
}

const sizeConfig = {
  sm: { star: "w-5 h-5", text: "text-xs", gap: "gap-0.5" },
  md: { star: "w-6 h-6", text: "text-sm", gap: "gap-1" },
  lg: { star: "w-8 h-8", text: "text-base", gap: "gap-1.5" },
};

export function RatingStars({
  questionId,
  showLabel = true,
  size = "md",
  onRated,
  className = "",
  readOnly = false,
  compact = false,
}: RatingStarsProps) {
  const { getRating, rateQuestion, isRated } = useQuestionRatings();
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [justRated, setJustRated] = useState(false);

  const currentRating = getRating(questionId);
  const displayRating = hoverRating ?? currentRating ?? 0;
  const config = sizeConfig[size];

  const handleRate = useCallback(
    (rating: number) => {
      if (readOnly) return;
      
      rateQuestion(questionId, rating);
      setJustRated(true);
      onRated?.(rating);

      // Reset animation state after delay
      setTimeout(() => setJustRated(false), 1000);
    },
    [questionId, rateQuestion, onRated, readOnly]
  );

  const alreadyRated = isRated(questionId);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Label */}
      {showLabel && !compact && !alreadyRated && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-slate-500 dark:text-slate-400 ${config.text} mb-2`}
        >
          Rate dette spørgsmål
        </motion.p>
      )}

      {/* Stars */}
      <div
        className={`flex ${config.gap}`}
        role="group"
        aria-label={
          readOnly
            ? `Rating: ${currentRating ?? 0} af 5 stjerner`
            : "Rate dette spørgsmål"
        }
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating;
          const isCurrentStar = star === displayRating && hoverRating !== null;

          return (
            <motion.button
              key={star}
              type="button"
              disabled={readOnly}
              onClick={() => handleRate(star)}
              onMouseEnter={() => !readOnly && setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              whileHover={readOnly ? {} : { scale: 1.2 }}
              whileTap={readOnly ? {} : { scale: 0.9 }}
              animate={
                justRated && star <= (currentRating ?? 0)
                  ? {
                      scale: [1, 1.3, 1],
                      rotate: [0, -10, 10, 0],
                    }
                  : {}
              }
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: justRated ? star * 0.05 : 0,
              }}
              className={`${config.star} transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded ${
                readOnly ? "cursor-default" : "cursor-pointer"
              }`}
              aria-label={`${star} ${star === 1 ? "stjerne" : "stjerner"}`}
              aria-pressed={star <= (currentRating ?? 0)}
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill={isFilled ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={isFilled ? 0 : 1.5}
                className={`w-full h-full ${
                  isFilled
                    ? "text-amber-400"
                    : "text-slate-300 dark:text-slate-600"
                }`}
                animate={{
                  fill: isFilled ? "#fbbf24" : "transparent",
                }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </motion.svg>
            </motion.button>
          );
        })}
      </div>

      {/* Rating value display */}
      {!compact && currentRating && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-slate-400 dark:text-slate-500 ${config.text} mt-1`}
        >
          {currentRating}/5
        </motion.p>
      )}

      {/* Thank you message after rating */}
      <AnimatePresence>
        {justRated && (
          <motion.p
            initial={{ opacity: 0, y: 5, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.8 }}
            className={`text-amber-500 ${config.text} mt-1 font-medium`}
          >
            Tak for din rating! ⭐
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact inline version for displaying ratings in lists
export function RatingStarsDisplay({
  questionId,
  size = "sm",
  showValue = true,
  className = "",
}: {
  questionId: string;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}) {
  const { getRating } = useQuestionRatings();
  const rating = getRating(questionId);
  const config = sizeConfig[size];

  if (!rating) return null;

  return (
    <div className={`flex items-center ${config.gap} ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={star <= rating ? 0 : 1.5}
          className={`${config.star} ${
            star <= rating
              ? "text-amber-400"
              : "text-slate-300 dark:text-slate-600"
          }`}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
      {showValue && (
        <span className={`text-slate-500 dark:text-slate-400 ${config.text} ml-1`}>
          ({rating})
        </span>
      )}
    </div>
  );
}

// Rating prompt component that shows only if not yet rated
export function RatingPrompt({
  questionId,
  onRated,
  className = "",
}: {
  questionId: string;
  onRated?: (rating: number) => void;
  className?: string;
}) {
  const { isRated } = useQuestionRatings();

  if (isRated(questionId)) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl ${className}`}
    >
      <RatingStars
        questionId={questionId}
        onRated={onRated}
        showLabel
        size="md"
      />
    </motion.div>
  );
}
