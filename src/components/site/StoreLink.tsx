"use client";

import type { ReactNode } from "react";
import { track } from "@/utils/track";

/** Store link that counts the click as "Butik-klik" with the store as prop */
export function StoreLink({ href, store, className, children }: { href: string; store: "ios" | "android"; className: string; children: ReactNode }) {
  return (
    <a href={href} className={className} onClick={() => track("Butik-klik", { butik: store })}>
      {children}
    </a>
  );
}
