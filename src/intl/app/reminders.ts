"use client";

/**
 * The reminder in the app's English half: the same card id as Snakkespil's "Dagens spørgsmål"
 * that day, in English. The cards come from /en/reminder-cards.json (src/app/reminder-cards.json),
 * because @/intl/daily would pull the Danish cards into the English client code.
 */
import { APP_BASE } from "@/lib/appLang";
import { danishDateKey, vaelgForDato } from "@/lib/dagDato";
import type { Reminder } from "@/lib/reminder";
import { cancelReminders, scheduleReminders, type ReminderCard } from "@/lib/reminderSchedule";

export interface ReminderPoolCard {
  id: string;
  text: string;
}

/**
 * The notification for a day: the card of that day, opening Today on that very card (?card=),
 * so a notification opened the next morning still shows the card it carried
 */
export function englishReminderCard(at: Date, frequency: Reminder["frequency"], pool: ReminderPoolCard[]): ReminderCard {
  const { q } = vaelgForDato(
    danishDateKey(at),
    pool.map((q) => ({ q }))
  );
  return {
    title: frequency === "uge" ? "Card of the week" : "Question of the day",
    body: q.text,
    url: `${APP_BASE}/daily-question/?card=${encodeURIComponent(q.id)}`,
  };
}

async function loadPool(): Promise<ReminderPoolCard[]> {
  const res = await fetch(`${APP_BASE}/reminder-cards.json`);
  if (!res.ok) throw new Error(`reminder cards: ${res.status}`);
  return res.json();
}

export async function scheduleDailyQuestion(
  reminder: Pick<Reminder, "hour" | "frequency" | "weekday">,
  options: { ask?: boolean } = {}
): Promise<boolean> {
  const pool = await loadPool();
  return scheduleReminders(reminder, (at) => englishReminderCard(at, reminder.frequency, pool), options);
}

export const cancelDailyQuestion = cancelReminders;
