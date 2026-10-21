"use client";

import dynamic from "next/dynamic";
import type { YearStep } from "./YearInReview";

// Cards are drawn at random, so the run only renders in the browser
const YearInReview = dynamic(() => import("./YearInReview").then((m) => m.YearInReview), {
  ssr: false,
  loading: () => <div className="filt min-h-dvh" />,
});

export function YearInReviewLoader({ steps }: { steps: YearStep[] }) {
  return <YearInReview steps={steps} />;
}
