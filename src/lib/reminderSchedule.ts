"use client";

/**
 * Schedules the reminders with LocalNotifications. No card data here: each half of the app
 * passes its own card of the day, Danish in src/lib/native.ts and English in src/intl/app/reminders.ts.
 * Both use the same ids, so whichever half starts last replaces the other's reminders.
 */
import { LocalNotifications } from "@capacitor/local-notifications";
import { isNative } from "@/lib/platform";
import { reminderDates, type Reminder } from "@/lib/reminder";

const REMINDER_IDS = Array.from({ length: 14 }, (_, i) => 9100 + i);

export interface ReminderCard {
  title: string;
  body: string;
  /** Where tapping it goes, with the app's base path ("/da/spil/..."), see notificationTarget */
  url: string;
}

/**
 * Schedules the next 14 reminders locally, a day or a week apart at the chosen hour
 * (reminderDates). Re-run on every app start so the window keeps rolling. No push server is involved.
 */
export async function scheduleReminders(
  reminder: Pick<Reminder, "hour" | "frequency" | "weekday">,
  card: (at: Date) => ReminderCard,
  { ask = true }: { ask?: boolean } = {}
): Promise<boolean> {
  if (!isNative()) return false;
  // At launch only check; the system dialog is shown when the user turns the reminder on
  const perm = ask ? await LocalNotifications.requestPermissions() : await LocalNotifications.checkPermissions();
  if (perm.display !== "granted") return false;
  await LocalNotifications.cancel({ notifications: REMINDER_IDS.map((id) => ({ id })) });
  const dates = reminderDates(new Date(), reminder, REMINDER_IDS.length);
  await LocalNotifications.schedule({
    notifications: REMINDER_IDS.map((id, i) => {
      const at = dates[i];
      const { title, body, url } = card(at);
      return { id, title, body, schedule: { at }, extra: { url } };
    }),
  });
  return true;
}

export async function cancelReminders() {
  if (!isNative()) return;
  await LocalNotifications.cancel({ notifications: REMINDER_IDS.map((id) => ({ id })) });
}
