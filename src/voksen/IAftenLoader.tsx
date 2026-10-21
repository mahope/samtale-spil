"use client";

import dynamic from "next/dynamic";
import type { AftenDeck } from "./IAften";

// The card is drawn at random, so it only renders in the browser
const IAften = dynamic(() => import("./IAften").then((m) => m.IAften), {
  ssr: false,
  loading: () => <div className="mx-auto mt-6 aspect-[5/7] max-w-[21rem] rounded-2xl bg-flade-2" />,
});

export function IAftenLoader({ decks }: { decks: AftenDeck[] }) {
  return <IAften decks={decks} />;
}
