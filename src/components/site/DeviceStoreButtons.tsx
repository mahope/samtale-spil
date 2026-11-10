"use client";

import { useSyncExternalStore } from "react";
import type { StoreTexts } from "./StoreButtons";

type StoreDevice = "ios" | "android" | "desktop";

export function detectStoreDevice(userAgent: string, maxTouchPoints: number): StoreDevice {
  if (/iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh|MacIntel/i.test(userAgent) && maxTouchPoints > 1)) return "ios";
  if (/Android/i.test(userAgent)) return "android";
  return "desktop";
}

const subscribeNever = () => () => {};
const serverDevice = (): StoreDevice => "desktop";
const clientDevice = () => detectStoreDevice(navigator.userAgent, navigator.maxTouchPoints);

/** Hydration starts with the same desktop fallback as the static export. */
export function DeviceStoreButtons({ texts, tone, links }: {
  texts: StoreTexts;
  tone: "papir" | "filt";
  links: { ios: string | null; android: string | null };
}) {
  const device = useSyncExternalStore(subscribeNever, clientDevice, serverDevice);
  const stores = [
    { href: device !== "android" ? links.ios : null, label: texts.ios },
    { href: device !== "ios" ? links.android : null, label: texts.android },
  ].filter((s): s is { href: string; label: string } => Boolean(s.href));
  const textColor = tone === "filt" ? "text-white/90" : "text-blaek-2";

  if (!links.ios && !links.android) {
    return <p className={`font-semibold ${textColor}`}>{texts.soon}</p>;
  }
  return (
    <div>
      {stores.length > 0 && <ul className="flex flex-wrap gap-3">
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
      </ul>}
      {device !== "ios" && !links.android && <p className={`mt-3 text-sm ${textColor}`}>Kommer snart på Google Play</p>}
    </div>
  );
}
