"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ShareButton } from "@/components/ShareButton";
import { DepthPips, depthLabel } from "@/components/deck/DeckParts";
import { getDeck, markColorOnWhite } from "@/data/decks";
import { useFavorites, type FavoriteQuestion } from "@/hooks/useLocalStorage";
import { intlDeckById } from "@/intl/data";

const deckName = (id: string) => intlDeckById.get(id)?.name ?? (id === "joker" ? "Joker" : "Goodtalk");

function FavoriteCard({ favorite, onRemove }: { favorite: FavoriteQuestion; onRemove: () => void }) {
  const deck = getDeck(favorite.categoryId);
  const mark = markColorOnWhite(deck);
  const name = deckName(favorite.categoryId);
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -60 }}
      className="relative overflow-hidden rounded-2xl bg-flade p-5 pl-6 shadow-kort ring-1 ring-streg"
    >
      <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: deck.bg }} aria-hidden="true" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-blaek-2">
          <span style={{ color: mark }} className="font-display text-base font-extrabold">{deck.mark}</span>
          <span>{name}</span>
          <span aria-hidden="true" className="text-streg">|</span>
          <DepthPips depth={favorite.depth} color={mark} />
          <span aria-hidden="true">{depthLabel(favorite.depth)}</span>
        </div>
        <div className="-mr-2 -mt-2 flex items-center">
          <ShareButton text={favorite.text} categoryName={name} />
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-rose-500"
            aria-label={`Remove "${favorite.text.substring(0, 30)}..." from favorites`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="font-display mt-2 text-xl font-semibold leading-snug">{favorite.text}</p>
      <p className="mt-4 border-t border-streg pt-3 text-sm text-blaek-2">
        <time dateTime={new Date(favorite.savedAt).toISOString()}>
          Saved {new Date(favorite.savedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
        </time>
      </p>
    </motion.li>
  );
}

/** The Goodtalk app's Favorites tab: the cards saved with the heart, newest first */
export function FavoritesList() {
  const { favorites, removeFavorite, isLoaded } = useFavorites();
  const sorted = [...favorites].sort((a, b) => b.savedAt - a.savedAt);
  return (
    <>
      <p className="text-lg text-blaek-2" aria-live="polite">
        {!isLoaded
          ? "Loading your saved cards"
          : favorites.length === 0
            ? "You haven't saved any cards yet."
            : `${favorites.length} saved ${favorites.length === 1 ? "card" : "cards"}. They stay on this device.`}
      </p>
      {isLoaded && favorites.length === 0 && (
        <div className="mt-8 rounded-2xl bg-flade p-6 ring-1 ring-streg">
          <p>Tap the heart on a card while you play, and it ends up here. Good for the questions you want to come back to.</p>
          <Link href="/" className="mt-5 inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek">
            Choose a deck
          </Link>
        </div>
      )}
      {isLoaded && sorted.length > 0 && (
        <motion.ul layout className="mt-8 space-y-4">
          <AnimatePresence>
            {sorted.map((f) => (
              <FavoriteCard key={f.id} favorite={f} onRemove={() => removeFavorite(f.id)} />
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </>
  );
}
