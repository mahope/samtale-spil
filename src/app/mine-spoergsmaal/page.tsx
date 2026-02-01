"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  useCustomQuestions,
  CustomQuestion,
  CATEGORY_TAGS,
} from "@/hooks/useCustomQuestions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ToastContainer, useToast } from "@/components/Toast";
import { DepthSelector, DepthBadgeWithEmoji, DEPTH_CONFIG, type DepthLevel } from "@/components/DepthBadge";

// Shake animation for form errors
const shakeAnimation = {
  shake: {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: { duration: 0.5 }
  }
};

// Question form component
function QuestionForm({
  onSubmit,
  initialValues,
  onCancel,
  submitLabel = "Opret spørgsmål",
  onSuccess,
  onError,
}: {
  onSubmit: (data: {
    text: string;
    depth: "let" | "medium" | "dyb";
    categoryTag?: string;
  }) => void;
  initialValues?: {
    text: string;
    depth: "let" | "medium" | "dyb";
    categoryTag?: string;
  };
  onCancel?: () => void;
  submitLabel?: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}) {
  const [text, setText] = useState(initialValues?.text || "");
  const [depth, setDepth] = useState<"let" | "medium" | "dyb">(
    initialValues?.depth || "medium"
  );
  const [categoryTag, setCategoryTag] = useState(
    initialValues?.categoryTag || ""
  );
  const [error, setError] = useState<string | null>(null);
  const [shouldShake, setShouldShake] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Character count helpers
  const charCount = text.length;
  const isNearLimit = charCount >= 450;
  const isOverLimit = charCount > 500;
  const isTooShort = text.trim().length > 0 && text.trim().length < 10;

  const triggerShake = () => {
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim().length < 10) {
      setError("Spørgsmålet skal være mindst 10 tegn");
      triggerShake();
      onError?.("Spørgsmålet skal være mindst 10 tegn");
      textareaRef.current?.focus();
      return;
    }
    
    if (text.trim().length > 500) {
      setError("Spørgsmålet må højst være 500 tegn");
      triggerShake();
      onError?.("Spørgsmålet må højst være 500 tegn");
      return;
    }

    onSubmit({
      text: text.trim(),
      depth,
      categoryTag: categoryTag || undefined,
    });

    // Reset form if not editing
    if (!initialValues) {
      setText("");
      setDepth("medium");
      setCategoryTag("");
    }
    setError(null);
    onSuccess?.();
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      variants={shakeAnimation}
      animate={shouldShake ? "shake" : undefined}
    >
      {/* Question text */}
      <div>
        <label
          htmlFor="question-text"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          Dit spørgsmål
        </label>
        <motion.div
          animate={error ? { 
            boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0)", "0 0 0 4px rgba(239, 68, 68, 0.3)", "0 0 0 0 rgba(239, 68, 68, 0)"]
          } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-xl"
        >
          <textarea
            ref={textareaRef}
            id="question-text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Skriv dit samtalespørgsmål her..."
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:border-transparent transition-all resize-none ${
              error 
                ? "border-red-400 dark:border-red-500 focus:ring-red-400" 
                : "border-slate-200 dark:border-slate-700 focus:ring-violet-400"
            }`}
            required
          />
        </motion.div>
        <div className="flex justify-between items-center mt-1.5">
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-red-500 text-xs flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </motion.p>
            )}
            {!error && isTooShort && isFocused && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-amber-500 text-xs flex items-center gap-1"
              >
                <span>Mindst 10 tegn ({10 - text.trim().length} mangler)</span>
              </motion.p>
            )}
          </AnimatePresence>
          <motion.p 
            className={`text-xs ml-auto font-medium transition-colors ${
              isOverLimit 
                ? "text-red-500" 
                : isNearLimit 
                  ? "text-amber-500" 
                  : "text-slate-400"
            }`}
            animate={isOverLimit ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {charCount}/500
          </motion.p>
        </div>
      </div>

      {/* Depth selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Dybde
        </label>
        <DepthSelector value={depth} onChange={setDepth} />
      </div>

      {/* Category tag */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Kategori (valgfrit)
        </label>
        <div className="flex flex-wrap gap-2">
          <motion.button
            type="button"
            onClick={() => setCategoryTag("")}
            whileTap={{ scale: 0.95 }}
            className={`py-2 px-3.5 rounded-full text-sm font-medium transition-all min-h-[40px] ${
              categoryTag === ""
                ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 active:bg-slate-300 dark:active:bg-slate-500"
            }`}
          >
            Ingen
          </motion.button>
          {CATEGORY_TAGS.map((tag) => (
            <motion.button
              key={tag.id}
              type="button"
              onClick={() => setCategoryTag(tag.id)}
              whileTap={{ scale: 0.95 }}
              className={`py-2 px-3.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 min-h-[40px] ${
                categoryTag === tag.id
                  ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 active:bg-slate-300 dark:active:bg-slate-500"
              }`}
            >
              <span>{tag.emoji}</span>
              <span className="hidden sm:inline">{tag.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <div className="flex gap-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
          >
            Annuller
          </button>
        )}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 px-4 rounded-xl font-medium bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
        >
          {submitLabel}
        </motion.button>
      </div>
    </motion.form>
  );
}

// Question card component
function QuestionCard({
  question,
  onEdit,
  onDelete,
}: {
  question: CustomQuestion;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const tagConfig = CATEGORY_TAGS.find((t) => t.id === question.categoryTag);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <InteractiveCard
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      glowColor="violet"
      hover={true}
      press={false}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {tagConfig && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <span>{tagConfig.emoji}</span>
              <span>{tagConfig.label}</span>
            </span>
          )}
          <DepthBadgeWithEmoji depth={question.depth} />
        </div>
        <div className="flex items-center gap-1 -mr-1">
          <motion.button
            type="button"
            onClick={onEdit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 sm:p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors active:bg-slate-200 dark:active:bg-slate-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Rediger spørgsmål"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 sm:p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 text-red-400 hover:text-red-500 transition-colors active:bg-red-100 dark:active:bg-red-900/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Slet spørgsmål"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      <p className="text-slate-800 dark:text-slate-100 text-lg leading-relaxed">
        {question.text}
      </p>

      <p className="text-slate-400 dark:text-slate-500 text-xs mt-3">
        Oprettet {new Date(question.createdAt).toLocaleDateString("da-DK", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>

      {/* Delete confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Er du sikker på du vil slette dette spørgsmål?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              >
                Annuller
              </button>
              <button
                onClick={onDelete}
                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                Ja, slet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </InteractiveCard>
  );
}

// Empty state
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl mb-4"
      >
        ✍️
      </motion.div>
      <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
        Ingen spørgsmål endnu
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
        Opret dit første spørgsmål ovenfor for at komme i gang!
      </p>
    </motion.div>
  );
}

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
            <EmptyState />
          ) : (
            <motion.div layout className="space-y-4">
              <AnimatePresence>
                {questions
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((question) => (
                    <QuestionCard
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
