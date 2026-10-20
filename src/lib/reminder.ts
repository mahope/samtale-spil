/** The "Dagens spørgsmål" / "Ugens kort" reminder setting, kept on the device. */
export const REMINDER_KEY = "samtale-spil-reminder";

export interface Reminder {
  enabled: boolean;
  /** Hour of day, 0-23 */
  hour: number;
  /** Every day, or once a week ("Ugens kort") */
  frequency: "dag" | "uge";
  /** Weekday for "uge", 0 = Sunday (Date.getDay); fixed when the rhythm is chosen */
  weekday: number;
}

export const DEFAULT_REMINDER: Reminder = { enabled: false, hour: 19, frequency: "dag", weekday: 0 };

/** Fills in fields missing from data stored by older versions. */
export function normalizeReminder(parsed: Partial<Reminder> | null | undefined): Reminder {
  const p = parsed ?? {};
  const hour = Number.isInteger(p.hour) && p.hour! >= 0 && p.hour! <= 23 ? p.hour! : DEFAULT_REMINDER.hour;
  const weekday = Number.isInteger(p.weekday) && p.weekday! >= 0 && p.weekday! <= 6 ? p.weekday! : DEFAULT_REMINDER.weekday;
  return { enabled: p.enabled === true, hour, frequency: p.frequency === "uge" ? "uge" : "dag", weekday };
}

export function readReminder(): Reminder {
  try {
    const raw = window.localStorage.getItem(REMINDER_KEY);
    return normalizeReminder(raw ? (JSON.parse(raw) as Partial<Reminder>) : null);
  } catch {
    return DEFAULT_REMINDER;
  }
}

/**
 * The next `count` reminder times after `now`: every day at `hour`, or every week
 * on `weekday` at `hour`. Anchored to the chosen weekday, not to when the app
 * happens to be opened, so rescheduling at launch never moves the rhythm.
 */
export function reminderDates(now: Date, reminder: Pick<Reminder, "hour" | "frequency" | "weekday">, count: number): Date[] {
  const first = new Date(now);
  first.setHours(reminder.hour, 0, 0, 0);
  if (reminder.frequency === "uge") {
    const ahead = (reminder.weekday - first.getDay() + 7) % 7;
    first.setDate(first.getDate() + ahead);
    if (first <= now) first.setDate(first.getDate() + 7);
  } else if (first <= now) {
    first.setDate(first.getDate() + 1);
  }
  const step = reminder.frequency === "uge" ? 7 : 1;
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(first);
    d.setDate(first.getDate() + i * step);
    d.setHours(reminder.hour, 0, 0, 0);
    return d;
  });
}
