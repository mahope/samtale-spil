"use client";

/**
 * Small native helpers that are safe to import everywhere: on the web they fall
 * back to browser APIs or do nothing. Reminder scheduling lives in ./native.ts,
 * which pulls in the question data and is loaded on demand.
 */
import { ui } from "@/locale/ui";

// The native shell injects window.Capacitor before the app loads, so the web bundles never need to
// ship @capacitor/core: the plugins below are imported on demand, only inside the apps.
export const isNative = () =>
  typeof window !== "undefined" &&
  !!(window as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.();

export async function tap(strength: "let" | "fast" = "let") {
  if (!isNative()) return;
  try {
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    await Haptics.impact({ style: strength === "let" ? ImpactStyle.Light : ImpactStyle.Medium });
  } catch {
    // haptics are a nicety
  }
}

/** Native share sheet in the app, Web Share or clipboard on the web. */
export async function shareText(text: string, url?: string): Promise<"delt" | "kopieret" | "afbrudt"> {
  try {
    if (isNative()) {
      const { Share } = await import("@capacitor/share");
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

/** "2.1.0 (57)" from the installed app, or null on the web */
export async function appVersion(): Promise<string | null> {
  if (!isNative()) return null;
  try {
    const { App } = await import("@capacitor/app");
    const info = await App.getInfo();
    return `${info.version} (${info.build})`;
  } catch {
    return null;
  }
}
