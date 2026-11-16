import type { AppLocaleGamePage } from "../types";
import { gamesA } from "./games/partA";
import { gamesB } from "./games/partB";
import { gamesC } from "./games/partC";
import { gamesD } from "./games/partD";

/** Pratespill's party games, keyed by the Danish /lege/ slug: the same pages and card ids as Goodtalk */
export const localeGames: Record<string, AppLocaleGamePage> = { ...gamesA, ...gamesB, ...gamesC, ...gamesD };
