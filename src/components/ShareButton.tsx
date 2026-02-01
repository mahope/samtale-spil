"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useShare } from "@/hooks/useShare";

interface ShareButtonProps {
  text: string;
  categoryName?: string;
  className?: string;
}

export function ShareButton({ text, categoryName, className = "" }: ShareButtonProps) {
  const { shareQuestion, copied, canShare } = useShare();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await shareQuestion(text, categoryName);
  };

  return (
    <motion.button
      type="button"
      onClick={handleShare}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative focus:ring-2 focus:ring-violet-400 ${className}`}
      aria-label={canShare ? "Del spørgsmål" : "Kopiér spørgsmål til udklipsholder"}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
