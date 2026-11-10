"use client";

/**
 * The reminder in the app's English half: the same card id as Snakkespil's "Dagens spørgsmål"
 * that day, in English. Loaded on demand like src/lib/native.ts, because it imports the cards.
 */
import { dailyPool } from "@/intl/daily";
import { APP_BASE } from "@/lib/appLang";
import { danishDateKey, vaelgForDato } from "@/lib/dagDato";
import type { Reminder } from "@/lib/reminder";
import { cancelReminders, scheduleReminders, type ReminderCard } from "@/lib/reminderSchedule";

/** The notification for a day: the card of that day, opening Today */
export function englishReminderCard(at: Date, frequency: Reminder["frequency"]): ReminderCard {
  const { q } = vaelgForDato(danishDateKey(at), dailyPool);
  return {
    title: frequency === "uge" ? "Card of the week" : "Question of the day",
    body: q.text,
    url: `${APP_BASE}/daily-question/`,
  };
}

export async function scheduleDailyQuestion(
  reminder: Pick<Reminder, "hour" | "frequency" | "weekday">,
  options: { ask?: boolean } = {}
): Promise<boolean> {
  return scheduleReminders(reminder, (at) => englishReminderCard(at, reminder.frequency), options);
}

export const cancelDailyQuestion = cancelReminders;
