"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { DifficultyFilter } from "@/hooks/useLocalStorage";

interface DifficultyFilterProps {
  filter: DifficultyFilter;
  onFilterChange: (filter: DifficultyFilter) => void;
  questionCount: number;
  totalCount: number;
  className?: string;
}

const filterOptions: { value: DifficultyFilter; label: string; color: string; emoji: string }[] = [
  { value: "alle", label: "Alle", color: "bg-slate-500", emoji: "🎯" },
  { value: "let", label: "Let", color: "bg-green-500", emoji: "🌱" },
  { value: "medium", label: "Medium", color: "bg-yellow-500", emoji: "🔥" },
  { value: "dyb", label: "Dyb", color: "bg-red-500", emoji: "🌊" },
];

export function DifficultyFilter({
  filter,
  onFilterChange,
  questionCount,
  totalCount,
  className = "",
}: DifficultyFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = filterOptions.find((o) => o.value === filter) || filterOptions[0];
  const isFiltered = filter !== "alle";

  return (
    <div className={`relative ${className}`}>
      {/* Filter Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-sm transition-colors focus:ring-2 focus:ring-white/50 ${
          isFiltered 
            ? "bg-white/20 text-white" 
            : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white"
        }`}
        aria-label={`Sværhedsgrad filter: ${currentOption.label}. ${questionCount} af ${totalCount} spørgsmål`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
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
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
          />
        </svg>
        <span className="text-sm font-medium hidden sm:inline">{currentOption.label}</span>
        
        {/* Active filter indicator */}
        {isFiltered && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute -top-1 -right-1 w-3 h-3 ${currentOption.color} rounded-full border-2 border-white/50`}
            aria-hidden="true"
          />
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute right-0 top-full mt-2 z-50 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              role="listbox"
              aria-label="Vælg sværhedsgrad"
            >
              <div className="p-2">
                <p className="text-xs text-slate-500 dark:text-slate-400 px-3 py-2 font-medium uppercase tracking-wide">
                  Filtrer efter sværhedsgrad
                </p>
                
                {filterOptions.map((option) => {
                  const isSelected = filter === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        onFilterChange(option.value);
                        setIsOpen(false);
                      }}
                      whileHover={{ x: 4 }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                        isSelected
                          ? "bg-slate-100 dark:bg-slate-700"
                          : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span className="text-xl" aria-hidden="true">{option.emoji}</span>
                      <div className="flex-1 text-left">
                        <p className={`font-medium ${
                          isSelected 
                            ? "text-slate-900 dark:text-white" 
                            : "text-slate-700 dark:text-slate-300"
                        }`}>
                          {option.label}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {option.value === "let" && "Lette samtalestartere"}
                          {option.value === "medium" && "Mere personlige spørgsmål"}
                          {option.value === "dyb" && "Dybe, betydningsfulde samtaler"}
                          {option.value === "alle" && "Vis alle sværhedsgrader"}
                        </p>
                      </div>
                      {isSelected && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Question count footer */}
              <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Tilgængelige spørgsmål:
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {questionCount} {isFiltered && `/ ${totalCount}`}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact indicator for showing active filter
export function DifficultyFilterIndicator({
  filter,
  questionCount,
  className = "",
}: {
  filter: DifficultyFilter;
  questionCount: number;
  className?: string;
}) {
  if (filter === "alle") return null;

  const option = filterOptions.find((o) => o.value === filter);
  if (!option) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        filter === "let" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
        filter === "medium" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      } ${className}`}
      role="status"
      aria-label={`Filter aktivt: ${option.label} - ${questionCount} spørgsmål`}
    >
      <span aria-hidden="true">{option.emoji}</span>
      <span>{option.label}</span>
      <span className="opacity-70">({questionCount})</span>
    </motion.div>
  );
}
