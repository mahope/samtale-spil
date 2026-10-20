import { categories } from "@/data/categories";
import type { Category } from "@/types";

export interface DeckGroup {
  id: string;
  title: string;
  /** Category ids in display order */
  decks: string[];
  /** Show the 18+ deck tile at the end of this group */
  withAdult?: boolean;
}

/** Decks grouped by who you are with. Every category belongs to exactly one group (tested). */
export const deckGroups: DeckGroup[] = [
  {
    id: "par",
    title: "Til jer to",
    decks: ["parforhold", "foerste-date", "kend-din-partner", "intimitet", "nyt-og-ukendt", "svaere-samtaler"],
    withAdult: true,
  },
  {
    id: "familie",
    title: "Familien",
    decks: ["familie", "boern", "familiehistorier", "nye-foraeldre", "foraeldre-igen", "barndom", "hoejtider"],
  },
  { id: "venner", title: "Venner, fest og arbejde", decks: ["venner", "sjove", "dilemmaer", "kollegaer"] },
  {
    id: "skole",
    title: "Skole og uddannelse",
    decks: ["indskolingen", "mellemtrinnet", "udskolingen", "efterskolen", "gymnasiet", "studieliv"],
  },
  { id: "spejder", title: "Spejder", decks: ["spejder", "gilwell"] },
  {
    id: "dybt",
    title: "Dybe snakke og dig selv",
    decks: ["dybe", "filosofiske", "selvindsigt", "droemme", "fremtid", "fortid", "tak", "gode-nyheder"],
  },
];

const byId = new Map(categories.map((c) => [c.id, c]));

/** The groups with their categories resolved; unknown ids are skipped */
export function groupedCategories(): (DeckGroup & { categories: Category[] })[] {
  return deckGroups.map((g) => ({
    ...g,
    categories: g.decks.map((id) => byId.get(id)).filter((c): c is Category => Boolean(c)),
  }));
}
