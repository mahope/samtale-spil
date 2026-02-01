"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Question } from "@/types";

export interface CustomQuestion extends Question {
  createdAt: number;
  updatedAt: number;
  categoryTag?: string; // Optional tag like 'Parforhold', 'Familie' etc.
}

export interface CustomQuestionsState {
  questions: CustomQuestion[];
}

const DEFAULT_STATE: CustomQuestionsState = {
  questions: [],
};

// Generate unique ID for custom questions
function generateId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function useCustomQuestions() {
  const [state, setState, isLoaded] = useLocalStorage<CustomQuestionsState>(
    "samtale-spil-custom-questions",
    DEFAULT_STATE
  );

  // Add a new custom question
  const addQuestion = useCallback(
    (question: {
      text: string;
      depth: "let" | "medium" | "dyb";
      categoryTag?: string;
    }) => {
      const newQuestion: CustomQuestion = {
        id: generateId(),
        categoryId: "custom",
        text: question.text,
        depth: question.depth,
        categoryTag: question.categoryTag,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));

      return newQuestion.id;
    },
    [setState]
  );

  // Update an existing question
  const updateQuestion = useCallback(
    (
      id: string,
      updates: Partial<{
        text: string;
        depth: "let" | "medium" | "dyb";
        categoryTag?: string;
      }>
    ) => {
      setState((prev) => ({
        ...prev,
        questions: prev.questions.map((q) =>
          q.id === id
            ? { ...q, ...updates, updatedAt: Date.now() }
            : q
        ),
      }));
    },
    [setState]
  );

  // Delete a question
  const deleteQuestion = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        questions: prev.questions.filter((q) => q.id !== id),
      }));
    },
    [setState]
  );

  // Get a specific question by ID
  const getQuestion = useCallback(
    (id: string): CustomQuestion | undefined => {
      return state.questions.find((q) => q.id === id);
    },
    [state.questions]
  );

  // Get all questions
  const questions = useMemo(() => state.questions, [state.questions]);

  // Get questions by category tag
  const getQuestionsByTag = useCallback(
    (tag: string): CustomQuestion[] => {
      return state.questions.filter((q) => q.categoryTag === tag);
    },
    [state.questions]
  );

  // Get questions by depth
  const getQuestionsByDepth = useCallback(
    (depth: "let" | "medium" | "dyb"): CustomQuestion[] => {
      return state.questions.filter((q) => q.depth === depth);
    },
    [state.questions]
  );

  // Stats
  const stats = useMemo(() => {
    const byDepth = {
      let: state.questions.filter((q) => q.depth === "let").length,
      medium: state.questions.filter((q) => q.depth === "medium").length,
      dyb: state.questions.filter((q) => q.depth === "dyb").length,
    };

    const byTag: Record<string, number> = {};
    state.questions.forEach((q) => {
      if (q.categoryTag) {
        byTag[q.categoryTag] = (byTag[q.categoryTag] || 0) + 1;
      }
    });

    return {
      total: state.questions.length,
      byDepth,
      byTag,
    };
  }, [state.questions]);

  // Convert to standard Question format for use in game
  const questionsForGame = useMemo((): Question[] => {
    return state.questions.map((q) => ({
      id: q.id,
      categoryId: "custom",
      text: q.text,
      depth: q.depth,
    }));
  }, [state.questions]);

  return {
    questions,
    questionsForGame,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    getQuestionsByTag,
    getQuestionsByDepth,
    stats,
    isLoaded,
  };
}

// Category tags available for custom questions
export const CATEGORY_TAGS = [
  { id: "parforhold", label: "Parforhold", emoji: "💑" },
  { id: "familie", label: "Familie", emoji: "👨‍👩‍👧‍👦" },
  { id: "venner", label: "Venner", emoji: "👫" },
  { id: "arbejde", label: "Arbejde", emoji: "💼" },
  { id: "personlig", label: "Personlig", emoji: "🧠" },
  { id: "sjov", label: "Sjov", emoji: "😂" },
  { id: "dyb", label: "Dyb", emoji: "🌊" },
  { id: "andet", label: "Andet", emoji: "✨" },
] as const;

export type CategoryTagId = typeof CATEGORY_TAGS[number]["id"];
