"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { logger } from "@/utils/logger";
import { STORAGE_KEYS } from "@/constants";

// Generic hook for localStorage with SSR safety.
// Built on useSyncExternalStore: while hydrating, React renders the server snapshot
// (the initial value), so server HTML and the first client render always match;
// right after, it re-renders with the stored value. Outside hydration the stored
// value is read synchronously. Writes notify every hook instance using the key.
const LOCAL_EVENT = "snakkespil-storage";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(LOCAL_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(LOCAL_EVENT, onChange);
  };
}

const subscribeNever = () => () => {};

// Fallback when localStorage throws (private mode, full quota, blocked site data):
// the game keeps working for the session, it just is not remembered.
const memory = new Map<string, string>();

function readRaw(key: string): string | null {
  if (memory.has(key)) return memory.get(key)!;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, raw: string) {
  try {
    window.localStorage.setItem(key, raw);
    memory.delete(key);
  } catch (error) {
    memory.set(key, raw);
    logger.warn(`Error setting localStorage key "${key}":`, error);
  }
  window.dispatchEvent(new Event(LOCAL_EVENT));
}

function parseOr<T>(raw: string | null, fallback: T, key: string): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    logger.warn(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  // The first initial value is kept, so callers may pass literals without
  // producing a new identity on every render
  const [initial] = useState(initialValue);

  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => null
  );
  const isLoaded = useSyncExternalStore(subscribeNever, () => true, () => false);

  const storedValue = useMemo<T>(() => parseOr(raw, initial, key), [raw, key, initial]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      // Read the latest stored value, so two updates in one tick both apply;
      // unreadable data falls back to the initial value and is overwritten
      const current = parseOr(readRaw(key), initial, key);
      const valueToStore = value instanceof Function ? value(current) : value;
      writeRaw(key, JSON.stringify(valueToStore));
    },
    [key, initial]
  );

  return [storedValue, setValue, isLoaded] as const;
}

