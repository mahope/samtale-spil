"use client";

import dynamic from "next/dynamic";

// The cards are drawn at random, so the run only renders in the browser
const Trappen = dynamic(() => import("./Trappen").then((m) => m.Trappen), {
  ssr: false,
  loading: () => <div className="filt min-h-dvh" />,
});

export function TrappenLoader() {
  return <Trappen />;
}
