"use client";

import { AppRow, AppSection, AppSegmented, AppSwitch } from "@/components/app/AppList";
import { useTheme, type Theme } from "@/components/ThemeToggle";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { JOKER_KEY } from "@/lib/joker";

const THEMES: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "Automatic" },
];

/** Settings in the Goodtalk app: jokers and the look, as native lists */
export function Settings() {
  const [jokerOn, setJokerOn] = useLocalStorage<boolean>(JOKER_KEY, true);
  const { theme, mounted, setTheme } = useTheme();
  return (
    <>
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
