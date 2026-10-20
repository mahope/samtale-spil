"use client";

import { useState, useSyncExternalStore } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { isNative } from "@/lib/platform";
import { REMINDER_KEY, DEFAULT_REMINDER, normalizeReminder, type Reminder } from "@/lib/reminder";
import { ThemeToggle } from "@/components/ThemeToggle";
import { track } from "@/utils/track";
import { JOKER_KEY } from "@/lib/joker";

const HOURS = [7, 8, 12, 16, 17, 18, 19, 20, 21];
const WEEKDAYS = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];

export function ReminderSettings() {
  const [stored, setReminder] = useLocalStorage<Reminder>(REMINDER_KEY, DEFAULT_REMINDER);
  // Older versions stored no frequency or weekday
  const reminder = normalizeReminder(stored);
  const native = useSyncExternalStore(() => () => {}, isNative, () => false);
  const [message, setMessage] = useState("");
  const [jokerOn, setJokerOn] = useLocalStorage<boolean>(JOKER_KEY, true);

  const apply = async (next: Reminder) => {
    setReminder(next);
    let ok = false;
    try {
      const { scheduleDailyQuestion, cancelDailyQuestion } = await import("@/lib/native");
      if (!next.enabled) {
        await cancelDailyQuestion();
        setMessage("Påmindelsen er slået fra.");
        return;
      }
      ok = await scheduleDailyQuestion(next);
    } catch {
      setReminder({ ...next, enabled: false });
      setMessage("Påmindelsen kunne ikke sættes op. Prøv igen om lidt.");
      return;
    }
    if (ok) {
      setMessage(
        next.frequency === "uge"
          ? `Du får ugens kort hver ${WEEKDAYS[next.weekday]} kl. ${next.hour}.`
          : `Du får dagens spørgsmål kl. ${next.hour}.`
      );
      track("Påmindelse slået til", { time: next.hour, rytme: next.frequency });
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
              Få et nyt spørgsmål på telefonen hver dag, eller ét kort om ugen. Et par kort jævnligt giver mere end en lang
              aften en gang om året. Påmindelsen planlægges på telefonen og sendes ikke gennem nogen server.
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
              <span className="font-semibold">Hvor tit</span>
              <select
                className="min-h-10 rounded-lg bg-flade-2 px-3 font-semibold"
                value={reminder.frequency}
                onChange={(e) =>
                  apply({
                    ...reminder,
                    frequency: e.target.value === "uge" ? "uge" : "dag",
                    // the weekly card arrives on the weekday it was chosen
                    weekday: new Date().getDay(),
                  })
                }
                disabled={!reminder.enabled}
              >
                <option value="dag">Hver dag</option>
                <option value="uge">En gang om ugen</option>
              </select>
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
        <h2 className="text-2xl font-bold">Spillet</h2>
        <label className="mt-4 flex min-h-12 items-center justify-between gap-4 rounded-xl bg-flade px-4 ring-1 ring-streg">
          <span>
            <span className="block font-semibold">Jokerkort</span>
            <span className="text-sm text-blaek-2">Ca. hvert tiende kort er en joker, fx »stil dit eget spørgsmål«.</span>
          </span>
          <input
            type="checkbox"
            checked={jokerOn ?? true}
            onChange={(e) => setJokerOn(e.target.checked)}
            className="h-6 w-6 shrink-0 accent-[var(--bord)]"
          />
        </label>
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
