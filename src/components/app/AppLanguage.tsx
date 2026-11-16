"use client";

import { AppRow, AppSection } from "./AppList";
import { IconFlueben } from "./icons";
import { APP_LOCALES } from "@/locales/appLocales";
import { currentAppLang, switchAppLang } from "@/lib/appLang";
import { tap } from "@/lib/platform";
import { track } from "@/utils/track";

/**
 * The language list on the Mere and More tabs of the Snakkespil app: every language in
 * src/locales/appLocales.ts under its own name, the current one ticked. Choosing another
 * stores it and opens that language's More tab (src/lib/appLang.ts). Renders nothing outside the app.
 */
export function AppLanguage({ title, footer }: { title: string; footer: string }) {
  const current = currentAppLang();
  if (!current) return null;
  return (
    <AppSection title={title} footer={footer}>
      {APP_LOCALES.map((l) => {
        const on = l.code === current;
        return (
          <AppRow
            key={l.code}
            label={<span lang={l.code}>{l.label}</span>}
            pressed={on}
            chevron={false}
            control={on ? <IconFlueben className="h-[18px] w-[18px] shrink-0 text-bord dark:text-kridt" /> : undefined}
            onClick={() => {
              if (on) return;
              tap();
              track("Sprog skiftet", { sprog: l.code });
              switchAppLang(l.code);
            }}
          />
        );
      })}
    </AppSection>
  );
}
