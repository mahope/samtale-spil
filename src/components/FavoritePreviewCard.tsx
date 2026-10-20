"use client";

import { motion } from "motion/react";
import { getCategory } from "@/data/categories";
import { getDeck } from "@/data/decks";
import type { FavoriteQuestion } from "@/hooks/useLocalStorage";

export interface FavoritePreviewCardProps {
  /** The favorite question to display */
  favorite: FavoriteQuestion;
  /** Index for staggered animation delay */
  index: number;
}

/** Short preview of a saved card, marked with its deck colour. */
export function FavoritePreviewCard({ favorite, index }: FavoritePreviewCardProps) {
  const category = getCategory(favorite.categoryId);
  const deck = getDeck(favorite.categoryId === "custom" ? "egne" : favorite.categoryId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="relative overflow-hidden rounded-xl bg-flade p-4 pl-5 ring-1 ring-streg"
    >
      <span className="absolute inset-y-0 left-0 w-1" style={{ background: deck.bg }} aria-hidden="true" />
      <p className="line-clamp-2 leading-snug">{favorite.text}</p>
      {category && <p className="mt-1 text-sm text-blaek-2">{category.name}</p>}
    </motion.div>
  );
}

export default FavoritePreviewCard;
