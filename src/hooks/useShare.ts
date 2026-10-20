"use client";

import { useCallback, useState } from "react";
import { TIMING } from "@/constants";
// From the locale module, not config/site: that one counts every card and would pull them all into the bundle
import { site } from "@/locale/site";

const SITE_URL = site.url;
const SITE_NAME = site.name;
import { shareText } from "@/lib/platform";
import { track } from "@/utils/track";

/** Public link; inside the app the page URL is capacitor://localhost, so it is rebuilt on snakkespil.dk. */
function publicUrl(path?: string) {
  if (path) return `${SITE_URL}${path}`;
  if (typeof window === "undefined") return `${SITE_URL}/`;
  return `${SITE_URL}${window.location.pathname}${window.location.search}`;
}

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async (text: string, path?: string) => {
    const result = await shareText(text, publicUrl(path));
    if (result === "kopieret") {
      setCopied(true);
      setTimeout(() => setCopied(false), TIMING.COPY_FEEDBACK);
    }
    if (result !== "afbrudt") track("Del", { måde: result });
    return {
      success: result !== "afbrudt",
      method: result === "delt" ? ("share" as const) : result === "kopieret" ? ("clipboard" as const) : ("cancelled" as const),
    };
  }, []);

  const shareQuestion = useCallback(
    async (questionText: string, categoryName?: string, path?: string) =>
      share(categoryName ? `»${questionText}« (${categoryName}, ${SITE_NAME})` : `»${questionText}« (${SITE_NAME})`, path),
    [share]
  );

  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  return { share, shareQuestion, copied, canShare };
}
