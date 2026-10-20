"use client";

import dynamic from "next/dynamic";

// Cards are shuffled at random, so the deck only renders in the browser
const LegeKortSpil = dynamic(() => import("./LegeKortSpil").then((m) => m.LegeKortSpil), {
  ssr: false,
  loading: () => <div className="filt min-h-dvh" />,
});

export function LegeKortLoader({ slug }: { slug: string }) {
  return <LegeKortSpil slug={slug} />;
}
