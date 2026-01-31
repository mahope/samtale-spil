"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import { getCategory } from "@/data/categories";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ categoryId: string }>;
}

export default function CategoryPlayPage({ params }: Props) {
  const { categoryId } = use(params);
  const category = getCategory(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${category.color} relative overflow-hidden`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto"
        >
          <Link
            href="/spil"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
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
            Skift kategori
          </Link>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="text-8xl mb-6"
          >
            {category.emoji}
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
          <p className="text-xl text-white/80 mb-8">{category.description}</p>

          {/* Placeholder for card UI - next agent will build this */}
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <p className="text-white text-lg mb-4">
              🎴 Kortvisning kommer snart...
            </p>
            <p className="text-white/70">
              {category.questions.length} spørgsmål klar
            </p>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 bg-white text-slate-800 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Start spillet
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
