import type { CSSProperties, ReactNode } from "react";
import { CARD_TYPE_HINT, CARD_TYPE_LABEL } from "@/data/cardTypes";
import Link from "next/link";
import { getDeck, markColorOnWhite, type Deck } from "@/data/decks";
import type { Question } from "@/types";
import { ui } from "@/locale/ui";

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
const DEPTH_LABEL = ui.depth;

/** One to three pips, like the rank on a playing card */
export function DepthPips({ depth, color }: { depth: Question["depth"]; color: string }) {
  const level = DEPTH_LEVEL[depth];
  return (
    <span className="inline-flex items-center gap-1" title={`${ui.depthPrefix}: ${DEPTH_LABEL[depth].toLowerCase()}`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full"
          style={i <= level ? { background: color } : { boxShadow: `inset 0 0 0 1.5px ${color}`, opacity: 0.45 }}
        />
      ))}
      <span className="sr-only">{`${ui.depthPrefix}: ${DEPTH_LABEL[depth].toLowerCase()}`}</span>
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
  question: Pick<Question, "text" | "depth" | "type">;
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
      {question.type && question.type !== "spoergsmaal" && (
        <p className="mx-6 mt-3 self-start rounded-full px-3 py-1 text-sm font-bold" style={{ backgroundColor: deck.bg, color: deck.ink }}>
          {CARD_TYPE_LABEL[question.type]}
          <span className="sr-only">: {CARD_TYPE_HINT[question.type]}</span>
        </p>
      )}
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
  familievenlig,
  headingLevel = "h3",
}: {
  categoryId: string;
  name: string;
  description: string;
  count: number;
  href: string;
  /** Marks the tile for the "Kun familievenlige" filter on /spil/ */
  familievenlig?: boolean;
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  const deck = getDeck(categoryId);
  return (
    <Link
      href={href}
      data-familie={familievenlig === undefined ? undefined : familievenlig ? "ja" : "nej"}
      className="group flex flex-col overflow-hidden rounded-2xl bg-flade shadow-kort ring-1 ring-streg transition-transform duration-150 active:scale-[0.99] motion-safe:hover:-translate-y-0.5"
    >
      <DeckBack categoryId={categoryId} className="relative flex h-24 items-end justify-between px-4 pb-3">
        <span className="font-display text-3xl font-extrabold leading-none">{deck.mark}</span>
        <span className="rounded-full bg-black/15 px-2.5 py-1 text-xs font-bold tabular-nums" style={{ color: deck.ink }}>
          {ui.deck.cards(count)}
        </span>
      </DeckBack>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <Heading className="text-lg font-bold leading-snug group-hover:underline">{name}</Heading>
        <p className="mt-1 text-[0.95rem] leading-snug text-blaek-2">{description}</p>
      </div>
    </Link>
  );
}

/**
 * A deck as a standing card box for the app's shelves: the patterned back with the mark and
 * the count, the name under it. Large tap target, no hover.
 */
export function DeckBox({
  categoryId,
  name,
  count,
  href,
  familievenlig,
}: {
  categoryId: string;
  name: string;
  count: number;
  href: string;
  familievenlig?: boolean;
}) {
  const deck = getDeck(categoryId);
  return (
    <Link
      href={href}
      data-familie={familievenlig === undefined ? undefined : familievenlig ? "ja" : "nej"}
      className="app-press group block w-[7.4rem] shrink-0 snap-start select-none"
    >
      <DeckBack
        categoryId={categoryId}
        className="relative flex aspect-[5/7] flex-col items-start justify-between rounded-[14px] p-3 shadow-[0_1px_0_rgb(0_0_0/0.08),0_6px_14px_-8px_rgb(0_0_0/0.45)] ring-1 ring-black/10 transition-transform duration-150 group-active:scale-[0.96]"
      >
        <span className="font-display text-[2.6rem] font-extrabold leading-none">{deck.mark}</span>
        <span className="self-start rounded-full bg-black/15 px-2 py-0.5 text-[11px] font-bold tabular-nums" style={{ color: deck.ink }}>
          {ui.deck.cards(count)}
        </span>
      </DeckBack>
      <span className="mt-2 line-clamp-2 block text-[15px] font-semibold leading-tight">{name}</span>
    </Link>
  );
}
