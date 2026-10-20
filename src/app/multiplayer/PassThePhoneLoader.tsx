"use client";

import dynamic from "next/dynamic";

// Player names come from localStorage, so the setup screen only renders in the browser
const PassThePhone = dynamic(() => import("./PassThePhone").then((m) => m.PassThePhone), {
  ssr: false,
  loading: () => <div className="filt min-h-dvh" />,
});

export function PassThePhoneLoader() {
  return <PassThePhone />;
}
