"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ShareStatsModal } from "./ShareStatsModal";

interface ShareProgressButtonProps {
  className?: string;
  variant?: "compact" | "full";
  showLabel?: boolean;
}

export function ShareProgressButton({
  className = "",
  variant = "compact",
  showLabel = true
}: ShareProgressButtonProps) {
  const [showModal, setShowModal] = useState(false);

  if (variant === "full") {
    return (
      <>
        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`flex min-h-12 items-center gap-3 rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek ${className}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span>Del jeres spil</span>
        </motion.button>

        <ShareStatsModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  return (
    <>
      <motion.button
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg transition-colors hover:bg-white/10 ${className}`}
        aria-label="Del hvor langt I er nået"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        {showLabel && (
          <span className="sr-only">Del hvor langt I er nået</span>
        )}
      </motion.button>

      <ShareStatsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}