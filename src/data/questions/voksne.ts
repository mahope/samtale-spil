/**
 * Adult/18+ questions for intimate couples
 * These questions are gated behind age verification
 */

import type { Question } from "@/types";

export const ADULT_CATEGORY_ID = "voksne";

export const adultQuestions: Question[] = [
  // Intimate Relationship Questions
  {
    id: "adult-1",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad er den mest romantiske oplevelse, vi har delt sammen?",
    depth: "medium",
  },
  {
    id: "adult-2",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvornår føler du dig mest tiltrukket af mig?",
    depth: "medium",
  },
  {
    id: "adult-3",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad er dit største ønske for vores intimitet?",
    depth: "dyb",
  },
  {
    id: "adult-4",
    categoryId: ADULT_CATEGORY_ID,
    text: "Beskriv en fantasi du gerne vil dele med mig",
    depth: "dyb",
  },
  {
    id: "adult-5",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad får dig til at føle dig mest begæret?",
    depth: "medium",
  },
  {
    id: "adult-6",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvilken side af mig tænder dig mest?",
    depth: "medium",
  },
  {
    id: "adult-7",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad er det vildeste, vi nogensinde har gjort sammen?",
    depth: "let",
  },

  // Spicy Conversation Starters
  {
    id: "adult-8",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvis vi kunne tilbringe en nat hvor som helst - hvor og hvad?",
    depth: "medium",
  },
  {
    id: "adult-9",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad vil du gerne prøve, som vi aldrig har gjort?",
    depth: "dyb",
  },
  {
    id: "adult-10",
    categoryId: ADULT_CATEGORY_ID,
    text: "Beskriv din perfekte romantiske aften med mig",
    depth: "let",
  },
  {
    id: "adult-11",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad er din mest intime drøm om os?",
    depth: "dyb",
  },
  {
    id: "adult-12",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvor er det mest spændende sted, du kunne forestille dig intimitet?",
    depth: "medium",
  },

  // Deep Relationship Questions
  {
    id: "adult-13",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad er dine grænser, og hvordan kan jeg respektere dem bedre?",
    depth: "dyb",
  },
  {
    id: "adult-14",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvordan vil du gerne blive rørt og elsket?",
    depth: "dyb",
  },
  {
    id: "adult-15",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad betyder fysisk intimitet for dig i vores forhold?",
    depth: "dyb",
  },
  {
    id: "adult-16",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvornår føler du dig mest forbundet med mig?",
    depth: "medium",
  },
  {
    id: "adult-17",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad er dit mest sårbare øjeblik med mig?",
    depth: "dyb",
  },

  // Playful & Flirty
  {
    id: "adult-18",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvis vi mødtes i dag for første gang - ville du falde for mig?",
    depth: "let",
  },
  {
    id: "adult-19",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad var det første, du lagde mærke til ved mig?",
    depth: "let",
  },
  {
    id: "adult-20",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad er dit bedste minde af os to alene?",
    depth: "medium",
  },

  // Bonus questions for more depth
  {
    id: "adult-21",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad er den mest overraskende ting, jeg har gjort, der tændte dig?",
    depth: "medium",
  },
  {
    id: "adult-22",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad savner du mest, når vi er fra hinanden?",
    depth: "medium",
  },
  {
    id: "adult-23",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad ville du gøre, hvis vi havde et helt døgn uden forpligtelser?",
    depth: "let",
  },
  {
    id: "adult-24",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvad er det mest romantiske, nogen nogensinde har sagt til dig?",
    depth: "let",
  },
  {
    id: "adult-25",
    categoryId: ADULT_CATEGORY_ID,
    text: "Hvornår følte du dig sidst virkelig ønsket af mig?",
    depth: "medium",
  },
];

// Category definition for the adult category
export const adultCategory = {
  id: ADULT_CATEGORY_ID,
  name: "Voksne",
  emoji: "🔞",
  description: "Intime spørgsmål kun for voksne par (18+)",
  color: "from-red-600 to-rose-800",
  questions: adultQuestions,
  isAdult: true,
};
