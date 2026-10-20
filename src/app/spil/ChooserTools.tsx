"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchOverlay } from "@/components/SearchOverlay";
import { categories } from "@/data/categories";

/** Search and "pick for us": the only interactive parts of the chooser. */
export function ChooserTools() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // "/" opens search, unless the user is typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const pickRandom = () => {
    const c = categories[Math.floor(Math.random() * categories.length)];
    router.push(`/spil/${c.id}/`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-flade px-4 font-semibold ring-1 ring-streg hover:bg-flade-2"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
        </svg>
        Søg i spørgsmål
      </button>
      <button
        type="button"
        onClick={pickRandom}
        className="inline-flex min-h-11 items-center rounded-full bg-flade px-4 font-semibold ring-1 ring-streg hover:bg-flade-2"
      >
        Vælg for os
      </button>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
