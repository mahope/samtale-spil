"use client";

import { useCallback, useState } from "react";
import { TIMING } from "@/constants";

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async (text: string, title?: string) => {
    // Try native Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || "Samtalekort",
          text: text,
          url: window.location.href,
        });
        return { success: true, method: "share" as const };
      } catch (err) {
        // User cancelled or not supported, fall through to clipboard
        if ((err as Error).name === "AbortError") {
          return { success: false, method: "cancelled" as const };
        }
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), TIMING.COPY_FEEDBACK);
      return { success: true, method: "clipboard" as const };
    } catch {
      // Last resort: select and copy
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), TIMING.COPY_FEEDBACK);
        return { success: true, method: "clipboard" as const };
      } catch {
        return { success: false, method: "failed" as const };
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, []);

  const shareQuestion = useCallback(
    async (questionText: string, categoryName?: string) => {
      const shareText = categoryName
        ? `${categoryName}: "${questionText}" - Samtalekort`
        : `"${questionText}" - Samtalekort`;
      return share(shareText, "Samtalekort spørgsmål");
    },
    [share]
  );

  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  return { share, shareQuestion, copied, canShare };
}
