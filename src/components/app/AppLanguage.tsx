"use client";

import { AppSection, AppSegmented } from "./AppList";
import { currentAppLang, switchAppLang, type AppLang } from "@/lib/appLang";
import { track } from "@/utils/track";

const LANGS: { value: AppLang; label: string }[] = [
  { value: "da", label: "Dansk" },
  { value: "en", label: "English" },
];

/**
 * "Dansk / English" on the Mere and More tabs of the Snakkespil app. Choosing the other language
 * stores it and opens that half's More tab (src/lib/appLang.ts). Renders nothing outside the app.
 */
export function AppLanguage({ title, footer }: { title: string; footer: string }) {
  const current = currentAppLang();
  if (!current) return null;
  return (
    <AppSection title={title} footer={footer}>
      <li className="px-4 py-3 android:py-2">
        <AppSegmented
          label={title}
          options={LANGS}
          value={current}
          onChange={(lang) => {
            if (lang === current) return;
            track("Sprog skiftet", { sprog: lang });
            switchAppLang(lang);
          }}
        />
      </li>
    </AppSection>
  );
}
