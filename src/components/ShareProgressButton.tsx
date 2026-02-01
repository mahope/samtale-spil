"use client";

import { motion } from "framer-motion";
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
          className={`flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all ${className}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
            />
          </svg>
          <span>Del mine statistikker</span>
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
        className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative focus:ring-2 focus:ring-violet-400 ${className}`}
        aria-label="Del dine statistikker"
      >
        <svg className="w-6 h-6 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
        {showLabel && (
          <span className="sr-only">Del dine statistikker</span>
        )}
      </motion.button>

      <ShareStatsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}