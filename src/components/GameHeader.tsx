"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { Category } from "@/types";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShareProgressButton } from "@/components/ShareProgressButton";
import { ShareButton } from "@/components/ShareButton";
import { StreakBadge } from "@/components/StreakDisplay";
import { TimerSettingsPanel } from "@/components/TimerDisplay";
import { DifficultyFilter } from "@/components/DifficultyFilter";

interface GameHeaderProps {
  category: Category;
  currentStreak: number;
  // Difficulty filter props
  difficultyFilter: "alle" | "let" | "medium" | "dyb";
  onFilterChange: (filter: "alle" | "let" | "medium" | "dyb") => void;
  filteredQuestionCount: number;
  totalQuestionCount: number;
  // Timer props
  timerEnabled: boolean;
  timerDuration: 30 | 60 | 90;
  timerSoundEnabled: boolean;
  timerVibrationEnabled: boolean;
  onTimerToggle: () => void;
  onTimerDurationChange: (duration: 30 | 60 | 90) => void;
  onTimerSoundToggle: () => void;
  onTimerVibrationToggle: () => void;
}

/**
 * Mobile-optimized game header with overflow menu for secondary actions.
 * Shows primary controls (back, filter, timer) always visible.
 * Groups secondary actions (theme, share, favorites) in a menu on mobile.
 */
export function GameHeader({
  category,
  currentStreak,
  difficultyFilter,
  onFilterChange,
  filteredQuestionCount,
  totalQuestionCount,
  timerEnabled,
  timerDuration,
  timerSoundEnabled,
  timerVibrationEnabled,
  onTimerToggle,
  onTimerDurationChange,
  onTimerSoundToggle,
  onTimerVibrationToggle,
}: GameHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mb-8"
    >
      {/* Main header row */}
      <div className="flex items-center justify-between gap-2">
        {/* Back button */}
        <Link
          href="/spil"
          className="inline-flex items-center gap-1.5 text-white/90 hover:text-white transition-colors focus:ring-2 focus:ring-white/50 rounded-lg p-2 -ml-2 min-w-[44px] min-h-[44px] shrink-0"
          aria-label="Tilbage til kategorioversigt"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          <span className="hidden md:inline text-sm font-medium">Tilbage</span>
        </Link>

        {/* Category info - centered, truncates on small screens */}
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-center">
          <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">{category.emoji}</span>
          <h1 className="text-white font-semibold text-sm sm:text-base truncate">
            {category.name}
          </h1>
          {currentStreak > 0 && (
            <div className="hidden xs:block shrink-0">
              <StreakBadge />
            </div>
          )}
        </div>

        {/* Actions row */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Always visible: Filter + Timer */}
          <DifficultyFilter
            filter={difficultyFilter}
            onFilterChange={onFilterChange}
            questionCount={filteredQuestionCount}
            totalCount={totalQuestionCount}
          />
          
          <TimerSettingsPanel
            isEnabled={timerEnabled}
            duration={timerDuration}
            soundEnabled={timerSoundEnabled}
            vibrationEnabled={timerVibrationEnabled}
            onToggle={onTimerToggle}
            onDurationChange={onTimerDurationChange}
            onSoundToggle={onTimerSoundToggle}
            onVibrationToggle={onTimerVibrationToggle}
          />
          
          {/* Desktop: Show all actions inline */}
          <div className="hidden md:flex items-center gap-1">
            <ThemeToggle className="text-white" />
            <ShareButton 
              category={category}
              type="category"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/90 hover:text-white transition-colors"
            />
            <ShareProgressButton className="text-white/90 hover:text-white" />
            <Link
              href="/favoritter"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/90 hover:text-white transition-colors focus:ring-2 focus:ring-white/50"
              aria-label="Se dine gemte favoritter"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile: Overflow menu button */}
          <div className="relative md:hidden" ref={menuRef}>
            <motion.button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl backdrop-blur-sm text-white/90 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                isMenuOpen ? "bg-white/30" : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label="Flere muligheder"
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                  />
                  
                  {/* Menu panel */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                    role="menu"
                  >
                    {/* Menu items */}
                    <div className="p-2">
                      {/* Favoritter */}
                      <Link
                        href="/favoritter"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                        role="menuitem"
                      >
                        <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                          <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-slate-800 dark:text-slate-100 font-medium">Favoritter</p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">Se gemte spørgsmål</p>
                        </div>
                      </Link>

                      {/* Statistik */}
                      <Link
                        href="/statistik"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                        role="menuitem"
                      >
                        <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                          <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-slate-800 dark:text-slate-100 font-medium">Statistik</p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">Se dit fremskridt</p>
                        </div>
                      </Link>

                      {/* Divider */}
                      <div className="my-2 border-t border-slate-200 dark:border-slate-700" />

                      {/* Theme toggle */}
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-slate-700 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-500 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <p className="text-slate-800 dark:text-slate-100 font-medium">Tema</p>
                        </div>
                        <ThemeToggle className="" />
                      </div>

                      {/* Del kategori */}
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                          </div>
                          <p className="text-slate-800 dark:text-slate-100 font-medium">Del</p>
                        </div>
                        <ShareButton 
                          category={category}
                          type="category"
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
