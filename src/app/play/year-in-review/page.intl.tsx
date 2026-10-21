import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { AAR_FREMTID, AAR_GAET_FREM, AAR_GAET_TILBAGE, AAR_TILBAGEBLIK } from "@/data/aaretDerGik";
import { yearInReview } from "@/locales/en/aaret";
import { intlDeckById } from "@/intl/data";
import { YearInReviewLoader } from "@/intl/YearInReviewLoader";
import type { YearStep } from "@/intl/YearInReview";
import type { Question } from "@/types";

export const metadata: Metadata = appScreenMetadata(
  "Year in review: four rounds for New Year's and birthdays",
  "Look back, guess each other's answers, look ahead, and guess again."
);

const en = (cards: Question[]): Question[] => cards.map((q) => ({ ...q, text: yearInReview[q.id] }));
const GUESS = "Whoever reads the card is \"me\". Everyone else guesses first, then hears the real answer.";
const round = (label: string, from: Question[], hint?: string): YearStep[] =>
  [1, 2, 3].map((n) => ({ label: `${label}, card ${n} of 3`, from, hint }));

export default function YearInReviewPage() {
  const thanks = (intlDeckById.get("tak")?.questions ?? []).filter((q) => q.depth === "let");
  const steps: YearStep[] = [
    ...round("Round 1 of 4: the year that was", en(AAR_TILBAGEBLIK)),
    ...round("Round 2 of 4: guess each other's answers", en(AAR_GAET_TILBAGE), GUESS),
    ...round("Round 3 of 4: the year ahead", en(AAR_FREMTID)),
    ...round("Round 4 of 4: guess again", en(AAR_GAET_FREM), GUESS),
    { label: "Last one: a light card to end on", from: thanks },
  ];
  return <YearInReviewLoader steps={steps} />;
}
