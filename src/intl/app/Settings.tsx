"use client";

import { useState } from "react";
import { AppRow, AppSection, AppSegmented, AppSwitch } from "@/components/app/AppList";
import { useTheme, type Theme } from "@/components/ThemeToggle";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { JOKER_KEY } from "@/lib/joker";
import { DEFAULT_REMINDER, normalizeReminder, REMINDER_KEY, type Reminder } from "@/lib/reminder";
import { track } from "@/utils/track";
import { screens } from "@/locale/screens";

const t = screens.settings;

const THEMES: { value: Theme; label: string }[] = [
  { value: "light", label: t.themes.light },
  { value: "dark", label: t.themes.dark },
  { value: "system", label: t.themes.system },
];

const HOURS = [7, 8, 12, 16, 17, 18, 19, 20, 21];
const WEEKDAYS = t.weekdays;

/**
 * The reminder, shared with the other languages of the app (the same setting in localStorage):
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
        setMessage(t.reminderOff);
        return;
      }
      ok = await scheduleDailyQuestion(next);
    } catch {
      setReminder({ ...next, enabled: false });
      setMessage(t.reminderFailed);
      return;
    }
    if (ok) {
      setMessage(
        next.frequency === "uge"
          ? t.reminderWeekly(WEEKDAYS[next.weekday], next.hour)
          : t.reminderDaily(next.hour)
      );
      track("Påmindelse slået til", { time: next.hour, rytme: next.frequency });
    } else {
      setReminder({ ...next, enabled: false });
      setMessage(t.notificationsBlocked);
    }
  };

  return { reminder, message, apply };
}

/** Settings in the app's international languages: the reminder, jokers and the look, as native lists */
export function Settings() {
  const { reminder, message, apply } = useReminder();
  const [jokerOn, setJokerOn] = useLocalStorage<boolean>(JOKER_KEY, true);
  const { theme, mounted, setTheme } = useTheme();
  return (
    <>
      <AppSection
        title={t.daily}
        footer={
          <p role="status">
            {message || t.dailyFooter}
          </p>
        }
      >
        <AppRow
          label={t.sendMe}
          control={<AppSwitch checked={reminder.enabled} onChange={(on) => apply({ ...reminder, enabled: on })} />}
        />
        <AppRow
          label={t.howOften}
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
              <option value="dag">{t.everyDay}</option>
              <option value="uge">{t.onceAWeek}</option>
            </select>
          }
        />
        <AppRow
          label={t.at}
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

      <AppSection title={t.game} footer={t.jokerFooter}>
        <AppRow label={t.jokers} control={<AppSwitch checked={jokerOn ?? true} onChange={setJokerOn} />} />
      </AppSection>
      <AppSection title={t.appearance} footer={t.appearanceFooter}>
        <li className="px-4 py-3 android:py-2">
          {mounted ? <AppSegmented label={t.appearance} options={THEMES} value={theme} onChange={setTheme} /> : <div className="h-9 android:h-10" />}
        </li>
      </AppSection>
    </>
  );
}
