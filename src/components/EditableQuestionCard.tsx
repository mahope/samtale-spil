"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CustomQuestion, CATEGORY_TAGS } from "@/hooks/useCustomQuestions";
import { DepthBadgeWithEmoji } from "@/components/DepthBadge";

interface EditableQuestionCardProps {
  question: CustomQuestion;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Card component for displaying a custom question with edit and delete actions.
 * Includes inline delete confirmation.
 */
export function EditableQuestionCard({
  question,
  onEdit,
  onDelete,
}: EditableQuestionCardProps) {
  const tagConfig = CATEGORY_TAGS.find((t) => t.id === question.categoryTag);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -60 }}
      className="rounded-2xl bg-flade p-5 shadow-kort ring-1 ring-streg"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {tagConfig && (
            <span className="rounded-full bg-flade-2 px-2 py-0.5 text-xs font-semibold text-blaek">
              {tagConfig.label}
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
            aria-label="Ret spørgsmålet"
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
            aria-label="Slet spørgsmålet"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      <p className="font-display text-xl font-semibold leading-snug">
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
              Vil du slette kortet? Det kan ikke fortrydes.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                type="button"
                className="min-h-11 flex-1 rounded-full px-3 text-sm font-semibold ring-1 ring-streg hover:bg-flade-2"
              >
                Behold
              </button>
              <button
                onClick={onDelete}
                type="button"
                className="min-h-11 flex-1 rounded-full bg-rose-600 px-3 text-sm font-bold text-white hover:bg-rose-700"
              >
                Slet kortet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
