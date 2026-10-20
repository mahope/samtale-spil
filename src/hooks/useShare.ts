"use client";

import { useCallback, useState } from "react";
import { TIMING } from "@/constants";
import { SITE_URL, SITE_NAME } from "@/config/site";
import { shareText } from "@/lib/platform";
import { track } from "@/utils/track";

/** Public link for the current screen; inside the app the page URL is capacitor://localhost. */
function publicUrl() {
  if (typeof window === "undefined") return `${SITE_URL}/`;
  return `${SITE_URL}${window.location.pathname}`;
}

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async (text: string) => {
    const result = await shareText(text, publicUrl());
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
    async (questionText: string, categoryName?: string) =>
      share(categoryName ? `»${questionText}« (${categoryName}, ${SITE_NAME})` : `»${questionText}« (${SITE_NAME})`),
    [share]
  );

  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  return { share, shareQuestion, copied, canShare };
}
