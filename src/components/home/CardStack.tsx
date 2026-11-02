"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CardFace } from "@/components/deck/DeckParts";
import type { DrawCard } from "./CardDraw";

/**
 * The animated top card of the hero. Loaded after the page is interactive (see CardDraw), so the
 * motion library is not part of the first-load JavaScript.
 */
export default function CardStack({ card }: { card: DrawCard }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={card.id}
        className="absolute inset-0"
        initial={reduce ? { opacity: 0 } : { x: 60, y: -30, rotate: 10, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: -1, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { x: -80, y: 20, rotate: -14, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <CardFace categoryId={card.categoryId} categoryName={card.categoryName} question={card} className="h-full" />
      </motion.div>
    </AnimatePresence>
  );
}
