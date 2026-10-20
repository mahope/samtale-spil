"use client";

import { useEffect } from "react";
import { logger } from "@/utils/logger";
import { isNative } from "@/lib/platform";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // The apps ship every file inside the app bundle; a service worker would only cache stale copies
    if (isNative()) {
      navigator.serviceWorker?.getRegistrations().then((rs) => rs.forEach((r) => r.unregister()));
      return;
    }
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          logger.log("SW registered:", registration.scope);
        })
        .catch((error) => {
          logger.error("SW registration failed:", error);
        });
    }
  }, []);

  return null;
}
