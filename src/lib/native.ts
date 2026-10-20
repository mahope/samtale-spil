"use client";

/**
 * "Dagens spørgsmål" reminders for the apps. Imports the question data, so load it
 * on demand (await import("@/lib/native")) rather than from shared components.
 */
import { LocalNotifications } from "@capacitor/local-notifications";
import { categories } from "@/data/categories";
import { isNative } from "@/lib/platform";
import { reminderDates, type Reminder } from "@/lib/reminder";

const REMINDER_IDS = Array.from({ length: 14 }, (_, i) => 9100 + i);

/**
 * "Dagens spørgsmål": schedules the next 14 days locally, one light question per
 * day at the chosen hour. Re-run on every app start so the window keeps rolling.
 * No push server is involved.
 */
/** Schedules the next 14 reminders, a day or a week apart, at the times from reminderDates. */
export async function scheduleDailyQuestion(
  reminder: Pick<Reminder, "hour" | "frequency" | "weekday">,
  { ask = true }: { ask?: boolean } = {}
): Promise<boolean> {
  if (!isNative()) return false;
  // At launch only check; the system dialog is shown when the user turns the reminder on
  const perm = ask ? await LocalNotifications.requestPermissions() : await LocalNotifications.checkPermissions();
  if (perm.display !== "granted") return false;
  await LocalNotifications.cancel({ notifications: REMINDER_IDS.map((id) => ({ id })) });
  const pool = categories
    .filter((c) => c.id !== "intimitet")
    .flatMap((c) => c.questions.filter((q) => q.depth !== "dyb").map((q) => ({ q, c })));
  const dates = reminderDates(new Date(), reminder, REMINDER_IDS.length);
  await LocalNotifications.schedule({
    notifications: REMINDER_IDS.map((id, i) => {
      const at = dates[i];
      const { q, c } = pool[(at.getFullYear() * 400 + at.getMonth() * 31 + at.getDate()) % pool.length];
      return {
        id,
        title: reminder.frequency === "uge" ? "Ugens kort" : "Dagens spørgsmål",
        body: q.text,
        schedule: { at },
        extra: { url: `/spil/${c.id}/?question=${q.id}` },
      };
    }),
  });
  return true;
}

export async function cancelDailyQuestion() {
  if (!isNative()) return;
  await LocalNotifications.cancel({ notifications: REMINDER_IDS.map((id) => ({ id })) });
}