// Favorites management
export interface FavoriteQuestion {
  id: string;
  categoryId: string;
  text: string;
  depth: "let" | "medium" | "dyb";
  savedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites, isLoaded] = useLocalStorage<FavoriteQuestion[]>(
    STORAGE_KEYS.FAVORITES,
    []
  );

  const addFavorite = useCallback(
    (question: Omit<FavoriteQuestion, "savedAt">) => {
      setFavorites((prev) => {
        if (prev.some((f) => f.id === question.id)) return prev;
        return [...prev, { ...question, savedAt: Date.now() }];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (questionId: string) => {
      setFavorites((prev) => prev.filter((f) => f.id !== questionId));
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (questionId: string) => favorites.some((f) => f.id === questionId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (question: Omit<FavoriteQuestion, "savedAt">) => {
      if (isFavorite(question.id)) {
        removeFavorite(question.id);
      } else {
        addFavorite(question);
      }
    },
    [isFavorite, removeFavorite, addFavorite]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    isLoaded,
  };
}

// Timer settings
export interface TimerSettings {
  enabled: boolean;
  duration: 30 | 60 | 90;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  enabled: false,
  duration: 60,
  soundEnabled: true,
  vibrationEnabled: true,
};

export function useTimerSettings() {
  const [settings, setSettings, isLoaded] = useLocalStorage<TimerSettings>(
    STORAGE_KEYS.TIMER_SETTINGS,
    DEFAULT_TIMER_SETTINGS
  );

  const toggleTimer = useCallback(() => {
    setSettings((prev) => ({ ...prev, enabled: !prev.enabled }));
  }, [setSettings]);

  const setDuration = useCallback(
    (duration: 30 | 60 | 90) => {
      setSettings((prev) => ({ ...prev, duration }));
    },
    [setSettings]
  );

  const toggleSound = useCallback(() => {
    setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, [setSettings]);

  const toggleVibration = useCallback(() => {
    setSettings((prev) => ({ ...prev, vibrationEnabled: !prev.vibrationEnabled }));
  }, [setSettings]);

  return {
    settings,
    toggleTimer,
    setDuration,
    toggleSound,
    toggleVibration,
    isLoaded,
  };
}

// Difficulty filter
export type DifficultyLevel = "let" | "medium" | "dyb";
export type DifficultyFilter = DifficultyLevel | "alle";

export function useDifficultyFilter() {
  const [filter, setFilter, isLoaded] = useLocalStorage<DifficultyFilter>(
    STORAGE_KEYS.DIFFICULTY_FILTER,
    "alle"
  );

  const toggleFilter = useCallback(
    (level: DifficultyFilter) => {
      setFilter(level);
    },
    [setFilter]
  );

  return {
    filter,
    setFilter: toggleFilter,
    isLoaded,
  };
}

// Question History - track recently answered questions
export interface HistoryEntry {
  id: string;
  questionId: string;
  categoryId: string;
  text: string;
  depth: "let" | "medium" | "dyb";
  answeredAt: number;
}

export function useQuestionHistory() {
  const [history, setHistory, isLoaded] = useLocalStorage<HistoryEntry[]>(
    STORAGE_KEYS.QUESTION_HISTORY,
    []
  );

  const addToHistory = useCallback(
    (question: { id: string; categoryId: string; text: string; depth: "let" | "medium" | "dyb" }) => {
      setHistory((prev) => {
        // Don't add duplicate entries for the same question
        const existingIndex = prev.findIndex((h) => h.questionId === question.id);
        const newEntry: HistoryEntry = {
          id: `${question.id}-${Date.now()}`,
          questionId: question.id,
          categoryId: question.categoryId,
          text: question.text,
          depth: question.depth,
          answeredAt: Date.now(),
        };

        // If question exists, update it and move to front
        if (existingIndex !== -1) {
          const updated = prev.filter((h) => h.questionId !== question.id);
          return [newEntry, ...updated].slice(0, 50); // Keep last 50 entries
        }

        // Add new entry at the front, keep max 50
        return [newEntry, ...prev].slice(0, 50);
      });
    },
    [setHistory]
  );

  const getRecentHistory = useCallback(
    (count: number = 10): HistoryEntry[] => {
      return history.slice(0, count);
    },
    [history]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return {
    history,
    addToHistory,
    getRecentHistory,
    clearHistory,
    isLoaded,
  };
}

// Session progress management
export interface CategoryProgress {
  answeredIds: string[];
  lastPlayed: number;
}

export interface SessionProgress {
  [categoryId: string]: CategoryProgress;
}

export function useProgress() {
  const [progress, setProgress, isLoaded] = useLocalStorage<SessionProgress>(
    STORAGE_KEYS.PROGRESS,
    {}
  );

  const markAnswered = useCallback(
    (categoryId: string, questionId: string) => {
      setProgress((prev) => {
        const categoryProgress = prev[categoryId] || { answeredIds: [], lastPlayed: 0 };
        if (categoryProgress.answeredIds.includes(questionId)) return prev;
        
        return {
          ...prev,
          [categoryId]: {
            answeredIds: [...categoryProgress.answeredIds, questionId],
            lastPlayed: Date.now(),
          },
        };
      });
    },
    [setProgress]
  );

  const getCategoryProgress = useCallback(
    (categoryId: string): CategoryProgress => {
      return progress[categoryId] || { answeredIds: [], lastPlayed: 0 };
    },
    [progress]
  );

  const resetCategory = useCallback(
    (categoryId: string) => {
      setProgress((prev) => {
        const { [categoryId]: _, ...rest } = prev;
        return rest;
      });
    },
    [setProgress]
  );

  const resetAll = useCallback(() => {
    setProgress({});
  }, [setProgress]);

  return {
    progress,
    markAnswered,
    getCategoryProgress,
    resetCategory,
    resetAll,
    isLoaded,
  };
}
