"use client";

import { useState, useSyncExternalStore } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { isNative } from "@/lib/platform";
import { scheduleDailyQuestion, cancelDailyQuestion } from "@/lib/native";
import { REMINDER_KEY, DEFAULT_REMINDER, type Reminder } from "@/lib/reminder";
import { ThemeToggle } from "@/components/ThemeToggle";
import { track } from "@/utils/track";

const HOURS = [7, 8, 12, 16, 17, 18, 19, 20, 21];

export function ReminderSettings() {
  const [reminder, setReminder] = useLocalStorage<Reminder>(REMINDER_KEY, DEFAULT_REMINDER);
  const native = useSyncExternalStore(() => () => {}, isNative, () => false);
  const [message, setMessage] = useState("");

  const apply = async (next: Reminder) => {
    setReminder(next);
    if (!next.enabled) {
      await cancelDailyQuestion();
      setMessage("Påmindelsen er slået fra.");
      return;
    }
    const ok = await scheduleDailyQuestion(next.hour);
    if (ok) {
      setMessage(`Du får dagens spørgsmål kl. ${next.hour}.`);
      track("Påmindelse slået til", { time: next.hour });
    } else {
      setReminder({ ...next, enabled: false });
      setMessage("Telefonen tillader ikke notifikationer fra Snakkespil. Slå dem til under Indstillinger på telefonen.");
    }
  };

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold">Dagens spørgsmål</h2>
        {native ? (
          <>
            <p className="mt-2 text-blaek-2">
              Få et nyt spørgsmål på telefonen hver dag. Påmindelsen planlægges på telefonen og sendes ikke gennem nogen
              server.
            </p>
            <label className="mt-5 flex min-h-12 items-center justify-between gap-4 rounded-xl bg-flade px-4 ring-1 ring-streg">
              <span className="font-semibold">Send mig dagens spørgsmål</span>
              <input
                type="checkbox"
                className="h-6 w-6 accent-[var(--bord)]"
                checked={reminder.enabled}
                onChange={(e) => apply({ ...reminder, enabled: e.target.checked })}
              />
            </label>
            <label className="mt-3 flex min-h-12 items-center justify-between gap-4 rounded-xl bg-flade px-4 ring-1 ring-streg">
              <span className="font-semibold">Klokken</span>
              <select
                className="min-h-10 rounded-lg bg-flade-2 px-3 font-semibold"
                value={reminder.hour}
                onChange={(e) => apply({ ...reminder, hour: Number(e.target.value) })}
                disabled={!reminder.enabled}
              >
                {HOURS.map((h) => (
                  <option key={h} value={h}>
                    {String(h).padStart(2, "0")}.00
                  </option>
                ))}
              </select>
            </label>
            <p className="mt-3 min-h-6 text-blaek-2" role="status">
              {message}
            </p>
          </>
        ) : (
          <p className="mt-2 text-blaek-2">
            Påmindelsen om dagens spørgsmål findes i appen til iPhone og Android.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold">Udseende</h2>
        <div className="mt-4 flex min-h-12 items-center justify-between gap-4 rounded-xl bg-flade px-4 ring-1 ring-streg">
          <span className="font-semibold">Lyst, mørkt eller som telefonen</span>
          <ThemeToggle className="text-blaek" />
        </div>
      </section>
    </div>
  );
}
