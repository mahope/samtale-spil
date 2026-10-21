import { APP_STORE_LINKS } from "@/config/site";

export type StoreTexts = { ios: string; android: string; soon: string };

export const STORE_TEXTS_DA: StoreTexts = {
  ios: "Hent i App Store",
  android: "Hent på Google Play",
  soon: "Kommer snart i App Store og Google Play.",
};

/**
 * Buttons to the app's store pages, in the site's own look (no store logos). Until the apps
 * are live (APPS_LIVE) or a store has no link, it says "coming soon" instead.
 */
export function StoreButtons({ texts = STORE_TEXTS_DA, tone = "papir" }: { texts?: StoreTexts; tone?: "papir" | "filt" }) {
  const stores = [
    { href: APP_STORE_LINKS.ios, label: texts.ios },
    { href: APP_STORE_LINKS.android, label: texts.android },
  ].filter((s): s is { href: string; label: string } => Boolean(s.href));

  if (stores.length === 0) {
    return <p className={`font-semibold ${tone === "filt" ? "text-white/90" : "text-blaek-2"}`}>{texts.soon}</p>;
  }
  return (
    <ul className="flex flex-wrap gap-3">
      {stores.map((s) => (
        <li key={s.href}>
          <a
            href={s.href}
            className={`inline-flex min-h-12 items-center gap-2.5 rounded-xl px-5 font-semibold ${
              tone === "filt" ? "bg-white text-bord-dyb hover:bg-white/90" : "bg-blaek text-papir hover:opacity-90"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
              <path d="M12 7.5v7M9 12l3 3 3-3" />
            </svg>
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
