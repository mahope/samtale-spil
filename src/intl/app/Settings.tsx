"use client";

import { useState } from "react";
import { AppRow, AppSection, AppSegmented, AppSwitch } from "@/components/app/AppList";
import { useTheme, type Theme } from "@/components/ThemeToggle";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { JOKER_KEY } from "@/lib/joker";
import { DEFAULT_REMINDER, normalizeReminder, REMINDER_KEY, type Reminder } from "@/lib/reminder";
import { track } from "@/utils/track";

const THEMES: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "Automatic" },
];

const HOURS = [7, 8, 12, 16, 17, 18, 19, 20, 21];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * The reminder, shared with the Danish half of the app (the same setting in localStorage):
 * whichever language is open schedules it in its own language (src/intl/app/reminders.ts).
 */
function useReminder() {
  const [stored, setReminder] = useLocalStorage<Reminder>(REMINDER_KEY, DEFAULT_REMINDER);
  const reminder = normalizeReminder(stored);
  const [message, setMessage] = useState("");

  const apply = async (next: Reminder) => {
    setReminder(next);
    let ok = false;
    try {
      const { scheduleDailyQuestion, cancelDailyQuestion } = await import("./reminders");
      if (!next.enabled) {
        await cancelDailyQuestion();
        setMessage("The reminder is off.");
        return;
      }
      ok = await scheduleDailyQuestion(next);
    } catch {
      setReminder({ ...next, enabled: false });
      setMessage("The reminder could not be set up. Try again in a moment.");
      return;
    }
    if (ok) {
      setMessage(
        next.frequency === "uge"
          ? `You will get the card of the week every ${WEEKDAYS[next.weekday]} at ${next.hour}:00.`
          : `You will get the question of the day at ${next.hour}:00.`
      );
      track("Påmindelse slået til", { time: next.hour, rytme: next.frequency });
    } else {
      setReminder({ ...next, enabled: false });
      setMessage("Your phone does not allow notifications from this app. Turn them on in your phone's settings.");
    }
  };

  return { reminder, message, apply };
}

/** Settings in the app's English half: the reminder, jokers and the look, as native lists */
export function Settings() {
  const { reminder, message, apply } = useReminder();
  const [jokerOn, setJokerOn] = useLocalStorage<boolean>(JOKER_KEY, true);
  const { theme, mounted, setTheme } = useTheme();
  return (
    <>
      <AppSection
        title="Question of the day"
        footer={
          <p role="status">
            {message || "A new question every day, or one card a week. The reminder is set up on your phone, with no server involved."}
          </p>
        }
      >
        <AppRow
          label="Send me the question of the day"
          control={<AppSwitch checked={reminder.enabled} onChange={(on) => apply({ ...reminder, enabled: on })} />}
        />
        <AppRow
          label="How often"
          control={
            <select
              className="app-select min-h-10"
              value={reminder.frequency}
              disabled={!reminder.enabled}
              onChange={(e) =>
                apply({
                  ...reminder,
                  frequency: e.target.value === "uge" ? "uge" : "dag",
                  // the weekly card arrives on the weekday it was chosen
                  weekday: new Date().getDay(),
                })
              }
            >
              <option value="dag">Every day</option>
              <option value="uge">Once a week</option>
            </select>
          }
        />
        <AppRow
          label="At"
          control={
            <select
              className="app-select min-h-10"
              value={reminder.hour}
              disabled={!reminder.enabled}
              onChange={(e) => apply({ ...reminder, hour: Number(e.target.value) })}
            >
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {String(h).padStart(2, "0")}:00
                </option>
              ))}
            </select>
          }
        />
      </AppSection>

      <AppSection title="The game" footer="About every tenth card is a joker, such as “ask a question of your own”.">
        <AppRow label="Joker cards" control={<AppSwitch checked={jokerOn ?? true} onChange={setJokerOn} />} />
      </AppSection>
      <AppSection title="Appearance" footer="Settings are saved on this phone only.">
        <li className="px-4 py-3 android:py-2">
          {mounted ? <AppSegmented label="Appearance" options={THEMES} value={theme} onChange={setTheme} /> : <div className="h-9 android:h-10" />}
        </li>
      </AppSection>
    </>
  );
}
