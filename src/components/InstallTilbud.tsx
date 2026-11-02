"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { isNative } from "@/lib/platform";
import { track } from "@/utils/track";
import {
  INSTALL_AFTER_CARDS,
  installOffer,
  isIosSafari,
  readDismissedAt,
  writeDismissedAt,
  type InstallKind,
} from "@/lib/installTilbud";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Small dismissible card (not a modal) offering to install Snakkespil, shown after a few
 * cards on the web game screen. Never in the apps, in standalone display or on the 18+ site.
 */
export function InstallTilbud({ cardsThisSession }: { cardsThisSession: number }) {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [gone, setGone] = useState(false);
  const [mountedAt] = useState(() => Date.now());
  const shown = useRef(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  // Only reachable after the player has drawn cards, i.e. after hydration, so reading browser state here is safe
  const kind: InstallKind | null =
    typeof window === "undefined" || cardsThisSession < INSTALL_AFTER_CARDS
      ? null
      : installOffer({
          cardsThisSession,
          standalone:
            window.matchMedia("(display-mode: standalone)").matches ||
            (navigator as Navigator & { standalone?: boolean }).standalone === true,
          native: isNative(),
          appShell: document.documentElement.dataset.shell === "app",
          dismissedAt: readDismissedAt(window.localStorage),
          now: mountedAt,
          hasPrompt: prompt !== null,
          ios: isIosSafari(navigator.userAgent, navigator.maxTouchPoints),
        });

  useEffect(() => {
    if (kind && !shown.current) {
      shown.current = true;
      track("Installationstilbud-vist", { type: kind });
    }
  }, [kind]);

  if (!kind || gone) return null;

  const dismiss = () => {
    writeDismissedAt(window.localStorage, Date.now());
    track("Installationstilbud-afvist", { type: kind });
    setGone(true);
  };

  const install = async () => {
    track("Installationstilbud-klik", { type: kind, handling: "gem" });
    if (!prompt) return;
    try {
      await prompt.prompt();
      await prompt.userChoice;
    } catch {
      // the browser may refuse a second prompt; nothing to recover
    }
    writeDismissedAt(window.localStorage, Date.now());
    setGone(true);
  };

  return (
    <section
      aria-label="Gem Snakkespil"
      className="mb-4 w-full max-w-[23rem] rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/25"
    >
      <p className="font-semibold">Gem Snakkespil på hjemmeskærmen</p>
      {kind === "ios" && (
        <p className="mt-1 text-sm text-white/85">Tryk på del-ikonet og vælg Føj til hjemmeskærm.</p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {kind === "android" && (
          <button
            type="button"
            onClick={install}
            className="min-h-11 rounded-full bg-kridt px-5 font-bold text-kridt-blaek"
          >
            Gem på hjemmeskærmen
          </button>
        )}
        <Link
          href="/app/"
          onClick={() => track("Installationstilbud-klik", { type: kind, handling: "app-side" })}
          className="inline-flex min-h-11 items-center rounded px-2 underline decoration-white/40 underline-offset-4"
        >
          Læs om appen
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="ml-auto min-h-11 rounded px-2 text-sm underline decoration-white/40 underline-offset-4"
        >
          Ikke nu
        </button>
      </div>
    </section>
  );
}
