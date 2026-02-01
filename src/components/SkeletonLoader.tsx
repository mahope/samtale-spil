"use client";

import { motion } from "framer-motion";

// Shimmer animation for skeleton loaders
const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      repeatType: "loop" as const,
      duration: 1.5,
      ease: "easeInOut" as const,
    },
  },
};

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-slate-200 dark:bg-slate-700 rounded-lg ${className}`}>
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 dark:via-slate-600/50 to-transparent"
        style={{ width: "200%" }}
      />
    </div>
  );
}

// Skeleton for category cards in /spil
export function CategoryCardSkeleton() {
  return (
    <div className="relative w-full aspect-square rounded-3xl bg-slate-200 dark:bg-slate-700 p-6 overflow-hidden">
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/30 dark:via-slate-600/30 to-transparent"
        style={{ width: "200%" }}
      />
      <div className="relative h-full flex flex-col items-center justify-center text-center gap-3">
        <Skeleton className="w-14 h-14 rounded-full" />
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-16 h-3 mt-2" />
      </div>
    </div>
  );
}

// Skeleton for the question card
export function QuestionCardSkeleton({ color = "from-violet-400 to-purple-500" }: { color?: string }) {
  return (
    <div className={`w-full max-w-sm mx-auto h-[400px] rounded-3xl bg-gradient-to-br ${color} p-1`}>
      <div className="w-full h-full bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ width: "200%" }}
        />
        <div className="relative z-10 w-full flex flex-col items-center">
          <Skeleton className="w-16 h-16 rounded-full mb-6 bg-white/30" />
          <Skeleton className="w-3/4 h-6 mb-3 bg-white/30" />
          <Skeleton className="w-1/2 h-4 bg-white/30" />
        </div>
      </div>
    </div>
  );
}

// Skeleton for favorite cards
export function FavoriteCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden relative">
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 dark:via-slate-600/30 to-transparent"
        style={{ width: "200%" }}
      />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-7 h-7 rounded-full" />
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-12 h-5 rounded-full" />
          </div>
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <Skeleton className="w-full h-5 mb-2" />
        <Skeleton className="w-3/4 h-5 mb-4" />
        <Skeleton className="w-24 h-3" />
      </div>
    </div>
  );
}

// Grid of category skeletons
export function CategoryGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto w-full">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <CategoryCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

// List of favorite skeletons
export function FavoriteListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <FavoriteCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}
