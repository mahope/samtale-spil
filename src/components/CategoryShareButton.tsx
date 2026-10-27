"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useSocialShare } from "@/hooks/useSocialShare";
import { Category } from "@/types";
import { logger } from "@/utils/logger";
import { TIMING } from "@/constants";
import { ui } from "@/locale/ui";

/**
 * Shares how far into a deck you are. Kept apart from ShareButton because
 * useSocialShare reads every deck, which the plain share button must not pull in.
 */
export function CategoryShareButton({ category, className = "" }: { category: Category; className?: string }) {
  const { shareCategoryCompletion } = useSocialShare();
  const [shared, setShared] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const result = await shareCategoryCompletion(category);
      if (result.success) {
        setShared(true);
        setTimeout(() => setShared(false), TIMING.SHARE_FEEDBACK);
      }
    } catch (error) {
      logger.error("Error sharing category:", error);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleShare}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full hover:bg-black/5 transition-colors relative ${className}`}
      aria-label={ui.share.category}
    >
      <AnimatePresence mode="wait">
        {shared ? (
          <motion.svg key="check" className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        ) : (
          <motion.svg key="share" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v13"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
