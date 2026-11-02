import { describe, it, expect } from "vitest";
import {
  INSTALL_AFTER_CARDS,
  INSTALL_DISMISSED_KEY,
  installOffer,
  isIosSafari,
  isSnoozed,
  readDismissedAt,
  writeDismissedAt,
  type InstallContext,
} from "@/lib/installTilbud";

const DAY = 24 * 60 * 60 * 1000;
const now = Date.UTC(2026, 10, 2);
const base: InstallContext = {
  cardsThisSession: INSTALL_AFTER_CARDS,
  standalone: false,
  native: false,
  appShell: false,
  dismissedAt: null,
  now,
  hasPrompt: true,
  ios: false,
};

describe("installationstilbud", () => {
  it("shows only after three cards", () => {
    expect(installOffer({ ...base, cardsThisSession: 2 })).toBeNull();
    expect(installOffer({ ...base, cardsThisSession: 3 })).toBe("android");
  });

  it("offers the iOS guide on iOS Safari without a prompt event", () => {
    expect(installOffer({ ...base, hasPrompt: false, ios: true })).toBe("ios");
    expect(installOffer({ ...base, hasPrompt: false, ios: false })).toBeNull();
  });

  it("stays hidden in standalone, in the native app and in the app shell", () => {
    expect(installOffer({ ...base, standalone: true })).toBeNull();
    expect(installOffer({ ...base, native: true })).toBeNull();
    expect(installOffer({ ...base, appShell: true })).toBeNull();
  });

  it("snoozes for 30 days after a dismissal", () => {
    expect(isSnoozed(now - 29 * DAY, now)).toBe(true);
    expect(isSnoozed(now - 31 * DAY, now)).toBe(false);
    expect(installOffer({ ...base, dismissedAt: now - 10 * DAY })).toBeNull();
    expect(installOffer({ ...base, dismissedAt: now - 31 * DAY })).toBe("android");
  });

  it("ignores broken or future dismissal values", () => {
    expect(isSnoozed(null, now)).toBe(false);
    expect(isSnoozed(NaN, now)).toBe(false);
    expect(isSnoozed(now + 5 * DAY, now)).toBe(false);
  });

  it("stores the dismissal under a samtale-spil- key", () => {
    expect(INSTALL_DISMISSED_KEY.startsWith("samtale-spil-")).toBe(true);
    const mem = new Map<string, string>();
    const storage = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v) };
    expect(readDismissedAt(storage)).toBeNull();
    writeDismissedAt(storage, now);
    expect(readDismissedAt(storage)).toBe(now);
    mem.set(INSTALL_DISMISSED_KEY, "rod");
    expect(readDismissedAt(storage)).toBeNull();
  });

  it("recognises iOS Safari but not other iOS browsers", () => {
    const safari = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
    const chrome = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0 Mobile/15E148 Safari/604.1";
    const mac = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15";
    expect(isIosSafari(safari, 5)).toBe(true);
    expect(isIosSafari(chrome, 5)).toBe(false);
    expect(isIosSafari(mac, 5)).toBe(true); // iPadOS in desktop mode
    expect(isIosSafari(mac, 0)).toBe(false); // a real Mac
  });
});
