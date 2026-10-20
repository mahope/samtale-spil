/**
 * Achievement definitions, tracked quietly for the statistics. The popup that
 * used to interrupt the game was removed in the Snakkespil redesign.
 */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_question",
    title: "Første skridt",
    description: "Besvaret dit første spørgsmål",
    emoji: "🌱",
    unlocked: false,
  },
  {
    id: "ten_questions",
    title: "Ti kort",
    description: "Besvaret 10 spørgsmål",
    emoji: "🗺️",
    unlocked: false,
  },
  {
    id: "first_category_complete",
    title: "Kategori-mester",
    description: "Fuldført din første kategori",
    emoji: "🎯",
    unlocked: false,
  },
  {
    id: "fifty_questions",
    title: "Dyb tænker",
    description: "Besvaret 50 spørgsmål",
    emoji: "🧠",
    unlocked: false,
  },
  {
    id: "three_categories_complete",
    title: "Tre bunker",
    description: "Fuldført 3 kategorier",
    emoji: "🎪",
    unlocked: false,
  },
  {
    id: "hundred_questions",
    title: "Hundrede kort",
    description: "Besvaret 100 spørgsmål",
    emoji: "👑",
    unlocked: false,
  },
  {
    id: "all_categories_complete",
    title: "Fuldstændig mester",
    description: "Fuldført alle kategorier",
    emoji: "🏆",
    unlocked: false,
  },
  {
    id: "first_favorite",
    title: "Hjerte-samler",
    description: "Gemt dit første favoritspørgsmål",
    emoji: "❤️",
    unlocked: false,
  },
  {
    id: "ten_favorites",
    title: "Kærligheds-arkiv",
    description: "Gemt 10 favoritspørgsmål",
    emoji: "💕",
    unlocked: false,
  },
  {
    id: "deep_diver",
    title: "Dybhavs-dykker",
    description: "Besvaret 10 'dybe' spørgsmål",
    emoji: "🌊",
    unlocked: false,
  },
];