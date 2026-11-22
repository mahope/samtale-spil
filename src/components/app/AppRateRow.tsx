"use client";

import { useSyncExternalStore } from "react";
import { Capacitor } from "@capacitor/core";
import { AppRow } from "./AppList";
import { IconStjerne } from "./icons";
import { reviewUrl } from "@/config/review";
import { STORES_LIVE } from "@/config/site";
import { isNative } from "@/lib/platform";

const subscribeNever = () => () => {};
const serverUrl = () => null;
const clientUrl = () => (isNative() ? reviewUrl(Capacitor.getPlatform(), STORES_LIVE.android) : null);

/**
 * "Rate the app": opens the store's write-a-review page. Native apps only, and hidden while the
 * store has nothing to open (the App Store id in src/config/review.ts is empty). A plain link, not
 * the system dialog and not a "do you like the app?" question first.
 */
export function AppRateRow({ label }: { label: string }) {
  // null while hydrating and in a browser, so server HTML and the first client render match
  const url = useSyncExternalStore(subscribeNever, clientUrl, serverUrl);
  if (!url) return null;
  return (
    <AppRow
      label={label}
      icon={<IconStjerne className="h-[19px] w-[19px]" />}
      tone="#b9831c"
      chevron
      onClick={() => {
        try {
          window.location.assign(url);
        } catch {
          // nothing to do
        }
      }}
    />
  );
}
