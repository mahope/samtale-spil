/** The "Dagens spørgsmål" reminder setting, kept on the device. */
export const REMINDER_KEY = "samtale-spil-reminder";

export interface Reminder {
  enabled: boolean;
  /** Hour of day, 0-23 */
  hour: number;
  /** Every day, or once a week ("Ugens kort") on the weekday it was turned on */
  frequency: "dag" | "uge";
}

export const DEFAULT_REMINDER: Reminder = { enabled: false, hour: 19, frequency: "dag" };

export function readReminder(): Reminder {
  try {
    const raw = window.localStorage.getItem(REMINDER_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Reminder>) : {};
    const hour = Number.isInteger(parsed.hour) && parsed.hour! >= 0 && parsed.hour! <= 23 ? parsed.hour! : DEFAULT_REMINDER.hour;
    return { enabled: parsed.enabled === true, hour, frequency: parsed.frequency === "uge" ? "uge" : "dag" };
  } catch {
    return DEFAULT_REMINDER;
  }
}
