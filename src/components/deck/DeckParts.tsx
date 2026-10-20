import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { getDeck, markColorOnWhite, type Deck } from "@/data/decks";
import type { Question } from "@/types";

export function deckStyle(deck: Deck): CSSProperties {
  return { "--deck-bg": deck.bg, "--deck-ink": deck.ink } as CSSProperties;
}

/** Patterned card back in the deck's colours */
export function DeckBack({
  categoryId,
  className = "",
  children,
}: {
  categoryId: string;
  className?: string;
  children?: ReactNode;
}) {
  const deck = getDeck(categoryId);
  return (
    <div className={`monster monster-${deck.pattern} ${className}`} style={deckStyle(deck)}>
      {children}
    </div>
  );
}

const DEPTH_LEVEL = { let: 1, medium: 2, dyb: 3 } as const;
const DEPTH_LABEL = { let: "Let", medium: "Medium", dyb: "Dyb" } as const;

/** One to three pips, like the rank on a playing card */
export function DepthPips({ depth, color }: { depth: Question["depth"]; color: string }) {
  const level = DEPTH_LEVEL[depth];
  return (
    <span className="inline-flex items-center gap-1" title={`Dybde: ${DEPTH_LABEL[depth].toLowerCase()}`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full"
          style={i <= level ? { background: color } : { boxShadow: `inset 0 0 0 1.5px ${color}`, opacity: 0.45 }}
        />
      ))}
      <span className="sr-only">Dybde: {DEPTH_LABEL[depth].toLowerCase()}</span>
    </span>
  );
}

export function depthLabel(depth: Question["depth"]) {
  return DEPTH_LABEL[depth];
}

/**
 * Face of a playing card: deck mark in two corners, the question in the middle.
 * Purely presentational, so both server pages and the game can use it.
 */
export function CardFace({
  categoryId,
  categoryName,
  question,
  className = "",
  size = "lg",
  footer,
}: {
  categoryId: string;
  categoryName: string;
  question: Pick<Question, "text" | "depth">;
  className?: string;
  size?: "md" | "lg";
  footer?: ReactNode;
}) {
  const deck = getDeck(categoryId);
  const mark = markColorOnWhite(deck);
  const textSize =
    size === "lg"
      ? question.text.length > 90
        ? "text-[1.45rem] sm:text-[1.65rem]"
        : "text-[1.65rem] sm:text-[1.95rem]"
      : question.text.length > 90
        ? "text-[1.15rem]"
        : "text-[1.3rem]";
  return (
    <div
      className={`relative flex flex-col rounded-[1.25rem] bg-white text-[#15201b] shadow-kort ring-1 ring-black/5 ${className}`}
    >
      <div className="flex items-start justify-between px-5 pt-4">
        <span className="flex flex-col items-center gap-1.5">
          <span className="font-display text-lg font-extrabold leading-none" style={{ color: mark }}>
            {deck.mark}
          </span>
          <DepthPips depth={question.depth} color={mark} />
        </span>
        <span className="pt-0.5 text-sm font-semibold text-[#4b5a53]">{categoryName}</span>
      </div>
      <p
        className={`font-display flex flex-1 items-center px-6 py-6 font-semibold leading-[1.18] tracking-[-0.015em] ${textSize}`}
        style={{ fontStretch: "92%" }}
      >
        {question.text}
      </p>
      <div className="flex items-end justify-between px-5 pb-4">
        <div className="min-h-8">{footer}</div>
        <span
          className="rotate-180 font-display text-lg font-extrabold leading-none"
          style={{ color: mark }}
          aria-hidden="true"
        >
          {deck.mark}
        </span>
      </div>
    </div>
  );
}

/** A deck shown as a small box of cards: links to the deck's page */
export function DeckTile({
  categoryId,
  name,
  description,
  count,
  href,
}: {
  categoryId: string;
  name: string;
  description: string;
  count: number;
  href: string;
}) {
  const deck = getDeck(categoryId);
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl bg-flade shadow-kort ring-1 ring-streg transition-transform duration-150 active:scale-[0.99] motion-safe:hover:-translate-y-0.5"
    >
      <DeckBack categoryId={categoryId} className="relative flex h-24 items-end justify-between px-4 pb-3">
        <span className="font-display text-3xl font-extrabold leading-none">{deck.mark}</span>
        <span className="rounded-full bg-black/15 px-2.5 py-1 text-xs font-bold tabular-nums" style={{ color: deck.ink }}>
          {count} kort
        </span>
      </DeckBack>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <h3 className="text-lg font-bold leading-snug group-hover:underline">{name}</h3>
        <p className="mt-1 text-[0.95rem] leading-snug text-blaek-2">{description}</p>
      </div>
    </Link>
  );
}
