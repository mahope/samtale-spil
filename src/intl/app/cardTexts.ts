/**
 * Every English card text in the app's English half by (Danish) card id: decks, party games and
 * Year in review. Loaded on demand by the Favorites tab (useCardTexts). No Danish text in here.
 */
import { localeDecks } from "@/locale/decks";
import { localeGames } from "@/locale/games";
import { yearInReview } from "@/locales/en/aaret";

export const cardTexts: ReadonlyMap<string, string> = new Map([
  ...Object.values(localeDecks).flatMap((d) => Object.entries(d.cards)),
  ...Object.values(localeGames).flatMap((g) => Object.entries(g.kort)),
  ...Object.entries(yearInReview),
]);
