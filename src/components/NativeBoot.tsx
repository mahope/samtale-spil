"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isNative } from "@/lib/platform";
import { readReminder } from "@/lib/reminder";

/**
 * App-only start-up. On the web this renders nothing and does nothing.
 */
export function NativeBoot() {
  const router = useRouter();

  useEffect(() => {
    if (!isNative()) return;
    document.documentElement.classList.add("native");
    const cleanups: (() => void)[] = [];

    (async () => {
      const [{ StatusBar, Style }, { SplashScreen }, { App }, { LocalNotifications }] = await Promise.all([
        import("@capacitor/status-bar"),
        import("@capacitor/splash-screen"),
        import("@capacitor/app"),
        import("@capacitor/local-notifications"),
      ]);

      StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
      StatusBar.setBackgroundColor({ color: "#1d4a38" }).catch(() => {});
      // Style.Dark = light text, for the dark green strip
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      SplashScreen.hide().catch(() => {});

      // The app's web server answers unknown paths with the front page. If that
      // happened (a reload deep in the app), let the client router render the real page.
      if (window.location.pathname !== "/" && document.querySelector("[data-route='forside']")) {
        router.replace(window.location.pathname + window.location.search);
      }

      // Android back button: go back, or leave the app from the front page
      const back = await App.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack && window.location.pathname !== "/") window.history.back();
        else App.exitApp();
      });
      cleanups.push(() => back.remove());

      // Tapping "Dagens spørgsmål" opens that card
      const tap = await LocalNotifications.addListener("localNotificationActionPerformed", (action) => {
        const url = action.notification.extra?.url;
        if (typeof url === "string" && url.startsWith("/")) router.push(url);
      });
      cleanups.push(() => tap.remove());

      // Keep the 14-day reminder window rolling
      const reminder = readReminder();
      if (reminder.enabled) {
        const { scheduleDailyQuestion } = await import("@/lib/native");
        scheduleDailyQuestion(reminder.hour, { ask: false }).catch(() => {});
      }
    })();

    return () => cleanups.forEach((fn) => fn());
  }, [router]);

  return null;
}
