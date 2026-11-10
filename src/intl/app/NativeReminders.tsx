"use client";

import { useEffect } from "react";
import { isNative } from "@/lib/platform";
import { readReminder } from "@/lib/reminder";

/**
 * Keeps the reminder window rolling in the app's English half, in English (the Danish half has
 * src/components/NativeReminders.tsx). The setting is shared, so switching language reschedules.
 */
export function NativeReminders() {
  useEffect(() => {
    if (!isNative()) return;
    const reminder = readReminder();
    if (!reminder.enabled) return;
    import("./reminders").then(({ scheduleDailyQuestion }) => scheduleDailyQuestion(reminder, { ask: false })).catch(() => {});
  }, []);
  return null;
}
