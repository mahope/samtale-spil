"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import { useCustomQuestions } from "@/hooks/useCustomQuestions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Question } from "@/types";

interface SearchResult {
  question: Question;
  categoryName: string;
  categoryEmoji: string;
  categoryId: string;
  isCustom: boolean;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Depth display config
const DEPTH_CONFIG = {
  let: { emoji: "🟢", label: "Let", color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
  medium: { emoji: "🟡", label: "Medium", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300" },
  dyb: { emoji: "🔴", label: "Dyb", color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring" as const, damping: 25, stiffness: 300 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: -20,
    transition: { duration: 0.15 }
  },
};

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches, recentLoaded] = useLocalStorage<string[]>(
    "samtale-spil-recent-searches",
    []
  );
  const { questions: customQuestions, isLoaded: customLoaded } = useCustomQuestions();

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Clear query when closing
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  // Build all questions list (categories + custom)
  const allQuestions = useMemo(() => {
    const results: SearchResult[] = [];

    // Add category questions
    categories.forEach((category) => {
      category.questions.forEach((question) => {
        results.push({
          question,
          categoryName: category.name,
          categoryEmoji: category.emoji,
          categoryId: category.id,
          isCustom: false,
        });
      });
    });

    // Add custom questions
    customQuestions.forEach((q) => {
      results.push({
        question: {
          id: q.id,
          categoryId: "custom",
          text: q.text,
          depth: q.depth,
        },
        categoryName: "Mine Spørgsmål",
        categoryEmoji: "✍️",
        categoryId: "custom",
        isCustom: true,
      });
    });

    return results;
  }, [customQuestions]);

  // Search and filter
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase().trim();
    const matches = allQuestions.filter((item) =>
      item.question.text.toLowerCase().includes(lowerQuery)
    );

    // Sort by relevance (starts with query first)
    matches.sort((a, b) => {
      const aStarts = a.question.text.toLowerCase().startsWith(lowerQuery);
      const bStarts = b.question.text.toLowerCase().startsWith(lowerQuery);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

    return matches.slice(0, 20); // Limit to 20 results
  }, [query, allQuestions]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    
    searchResults.forEach((result) => {
      const key = result.categoryId;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(result);
    });

    return groups;
  }, [searchResults]);

  // Save to recent searches
  const saveRecentSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== searchQuery.toLowerCase());
      return [searchQuery, ...filtered].slice(0, 5);
    });
  }, [setRecentSearches]);

  // Handle result click
  const handleResultClick = useCallback((result: SearchResult) => {
    saveRecentSearch(query);
    onClose();
    
    if (result.isCustom) {
      router.push(`/spil/custom?question=${result.question.id}`);
    } else {
      router.push(`/spil/${result.categoryId}?question=${result.question.id}`);
    }
  }, [query, onClose, router, saveRecentSearch]);

  // Handle recent search click
  const handleRecentClick = useCallback((search: string) => {
    setQuery(search);
  }, []);

  // Remove recent search
  const removeRecent = useCallback((search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((s) => s !== search));
  }, [setRecentSearches]);

  const isLoaded = recentLoaded && customLoaded;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
              <svg
                className="w-5 h-5 text-slate-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Søg i alle spørgsmål..."
                className="flex-1 bg-transparent text-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  aria-label="Ryd søgning"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-lg transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results area */}
            <div className="max-h-[60vh] overflow-y-auto">
              {!isLoaded ? (
                <div className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full mx-auto"
                  />
                </div>
              ) : query.trim() ? (
                searchResults.length > 0 ? (
                  <div className="p-2">
                    {Object.entries(groupedResults).map(([categoryId, results]) => (
                      <div key={categoryId} className="mb-4 last:mb-0">
                        {/* Category header */}
                        <div className="px-3 py-2 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                          <span>{results[0].categoryEmoji}</span>
                          <span>{results[0].categoryName}</span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            ({results.length})
                          </span>
                        </div>

                        {/* Results */}
                        {results.map((result) => {
                          const depthConfig = DEPTH_CONFIG[result.question.depth];
                          return (
                            <motion.button
                              key={result.question.id}
                              type="button"
                              onClick={() => handleResultClick(result)}
                              whileHover={{ x: 4 }}
                              className="w-full text-left px-3 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${depthConfig.color}`}
                                >
                                  {depthConfig.emoji} {depthConfig.label}
                                </span>
                                <p className="text-slate-700 dark:text-slate-200 leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                  {result.question.text}
                                </p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <span className="text-4xl mb-3 block">🔍</span>
                    <p className="text-slate-500 dark:text-slate-400">
                      Ingen spørgsmål matcher &quot;{query}&quot;
                    </p>
                  </div>
                )
              ) : (
                <div className="p-4">
                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <div className="mb-4">
                      <div className="px-3 py-2 flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Seneste søgninger
                        </span>
                      </div>
                      {recentSearches.map((search) => (
                        <motion.button
                          key={search}
                          type="button"
                          onClick={() => handleRecentClick(search)}
                          whileHover={{ x: 4 }}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center justify-between group"
                        >
                          <span className="text-slate-600 dark:text-slate-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {search}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => removeRecent(search, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all"
                            aria-label="Fjern fra seneste søgninger"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Quick tip */}
                  <div className="px-3 py-4 text-center text-slate-400 dark:text-slate-500 text-sm">
                    <p>Søg efter ord eller sætninger i spørgsmålene</p>
                    <p className="mt-1 text-xs">
                      {allQuestions.length} spørgsmål i alt ({categories.length} kategorier + mine spørgsmål)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {searchResults.length > 0 && (
              <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>
                  {searchResults.length} {searchResults.length === 1 ? "resultat" : "resultater"}
                </span>
                <span className="text-xs">
                  Klik for at åbne kategorien
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Search button component for the header
export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
      aria-label="Søg i spørgsmål"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span className="hidden sm:inline text-sm font-medium">Søg</span>
      <kbd className="hidden sm:inline text-xs px-1.5 py-0.5 bg-slate-200 dark:bg-slate-600 rounded text-slate-500 dark:text-slate-300">
        /
      </kbd>
    </motion.button>
  );
}
