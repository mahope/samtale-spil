"use client";

import { useState } from "react";
import { AppRow, AppSection, AppSegmented } from "@/components/app/AppList";
import { useTheme, type Theme } from "@/components/ThemeToggle";
import { tap } from "@/lib/platform";
import { AGE_KEY } from "./AgeGate";

const THEMES: { value: Theme; label: string }[] = [
  { value: "dark", label: "Mørkt" },
  { value: "light", label: "Lyst" },
  { value: "system", label: "Automatisk" },
];

/** Indstillinger in the 18+ app: the look, and asking for the age again */
export function Indstillinger() {
  const { theme, mounted, setTheme } = useTheme();
  const [asked, setAsked] = useState(false);
  return (
    <>
      <AppSection title="Udseende" footer="Appen er mørk fra start. Indstillingerne gemmes kun på telefonen.">
        <li className="px-4 py-3 android:py-2">
          {mounted ? <AppSegmented label="Udseende" options={THEMES} value={theme} onChange={setTheme} /> : <div className="h-9 android:h-10" />}
        </li>
      </AppSection>
      <AppSection
        title="Alder"
        footer={
          <p role="status">
            {asked ? "Appen spørger igen, næste gang den åbnes." : "Låner du telefonen ud, kan appen spørge om alderen igen."}
          </p>
        }
      >
        <AppRow
          label="Spørg om alder igen"
          onClick={() => {
            tap();
            try {
              localStorage.removeItem(AGE_KEY);
            } catch {}
            setAsked(true);
          }}
        />
      </AppSection>
    </>
  );
}
