"use client";

import { useCallback, useEffect, useState } from "react";
import type { FavoriteQuestion } from "@/hooks/useLocalStorage";

/** Card id -> text in one language, loaded on demand */
export type CardTextLoader = () => Promise<ReadonlyMap<string, string>>;

/**
 * Favourites keep the text they were saved with. In the Snakkespil app, which has a Danish and
 * an English half sharing the same card ids, a favourite saved in the other language is shown in
 * this one. `load` is null on the websites (they keep the saved text), so pass a module-level
 * constant: APP_BASE ? () => import(...) : null, which drops the import from website builds.
 */
export function useCardTexts(load: CardTextLoader | null) {
  const [texts, setTexts] = useState<ReadonlyMap<string, string> | null>(null);
  useEffect(() => {
    if (!load) return;
    let live = true;
    load()
      .then((m) => live && setTexts(m))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [load]);
  return useCallback(
    (f: FavoriteQuestion): FavoriteQuestion => {
      const text = texts?.get(f.id);
      return text && text !== f.text ? { ...f, text } : f;
    },
    [texts]
  );
}
