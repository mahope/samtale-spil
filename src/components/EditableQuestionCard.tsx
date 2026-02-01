"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomQuestion, CATEGORY_TAGS } from "@/hooks/useCustomQuestions";
import { InteractiveCard } from "@/components/InteractiveCard";
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
