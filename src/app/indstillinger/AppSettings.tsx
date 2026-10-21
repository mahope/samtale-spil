"use client";

import { AppRow, AppSection, AppSegmented, AppSwitch } from "@/components/app/AppList";
import { useTheme, type Theme } from "@/components/ThemeToggle";
import { HOURS, useReminderSettings } from "./ReminderSettings";

const THEMES: { value: Theme; label: string }[] = [
  { value: "light", label: "Lyst" },
  { value: "dark", label: "Mørkt" },
  { value: "system", label: "Automatisk" },
];

/** Indstillinger in the app: the same settings as the site's ReminderSettings, as native lists */
export function AppSettings() {
  const { reminder, message, apply, jokerOn, setJokerOn } = useReminderSettings();
  const { theme, mounted, setTheme } = useTheme();

  return (
    <>
      <AppSection
        title="Dagens spørgsmål"
        footer={
          <p role="status">
            {message ||
              "Et nyt spørgsmål hver dag, eller ét kort om ugen. Påmindelsen planlægges på telefonen og sendes ikke gennem nogen server."}
          </p>
        }
      >
        <AppRow
          label="Send mig dagens spørgsmål"
          control={<AppSwitch checked={reminder.enabled} onChange={(on) => apply({ ...reminder, enabled: on })} />}
        />
        <AppRow
          label="Hvor tit"
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
              <option value="dag">Hver dag</option>
              <option value="uge">En gang om ugen</option>
            </select>
          }
        />
        <AppRow
          label="Klokken"
          control={
            <select
              className="app-select min-h-10"
              value={reminder.hour}
              disabled={!reminder.enabled}
              onChange={(e) => apply({ ...reminder, hour: Number(e.target.value) })}
            >
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {String(h).padStart(2, "0")}.00
                </option>
              ))}
            </select>
          }
        />
      </AppSection>

      <AppSection title="Spillet" footer="Ca. hvert tiende kort er en joker, fx »stil dit eget spørgsmål«.">
        <AppRow label="Jokerkort" control={<AppSwitch checked={jokerOn ?? true} onChange={setJokerOn} />} />
      </AppSection>

      <AppSection title="Udseende">
        <li className="px-4 py-3 android:py-2">
          {mounted ? (
            <AppSegmented label="Udseende" options={THEMES} value={theme} onChange={setTheme} />
          ) : (
            <div className="h-9 android:h-10" />
          )}
        </li>
      </AppSection>
    </>
  );
}
