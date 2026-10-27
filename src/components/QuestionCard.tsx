"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Question } from "@/types";
import { ShareButton } from "@/components/ShareButton";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CardFace, DeckBack } from "@/components/deck/DeckParts";
import { getDeck } from "@/data/decks";
import { tap } from "@/lib/platform";
import { randomFollowUp } from "@/data/followUps";
import { track } from "@/utils/track";
import { ReportCard } from "@/components/ReportCard";
import { CARD_TYPE_HINT, CARD_TYPE_LABEL } from "@/data/cardTypes";
import { ui } from "@/locale/ui";
import { site } from "@/locale/site";

interface QuestionCardProps {
  question: Question;
  categoryName: string;
  isFlipped: boolean;
  onFlip: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  /** Public path for sharing; defaults to the card in its deck */
  sharePath?: string;
}

/**
 * A playing card: the deck's patterned back until it is turned, then the question.
 */
export const QuestionCard = memo(function QuestionCard({
  question,
  categoryName,
  isFlipped,
  onFlip,
  isFavorite,
  onToggleFavorite,
  sharePath,
}: QuestionCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const deck = getDeck(question.categoryId);
  const [followUp, setFollowUp] = useState<string | null>(null);
  const [flippedOnce, setFlippedOnce] = useState(false);
  const [countdown, setCountdown] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const type = question.type ?? "spoergsmaal";

  // Pointing games: everyone points at the same moment after 3-2-1
  const startCountdown = () => {
    timers.current.forEach(clearTimeout);
    tap();
    const steps = ui.card.countdownSteps;
    timers.current = steps.map((step, i) => setTimeout(() => setCountdown(step), i * 900));
    timers.current.push(setTimeout(() => setCountdown(null), steps.length * 900 + 1500));
    track("Peg nedtælling", { kort: question.id });
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.target !== e.currentTarget) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tap();
        onFlip();
      }
    },
    [onFlip]
  );

  return (
    <div className="perspective-1000 mx-auto w-full max-w-[21rem] sm:max-w-[23rem] pointer-coarse:landscape:sm:max-w-[clamp(12rem,calc((100dvh-25rem)*5/7),23rem)]">
      <motion.div
        className="relative aspect-[5/7] w-full cursor-pointer touch-manipulation rounded-[1.25rem]"
        onClick={() => {
          tap();
          if (isFlipped) {
            // turning the card back stops a running countdown
            timers.current.forEach(clearTimeout);
            setCountdown(null);
          }
          if (!isFlipped && !flippedOnce) {
            setFlippedOnce(true);
            track("Kort vendt", { kort: question.id, kategori: question.categoryId });
          }
          onFlip();
        }}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={
          isFlipped
            ? `${type === "spoergsmaal" ? "" : `${CARD_TYPE_LABEL[type]}: `}${question.text} ${ui.card.flipBack}`
            : ui.card.flip
        }
        aria-pressed={isFlipped}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back: the deck */}
        <div className="backface-hidden absolute inset-0" aria-hidden={isFlipped}>
          <DeckBack
            categoryId={question.categoryId}
            className="flex h-full w-full flex-col items-center justify-center rounded-[1.25rem] p-6 shadow-kort ring-4 ring-inset ring-white/25"
          >
            <span className="font-display text-7xl font-extrabold leading-none" style={{ color: deck.ink }}>
              {deck.mark}
            </span>
            <span className="mt-6 rounded-full bg-black/15 px-4 py-2 text-base font-semibold" style={{ color: deck.ink }}>
              {ui.card.flipHint}
            </span>
          </DeckBack>
        </div>

        {/* Front: the question */}
        <div
          className="backface-hidden absolute inset-0"
          style={{ transform: "rotateY(180deg)" }}
          aria-hidden={!isFlipped}
        >
          <CardFace
            categoryId={question.categoryId}
            categoryName={categoryName}
            question={question}
            className="h-full"
          />
        </div>
      </motion.div>

      {/* Outside the card: a role=button may not contain other controls */}
      <div
        className={`mt-3 flex justify-center gap-2 transition-opacity ${isFlipped ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!isFlipped}
        inert={!isFlipped}
      >
        {type !== "joker" && site.favorites && (
          <span className="rounded-full bg-white text-[#15201b] shadow-kort">
            <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
          </span>
        )}
        {type !== "joker" && (
        <span className="rounded-full bg-white text-[#15201b] shadow-kort">
          <ShareButton
            text={question.text}
            categoryName={categoryName}
            path={sharePath ?? (question.categoryId === "custom" ? undefined : ui.play.cardPath(question.categoryId, question.id))}
          />
        </span>
        )}
        {site.report && question.categoryId !== "custom" && type !== "joker" && <ReportCard questionId={question.id} />}
        {type === "peg" ? (
          <button
            type="button"
            onClick={startCountdown}
            className="min-h-11 rounded-full bg-white px-4 text-[0.95rem] font-bold text-[#15201b] shadow-kort"
          >
            {ui.card.countDown}
          </button>
        ) : type === "spoergsmaal" ? (
        <button
          type="button"
          onClick={() => {
            tap();
            setFollowUp((prev) => randomFollowUp(prev ?? undefined));
            if (!followUp) track("Spørg videre", { kategori: question.categoryId });
          }}
          className="min-h-11 rounded-full bg-white px-4 text-[0.95rem] font-bold text-[#15201b] shadow-kort"
        >
          {ui.card.askMore}
        </button>
        ) : null}
      </div>
      {/* A follow-up question: the second question is often the best one (docs/forskning.md 2.3) */}
      <p
        className={`mx-auto mt-3 min-h-7 max-w-[20rem] text-center font-display text-lg font-semibold text-white transition-opacity ${
          (followUp || countdown || type !== "spoergsmaal") && isFlipped ? "opacity-100" : "opacity-0"
        } ${countdown ? "text-4xl" : ""
        }`}
        aria-live="polite"
      >
        {isFlipped ? (countdown ?? followUp ?? (type !== "spoergsmaal" ? CARD_TYPE_HINT[type] : "")) : ""}
      </p>
    </div>
  );
});

QuestionCard.displayName = "QuestionCard";
