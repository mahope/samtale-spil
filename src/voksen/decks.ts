import { getCategory } from "@/data/categories";
import { adultQuestions } from "@/data/questions/voksne";
import { udfordringer } from "@/data/questions/udfordringer";
import type { Question } from "@/types";

/** A deck in the 18+ app (APP_VARIANT=voksen, issue #57) */
export interface VoksenDeck {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  /** Where the deck lives on snakkespil.dk, for the share button */
  sharePath: string;
}

const fromCategory = (id: string, description: string): VoksenDeck => {
  const c = getCategory(id)!;
  return { id, name: c.name, description, questions: c.questions, sharePath: `/spoergsmaal/${id}/` };
};

/** Only adult and couple decks: the app has no family, school or kids cards */
export const voksenDecks: VoksenDeck[] = [
  {
    id: "udfordringer",
    name: "Udfordringer",
    description: "Kys, berøring og små opgaver. Kun i appen.",
    questions: udfordringer,
    sharePath: "/",
  },
  {
    id: "voksne",
    name: "Kun for voksne",
    description: "Frække spørgsmål om lyst, fantasier og jer to.",
    questions: adultQuestions,
    sharePath: "/spil/voksne/",
  },
  fromCategory("intimitet", "Nærhed, tillid og det, I sjældent siger højt."),
  fromCategory("parforhold", "Spørgsmål, der bringer jer tættere på hinanden."),
  fromCategory("kend-din-partner", "Hvor godt kender I egentlig hinanden?"),
  fromCategory("foerste-date", "Til de første dates, eller til at genopleve dem."),
];

export const voksenDeckById = new Map(voksenDecks.map((d) => [d.id, d]));
