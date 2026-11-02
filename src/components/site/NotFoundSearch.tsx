"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { track } from "@/utils/track";

// Search pulls in every question; load it only when someone opens it
const SearchOverlay = dynamic(() => import("@/components/SearchOverlay").then((m) => m.SearchOverlay), { ssr: false });

/** Search button for the 404 page; also reports the missing path (without query string). */
export function NotFoundSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read the real address: 404.html is served on the guessed URL, so the router path may be the internal one
    track("404-set", { sti: window.location.pathname });
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-12 items-center rounded-full px-5 font-semibold ring-1 ring-streg hover:bg-flade-2"
      >
        Søg i spørgsmål
      </button>
      {open && <SearchOverlay isOpen={open} onClose={() => setOpen(false)} />}
    </>
  );
}
