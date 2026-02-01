"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useShare } from "@/hooks/useShare";
import { useSocialShare } from "@/hooks/useSocialShare";
import { Category } from "@/types";
import { logger } from "@/utils/logger";
import { TIMING } from "@/constants";

interface ShareButtonProps {
  text?: string;
  categoryName?: string;
  category?: Category;
  type?: "question" | "category" | "progress";
  className?: string;
}

export function ShareButton({ 
  text, 
  categoryName, 
  category, 
  type = "question", 
  className = "" 
}: ShareButtonProps) {
  const { shareQuestion, copied: questionCopied, canShare } = useShare();
  const { shareCategoryCompletion } = useSocialShare();
  const [categoryShared, setCategoryShared] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (type === "question" && text) {
      await shareQuestion(text, categoryName);
    } else if (type === "category" && category) {
      try {
        const result = await shareCategoryCompletion(category);
        if (result.success) {
          setCategoryShared(true);
          setTimeout(() => setCategoryShared(false), TIMING.SHARE_FEEDBACK);
        }
      } catch (error) {
        logger.error("Error sharing category:", error);
      }
    }
  };

  const copied = type === "question" ? questionCopied : categoryShared;
  const ariaLabel = type === "category" 
    ? "Del kategori-fremskridt" 
    : canShare 
      ? "Del spørgsmål" 
      : "Kopiér spørgsmål til udklipsholder";

  return (
    <motion.button
      type="button"
      onClick={handleShare}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative focus:ring-2 focus:ring-violet-400 ${className}`}
      aria-label={ariaLabel}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.svg
            key="check"
            className="w-6 h-6 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        ) : (
          <motion.svg
            key="share"
            className="w-6 h-6 text-slate-400 dark:text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            aria-hidden="true"
          >
            {type === "category" ? (
              // Chart icon for category sharing
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            ) : (
              // Regular share icon for question sharing
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            )}
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
