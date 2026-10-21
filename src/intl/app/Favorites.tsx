"use client";

import { AppFavorites, type FavoritesTexts } from "@/components/app/AppFavorites";

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

/** The Goodtalk app's Favorites tab */
export function Favorites({ deckNames }: { deckNames: Record<string, string> }) {
  return <AppFavorites deckNames={deckNames} playHref="/" texts={texts} />;
}
