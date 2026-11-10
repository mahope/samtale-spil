"use client";

import { AppFavorites, type FavoritesTexts } from "@/components/app/AppFavorites";

// Favourites saved in the app's Danish half are shown in English
const loadCardTexts = () => import("./cardTexts").then((m) => m.cardTexts);

const texts: FavoritesTexts = {
  loading: "Loading your saved cards",
  empty: "You haven't saved any cards yet.",
  count: (n) => `${n} saved ${n === 1 ? "card" : "cards"}. They stay on this device.`,
  hint: "Tap the heart on a card while you play, and it ends up here. Good for the questions you want to come back to.",
  cta: "Choose a deck",
  remove: (text) => `Remove "${text}..." from favorites`,
  saved: (date) => `Saved ${date}`,
  dateLocale: "en-US",
  otherDeck: "Goodtalk",
};

/** The Favorites tab in the app's English half */
export function Favorites({ deckNames }: { deckNames: Record<string, string> }) {
  return <AppFavorites deckNames={deckNames} playHref="/" texts={texts} cardTexts={loadCardTexts} />;
}
