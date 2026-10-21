"use client";

import { AppFavorites, type FavoritesTexts } from "@/components/app/AppFavorites";

const texts: FavoritesTexts = {
  loading: "Henter dine gemte kort",
  empty: "Du har ikke gemt nogen kort endnu.",
  count: (n) => `${n} ${n === 1 ? "gemt kort" : "gemte kort"}. De ligger kun på telefonen.`,
  hint: "Tryk på hjertet på et kort, mens I spiller, så havner det her. Godt til dem, I vil tage op igen.",
  cta: "Vælg en bunke",
  remove: (text) => `Fjern "${text}..." fra favoritter`,
  saved: (date) => `Gemt ${date}`,
  dateLocale: "da-DK",
  otherDeck: "Snakkespil 18+",
};

/** The 18+ app's Favoritter tab */
export function Favoritter({ deckNames }: { deckNames: Record<string, string> }) {
  return <AppFavorites deckNames={deckNames} playHref="/" texts={texts} />;
}
