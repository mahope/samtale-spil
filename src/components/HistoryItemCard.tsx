"use client";

import { motion } from "motion/react";
import { getCategory } from "@/data/categories";
import { getDeck, markColorOnWhite } from "@/data/decks";
import { DepthPips } from "@/components/deck/DeckParts";
import type { HistoryEntry } from "@/hooks/useLocalStorage";

export interface HistoryItemCardProps {
  /** The history entry to display */
  entry: HistoryEntry;
  /** Index for staggered animation delay */
  index: number;
}

/** A card from the history list: the question, its deck, depth and when it was played. */
export function HistoryItemCard({ entry, index }: HistoryItemCardProps) {
  const category = getCategory(entry.categoryId);
  const deck = getDeck(entry.categoryId === "custom" ? "egne" : entry.categoryId);
  const formattedDate = new Date(entry.answeredAt).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index }}
      className="relative overflow-hidden rounded-xl bg-flade p-4 pl-5 ring-1 ring-streg"
    >
      <span className="absolute inset-y-0 left-0 w-1" style={{ background: deck.bg }} aria-hidden="true" />
      <p className="line-clamp-2 leading-snug">{entry.text}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-blaek-2">
        {category && <span>{category.name}</span>}
        <DepthPips depth={entry.depth} color={markColorOnWhite(deck)} />
        <span>{formattedDate}</span>
      </div>
    </motion.div>
  );
}

export default HistoryItemCard;
