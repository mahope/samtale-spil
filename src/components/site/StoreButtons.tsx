import { APP_STORE_LINKS, type Store, type StoreLinks } from "@/config/site";
import { StoreLink } from "@/components/site/StoreLink";

export type StoreTexts = { ios: string; android: string; soon: string; soonIos?: string; soonAndroid?: string };

export const STORE_TEXTS_DA: StoreTexts = {
  ios: "Hent i App Store",
  android: "Hent på Google Play",
  soon: "Kommer snart i App Store og Google Play.",
  soonIos: "Kommer snart i App Store.",
  soonAndroid: "Kommer snart på Google Play.",
};

/**
 * Buttons to the app's store pages, in the site's own look (no store logos). A store that is not
 * live (flag in APPS_LIVE, or no link) says "coming soon" instead; the other store still links.
 */
export function StoreButtons({
  texts = STORE_TEXTS_DA,
  tone = "papir",
  links = APP_STORE_LINKS,
}: {
  texts?: StoreTexts;
  tone?: "papir" | "filt";
  links?: StoreLinks;
}) {
  const stores: { store: Store; href: string | null; label: string; soon: string }[] = [
    { store: "ios", href: links.ios, label: texts.ios, soon: texts.soonIos ?? texts.soon },
    { store: "android", href: links.android, label: texts.android, soon: texts.soonAndroid ?? texts.soon },
  ];
  const live = stores.filter((s) => s.href);
  const pending = stores.filter((s) => !s.href);
  const soonClass = `font-semibold ${tone === "filt" ? "text-white/90" : "text-blaek-2"}`;

  return (
    <div className="flex flex-col items-start gap-3">
      {live.length > 0 && (
        <ul className="flex flex-wrap gap-3">
          {live.map((s) => (
            <li key={s.store}>
              <StoreLink
                href={s.href as string}
                store={s.store}
                className={`inline-flex min-h-12 items-center gap-2.5 rounded-xl px-5 font-semibold ${
                  tone === "filt" ? "bg-white text-bord-dyb hover:bg-white/90" : "bg-blaek text-papir hover:opacity-90"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
                  <path d="M12 7.5v7M9 12l3 3 3-3" />
                </svg>
                {s.label}
              </StoreLink>
            </li>
          ))}
        </ul>
      )}
      {/* Both stores pending: one sentence for both. Only one pending: name that store. */}
      {pending.length === 2 && <p className={soonClass}>{texts.soon}</p>}
      {pending.length === 1 && <p className={soonClass}>{pending[0].soon}</p>}
    </div>
  );
}
