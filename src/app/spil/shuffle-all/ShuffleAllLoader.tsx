"use client";

import dynamic from "next/dynamic";

// Progress and custom questions come from localStorage, so the game only renders in the browser
const ShuffleAllClient = dynamic(() => import("./ShuffleAllClient"), {
  ssr: false,
  loading: () => <div className="filt min-h-dvh" />,
});

export function ShuffleAllLoader() {
  return <ShuffleAllClient />;
}
