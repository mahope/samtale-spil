"use client";

/**
 * "Dagens spørgsmål" reminders for the apps. Imports the question data, so load it
 * on demand (await import("@/lib/native")) rather than from shared components.
 */
import { dagensKort } from "@/lib/dagensKort";
import { APP_BASE } from "@/lib/appLang";
import type { Reminder } from "@/lib/reminder";
import { cancelReminders, scheduleReminders } from "@/lib/reminderSchedule";

/** "Dagens spørgsmål": the same card as /dagens-spoergsmaal/ shows that day, see scheduleReminders */
export async function scheduleDailyQuestion(
  reminder: Pick<Reminder, "hour" | "frequency" | "weekday">,
  options: { ask?: boolean } = {}
): Promise<boolean> {
  return scheduleReminders(
    reminder,
    (at) => {
      const { q, c } = dagensKort(at);
      return {
        title: reminder.frequency === "uge" ? "Ugens kort" : "Dagens spørgsmål",
        body: q.text,
        url: `${APP_BASE}/spil/${c.id}/?question=${q.id}`,
      };
    },
    options
  );
}

export const cancelDailyQuestion = cancelReminders;
