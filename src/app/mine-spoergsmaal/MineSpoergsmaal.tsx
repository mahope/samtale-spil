"use client";

import { type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useCustomQuestions } from "@/hooks/useCustomQuestions";
import { ToastContainer, useToast } from "@/components/Toast";
import { QuestionForm } from "@/components/QuestionForm";
import { EditableQuestionCard } from "@/components/EditableQuestionCard";
import { DepthPips } from "@/components/deck/DeckParts";

/** Write and edit your own cards. Without site (the app) only the body: the app screen has its own bar. */
export function MineSpoergsmaal({ site }: { site?: { header: ReactNode; footer: ReactNode } }) {
  const app = !site;
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
      success("Spørgsmålet er gemt");
    } else {
      success("Kortet er lagt i din bunke");
    }
  };

  const handleFormError = (message: string) => {
    showError(message);
  };

  const handleDelete = (id: string) => {
    deleteQuestion(id);
    success("Kortet er slettet");
  };

  const body = (
    <>
      <p className="mt-3 text-lg text-blaek-2">
        Skriv de spørgsmål, I mangler, og spil med dem som kort. De gemmes kun på denne enhed.
      </p>

      {isLoaded && stats.total > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-flade px-5 py-4 ring-1 ring-streg">
          <span className="font-semibold">
            {stats.total} {stats.total === 1 ? "kort" : "kort"} i din bunke
          </span>
          <span className="flex items-center gap-4 text-sm text-blaek-2">
            {(["let", "medium", "dyb"] as const).map((depth) => (
              <span key={depth} className="flex items-center gap-1.5">
                <DepthPips depth={depth} color="currentColor" />
                <span className="tabular-nums">{stats.byDepth[depth]}</span>
              </span>
            ))}
          </span>
        </div>
      )}

      <section className="mt-10" aria-labelledby="form-overskrift">
        <div className="flex items-center justify-between gap-4">
          <h2 id="form-overskrift" className="text-2xl font-bold">
            {editingId ? "Ret spørgsmålet" : "Skriv et nyt spørgsmål"}
          </h2>
          {!editingId && questions.length > 0 && (
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="min-h-11 rounded px-2 text-sm font-semibold text-blaek-2 underline underline-offset-4 hover:text-blaek"
            >
              {showForm ? "Skjul" : "Vis"}
            </button>
          )}
        </div>

        <AnimatePresence>
          {isLoaded && (showForm || editingId) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden rounded-2xl bg-flade p-5 shadow-kort ring-1 ring-streg sm:p-6"
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
                submitLabel={editingId ? "Gem ændringer" : "Læg i bunken"}
                onSuccess={handleSuccess}
                onError={handleFormError}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="mt-12" aria-labelledby="liste-overskrift">
        <h2 id="liste-overskrift" className="text-2xl font-bold">
          Din bunke{questions.length > 0 && <span className="ml-2 text-base font-normal text-blaek-2">{questions.length} kort</span>}
        </h2>

        {!isLoaded ? (
          <p className="mt-4 text-blaek-2" role="status">Henter dine kort</p>
        ) : questions.length === 0 ? (
          <p className="mt-4 text-blaek-2">Der er ingen kort endnu. Skriv det første ovenfor.</p>
        ) : (
          <motion.div layout className="mt-4 space-y-3">
            <AnimatePresence>
              {[...questions]
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

      {isLoaded && questions.length > 0 && (
        <Link
          href="/spil/custom/"
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek"
        >
          Spil med dine kort
        </Link>
      )}
    </>
  );

  if (app) {
    return (
      <>
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        {body}
      </>
    );
  }

  return (
    <>
      {site.header}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <main id="main-content" className="mx-auto max-w-2xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Dine egne spørgsmål
        </h1>
        {body}
      </main>
      {site.footer}
    </>
  );
}
