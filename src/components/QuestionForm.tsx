"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_TAGS } from "@/hooks/useCustomQuestions";
import { DepthSelector } from "@/components/DepthBadge";

// Shake animation for form errors
const shakeAnimation = {
  shake: {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: { duration: 0.5 }
  }
};

interface QuestionFormProps {
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
}

/**
 * Form component for creating and editing custom questions.
 * Features validation, shake animation on errors, and category selection.
 */
export function QuestionForm({
  onSubmit,
  initialValues,
  onCancel,
  submitLabel = "Opret spørgsmål",
  onSuccess,
  onError,
}: QuestionFormProps) {
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
