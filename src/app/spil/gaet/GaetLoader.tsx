"use client";

import dynamic from "next/dynamic";

// The pile is shuffled at random, so the game only renders in the browser
const GaetSpil = dynamic(() => import("./GaetSpil").then((m) => m.GaetSpil), {
  ssr: false,
  loading: () => <div className="filt min-h-dvh" />,
});

export function GaetLoader() {
  return <GaetSpil />;
}
