"use client";

/**
 * "Dagens spørgsmål" reminders for the apps. Imports the question data, so load it
 * on demand (await import("@/lib/native")) rather than from shared components.
 */
import { LocalNotifications } from "@capacitor/local-notifications";
import { categories } from "@/data/categories";
import { isNative } from "@/lib/platform";

const REMINDER_IDS = Array.from({ length: 14 }, (_, i) => 9100 + i);

/**
 * "Dagens spørgsmål": schedules the next 14 days locally, one light question per
 * day at the chosen hour. Re-run on every app start so the window keeps rolling.
 * No push server is involved.
 */
export async function scheduleDailyQuestion(hour: number): Promise<boolean> {
  if (!isNative()) return false;
  const perm = await LocalNotifications.requestPermissions();
  if (perm.display !== "granted") return false;
  await LocalNotifications.cancel({ notifications: REMINDER_IDS.map((id) => ({ id })) });
  const pool = categories
    .filter((c) => c.id !== "intimitet")
    .flatMap((c) => c.questions.filter((q) => q.depth !== "dyb").map((q) => ({ q, c })));
  const start = new Date();
  await LocalNotifications.schedule({
    notifications: REMINDER_IDS.map((id, i) => {
      const at = new Date(start);
      at.setDate(start.getDate() + i + (start.getHours() >= hour ? 1 : 0));
      at.setHours(hour, 0, 0, 0);
      const { q, c } = pool[(at.getFullYear() * 400 + at.getMonth() * 31 + at.getDate()) % pool.length];
      return {
        id,
        title: "Dagens spørgsmål",
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
