"use client";

import { useEffect } from "react";
import { isNative } from "@/lib/platform";
import { readReminder } from "@/lib/reminder";

/**
 * Keeps the 14-day "Dagens spørgsmål" reminder window rolling in the Snakkespil app.
 * Separate from NativeBoot because @/lib/native pulls in the Danish cards.
 */
export function NativeReminders() {
  useEffect(() => {
    if (!isNative()) return;
    const reminder = readReminder();
    if (!reminder.enabled) return;
    import("@/lib/native").then(({ scheduleDailyQuestion }) => scheduleDailyQuestion(reminder, { ask: false })).catch(() => {});
  }, []);
  return null;
}
