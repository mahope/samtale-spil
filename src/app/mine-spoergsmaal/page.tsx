"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCustomQuestions } from "@/hooks/useCustomQuestions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ToastContainer, useToast } from "@/components/Toast";
import { EmptyState, EmptyStatePresets } from "@/components/EmptyState";
import { QuestionForm } from "@/components/QuestionForm";
import { EditableQuestionCard } from "@/components/EditableQuestionCard";

export default function MineSpoergsmaalPage() {
  const {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    stats,
    isLoaded,
  } = useCustomQuestions();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const { toasts, removeToast, success, error: showError } = useToast();

  const editingQuestion = editingId
    ? questions.find((q) => q.id === editingId)
    : null;

  const handleSubmit = (data: {
    text: string;
    depth: "let" | "medium" | "dyb";
    categoryTag?: string;
  }) => {
    if (editingId) {
      updateQuestion(editingId, data);
      setEditingId(null);
    } else {
      addQuestion(data);
    }
  };

  const handleSuccess = () => {
    if (editingId) {
      success("Spørgsmålet er opdateret! ✏️", "📝");
    } else {
      success("Nyt spørgsmål oprettet! 🎉", "✨");
    }
  };

  const handleFormError = (message: string) => {
    showError(message, "😅");
  };

  const handleDelete = (id: string) => {
    deleteQuestion(id);
    success("Spørgsmålet er slettet", "🗑️");
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-3 border-violet-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      
      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Top row: back + theme toggle */}
          <div className="flex items-center justify-between mb-3 sm:mb-0">
            <Link
              href="/spil"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors py-2 -ml-2 pl-2 pr-3 rounded-xl active:bg-slate-100 dark:active:bg-slate-800 min-h-[44px]"
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
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              <span className="hidden sm:inline">Tilbage</span>
            </Link>

            {/* Desktop: title in center */}
            <h1 className="hidden sm:flex text-2xl font-bold text-slate-800 dark:text-white items-center gap-2">
              <span>✍️</span>
              <span>Mine Spørgsmål</span>
            </h1>

            <ThemeToggle className="text-slate-600 dark:text-slate-400" />
          </div>

          {/* Mobile: title below */}
          <h1 className="sm:hidden text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>✍️</span>
            <span>Mine Spørgsmål</span>
          </h1>
        </motion.header>

        {/* Stats banner */}
        {stats.total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-slate-700 dark:text-slate-200 font-medium text-sm sm:text-base">
                {stats.total} {stats.total === 1 ? "spørgsmål" : "spørgsmål"} oprettet
              </span>
              <div className="flex gap-3 sm:gap-2 text-sm sm:text-xs">
                <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                  <span>🟢</span>
                  <span>{stats.byDepth.let}</span>
                </span>
                <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                  <span>🟡</span>
                  <span>{stats.byDepth.medium}</span>
                </span>
                <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span>🔴</span>
                  <span>{stats.byDepth.dyb}</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Create/Edit form */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <span>✨</span>
              <span>{editingId ? "Rediger spørgsmål" : "Opret nyt spørgsmål"}</span>
            </h2>
            {!editingId && questions.length > 0 && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
              >
                {showForm ? "Skjul formular" : "Vis formular"}
              </button>
            )}
          </div>

          <AnimatePresence>
            {(showForm || editingId) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-700"
              >
                <QuestionForm
                  onSubmit={handleSubmit}
                  initialValues={
                    editingQuestion
                      ? {
                          text: editingQuestion.text,
                          depth: editingQuestion.depth,
                          categoryTag: editingQuestion.categoryTag,
                        }
                      : undefined
                  }
                  onCancel={editingId ? () => setEditingId(null) : undefined}
                  submitLabel={editingId ? "Gem ændringer" : "Opret spørgsmål"}
                  onSuccess={handleSuccess}
                  onError={handleFormError}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Questions list */}
        <section>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span>📋</span>
            <span>Dine spørgsmål</span>
            {questions.length > 0 && (
              <span className="text-sm font-normal text-slate-400">
                ({questions.length})
              </span>
            )}
          </h2>

          {questions.length === 0 ? (
            <EmptyState {...EmptyStatePresets.customQuestions} />
          ) : (
            <motion.div layout className="space-y-4">
              <AnimatePresence>
                {questions
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((question) => (
                    <EditableQuestionCard
                      key={question.id}
                      question={question}
                      onEdit={() => {
                        setEditingId(question.id);
                        setShowForm(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      onDelete={() => handleDelete(question.id)}
                    />
                  ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* Play button if has questions */}
        {questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="/spil/custom"
                className="flex items-center justify-center gap-2 w-full sm:w-auto sm:mx-auto px-6 py-4 sm:py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg active:opacity-80 min-h-[52px]"
              >
                <span>Spil med dine spørgsmål</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        )}

        <div className="h-8" />
      </main>
    </div>
  );
}
