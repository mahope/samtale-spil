"use client";

import { AppFavorites, type FavoritesTexts } from "@/components/app/AppFavorites";
import { site } from "@/locale/site";
import { screens } from "@/locale/screens";

// Favourites saved in another language of the app are shown in this one
const loadCardTexts = () => import("./cardTexts").then((m) => m.cardTexts);

const texts: FavoritesTexts = { ...screens.favorites, dateLocale: screens.dateLocale, otherDeck: site.name };

/** The Favorites tab in the app's international languages */
export function Favorites({ deckNames }: { deckNames: Record<string, string> }) {
  return <AppFavorites deckNames={deckNames} playHref="/" texts={texts} cardTexts={loadCardTexts} />;
}
