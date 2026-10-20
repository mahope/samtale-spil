"use client";

/**
 * Small native helpers that are safe to import everywhere: on the web they fall
 * back to browser APIs or do nothing. Reminder scheduling lives in ./native.ts,
 * which pulls in the question data and is loaded on demand.
 */
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Share } from "@capacitor/share";
import { ui } from "@/locale/ui";

export const isNative = () => Capacitor.isNativePlatform();

export async function tap(strength: "let" | "fast" = "let") {
  if (!isNative()) return;
  try {
    await Haptics.impact({ style: strength === "let" ? ImpactStyle.Light : ImpactStyle.Medium });
  } catch {
    // haptics are a nicety
  }
}

/** Native share sheet in the app, Web Share or clipboard on the web. */
export async function shareText(text: string, url?: string): Promise<"delt" | "kopieret" | "afbrudt"> {
  try {
    if (isNative()) {
      await Share.share({ text, url, dialogTitle: ui.share.dialogTitle });
      return "delt";
    }
    if (navigator.share) {
      await navigator.share({ text, url });
      return "delt";
    }
    await navigator.clipboard.writeText(url ? `${text}\n${url}` : text);
    return "kopieret";
  } catch {
    return "afbrudt";
  }
}
