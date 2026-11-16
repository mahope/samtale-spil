import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { AAR_FREMTID, AAR_GAET_FREM, AAR_GAET_TILBAGE, AAR_TILBAGEBLIK } from "@/data/aaretDerGik";
import { yearInReview } from "@/locale/aaret";
import { screens } from "@/locale/screens";
import { intlDeckById } from "@/intl/data";
import { YearInReviewLoader } from "@/intl/YearInReviewLoader";
import type { YearStep } from "@/intl/YearInReview";
import type { Question } from "@/types";

const t = screens.year;

export const metadata: Metadata = appScreenMetadata(t.metaTitle, t.metaDescription);

const local = (cards: Question[]): Question[] => cards.map((q) => ({ ...q, text: yearInReview[q.id] }));
const GUESS = t.guessHint;
const round = (label: string, from: Question[], hint?: string): YearStep[] => [1, 2, 3].map((n) => ({ label: t.card(label, n), from, hint }));

export default function YearInReviewPage() {
  const thanks = (intlDeckById.get("tak")?.questions ?? []).filter((q) => q.depth === "let");
  const steps: YearStep[] = [
    ...round(t.rounds[0], local(AAR_TILBAGEBLIK)),
    ...round(t.rounds[1], local(AAR_GAET_TILBAGE), GUESS),
    ...round(t.rounds[2], local(AAR_FREMTID)),
    ...round(t.rounds[3], local(AAR_GAET_FREM), GUESS),
    { label: t.last, from: thanks },
  ];
  return <YearInReviewLoader steps={steps} />;
}
