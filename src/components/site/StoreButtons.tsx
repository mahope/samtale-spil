import { DeviceStoreButtons } from "./DeviceStoreButtons";
import { APP_STORE_LINKS, SHOW_APP_PROMO } from "@/config/site";

export type StoreTexts = { ios: string; android: string; soon: string };

export const STORE_TEXTS_DA: StoreTexts = {
  ios: "Hent i App Store",
  android: "Hent på Google Play",
  soon: "Kommer snart i App Store og Google Play.",
};

/** Store promotion is omitted entirely from the native app build. */
export function StoreButtons({ texts = STORE_TEXTS_DA, tone = "papir" }: { texts?: StoreTexts; tone?: "papir" | "filt" }) {
  if (!SHOW_APP_PROMO) return null;
  return <DeviceStoreButtons texts={texts} tone={tone} links={APP_STORE_LINKS} />;
}
