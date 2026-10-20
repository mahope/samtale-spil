"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useFavorites, FavoriteQuestion } from "@/hooks/useLocalStorage";
import { useQuestionRatings } from "@/hooks/useQuestionRatings";
import { getCategory } from "@/data/categories";
import { getDeck, markColorOnWhite } from "@/data/decks";
import { ShareButton } from "@/components/ShareButton";
import { RatingStars, RatingStarsDisplay } from "@/components/RatingStars";
import { DepthPips, depthLabel } from "@/components/deck/DeckParts";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

/** Name of the deck a favourite came from; custom questions have no category */
function deckFor(categoryId: string) {
  const category = getCategory(categoryId);
  return {
    id: category ? category.id : categoryId === "custom" ? "egne" : categoryId,
    name: category?.name ?? (categoryId === "custom" ? "Dine egne" : categoryId === "voksne" ? "Kun for voksne" : "Ukendt"),
  };
}

function FavoriteCard({ favorite, onRemove }: { favorite: FavoriteQuestion; onRemove: () => void }) {
  const { isRated } = useQuestionRatings();
  const hasRating = isRated(favorite.id);
  const d = deckFor(favorite.categoryId);
  const deck = getDeck(d.id);
  const mark = markColorOnWhite(deck);

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
          <span>{d.name}</span>
          <span aria-hidden="true" className="text-streg">|</span>
          <DepthPips depth={favorite.depth} color={mark} />
          <span aria-hidden="true">{depthLabel(favorite.depth)}</span>
        </div>
        <div className="-mr-2 -mt-2 flex items-center">
          <ShareButton text={favorite.text} categoryName={d.name} />
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-rose-500 hover:bg-black/5"
            aria-label={`Fjern "${favorite.text.substring(0, 30)}..." fra favoritter`}
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

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-streg pt-3 text-sm text-blaek-2">
        <time dateTime={new Date(favorite.savedAt).toISOString()}>
          Gemt{" "}
          {new Date(favorite.savedAt).toLocaleDateString("da-DK", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
        {hasRating ? (
          <RatingStarsDisplay questionId={favorite.id} size="sm" />
        ) : (
          <RatingStars questionId={favorite.id} size="sm" showLabel={false} compact />
        )}
      </div>
    </motion.li>
  );
}

export default function FavoritesPage() {
  const { favorites, removeFavorite, isLoaded } = useFavorites();
  const [filter, setFilter] = useState<string | null>(null);

  const deckIds = [...new Set(favorites.map((f) => f.categoryId))];
  const filteredFavorites = filter ? favorites.filter((f) => f.categoryId === filter) : favorites;
  const sortedFavorites = [...filteredFavorites].sort((a, b) => b.savedAt - a.savedAt);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-2xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Dine favoritter
        </h1>
        <p className="mt-3 text-lg text-blaek-2" aria-live="polite">
          {!isLoaded
            ? "Henter dine gemte kort"
            : favorites.length === 0
              ? "Du har ikke gemt nogen kort endnu."
              : `${favorites.length} ${favorites.length === 1 ? "gemt kort" : "gemte kort"}. De ligger kun på denne enhed.`}
        </p>

        {isLoaded && deckIds.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Vis kort fra">
            {[null, ...deckIds].map((id) => {
              const active = filter === id;
              const label = id === null ? "Alle" : deckFor(id).name;
              return (
                <button
                  type="button"
                  key={id ?? "alle"}
                  onClick={() => setFilter(id)}
                  aria-pressed={active}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 ${
                    active ? "bg-blaek text-papir ring-blaek" : "bg-flade ring-streg hover:bg-flade-2"
                  }`}
                >
                  {id !== null && (
                    <span className="h-3 w-3 rounded-full" style={{ background: getDeck(deckFor(id).id).bg }} aria-hidden="true" />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {isLoaded && favorites.length === 0 && (
          <div className="mt-8 rounded-2xl bg-flade p-6 ring-1 ring-streg">
            <p>
              Tryk på hjertet på et kort, mens I spiller, så havner det her. Godt til de spørgsmål, I vil tage op igen.
            </p>
            <Link
              href="/spil/"
              className="mt-5 inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek"
            >
              Vælg et spil
            </Link>
          </div>
        )}

        {isLoaded && sortedFavorites.length > 0 && (
          <motion.ul layout className="mt-8 space-y-4">
            <AnimatePresence>
              {sortedFavorites.map((favorite) => (
                <FavoriteCard key={favorite.id} favorite={favorite} onRemove={() => removeFavorite(favorite.id)} />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
