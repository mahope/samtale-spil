"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import { isNative } from "@/lib/platform";
import { registeredTabRoots } from "@/components/app/navState";

/** Every app's root layout marks <html data-shell="app"> and draws the app shell (src/components/app) */
const hasAppShell = () => document.documentElement.dataset.shell === "app";

/**
 * App-only start-up. On the web this renders nothing and does nothing.
 * Shared by every site; Danish-only reminders live in NativeReminders.
 */
export function NativeBoot() {
  const router = useRouter();

  useEffect(() => {
    if (!isNative()) return;
    const html = document.documentElement;
    html.classList.add("native");
    // The root layout sets this before the first paint; this covers a bridge that loaded late
    if (hasAppShell()) html.dataset.platform = Capacitor.getPlatform();
    const cleanups: (() => void)[] = [];

    (async () => {
      const [{ StatusBar, Style }, { SplashScreen }, { App }, { LocalNotifications }] = await Promise.all([
        import("@capacitor/status-bar"),
        import("@capacitor/splash-screen"),
        import("@capacitor/app"),
        import("@capacitor/local-notifications"),
      ]);

      if (hasAppShell()) {
        // The screens draw under the status bar and pad themselves (app-shell.css), so the
        // navigation bar's colour runs to the top edge like in a native app
        StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});
        // Light text on the felt (AppShell marks those screens, the 18+ age gate is one) and in
        // dark mode, dark text on paper
        let current: string | null = null;
        const syncStyle = () => {
          const felt = !!document.querySelector(".app-felt");
          const style = felt || html.classList.contains("dark") ? Style.Dark : Style.Light;
          if (style === current) return;
          current = style;
          StatusBar.setStyle({ style }).catch(() => {});
        };
        syncStyle();
        const observer = new MutationObserver(syncStyle);
        observer.observe(html, { attributes: true, attributeFilter: ["class"] });
        // Catches every route change and the shell marking a felt screen
        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
        cleanups.push(() => observer.disconnect());
      } else {
        StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
        StatusBar.setBackgroundColor({ color: "#1d4a38" }).catch(() => {});
        // Style.Dark = light text, for the dark green strip
        StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      }
      SplashScreen.hide().catch(() => {});

      // The app's web server answers unknown paths with the front page. If that
      // happened (a reload deep in the app), let the client router render the real page.
      if (window.location.pathname !== "/" && document.querySelector("[data-route='forside']")) {
        router.replace(window.location.pathname + window.location.search);
      }

      const back = await App.addListener("backButton", ({ canGoBack }) => {
        const path = window.location.pathname;
        if (path === "/") return App.exitApp();
        if (!hasAppShell()) {
          // Go back, or leave the app from the front page
          if (canGoBack) window.history.back();
          else App.exitApp();
          return;
        }
        // App shell: from another tab go to the first tab ("/"); from a pushed screen or a game go back
        const root = path.endsWith("/") ? path : `${path}/`;
        if (registeredTabRoots().includes(root) || !canGoBack) router.replace("/");
        else window.history.back();
      });
      cleanups.push(() => back.remove());

      // Tapping "Dagens spørgsmål" opens that card
      const tap = await LocalNotifications.addListener("localNotificationActionPerformed", (action) => {
        const url = action.notification.extra?.url;
        if (typeof url === "string" && url.startsWith("/")) router.push(url);
      });
      cleanups.push(() => tap.remove());
    })();

    return () => cleanups.forEach((fn) => fn());
  }, [router]);

  return null;
}
