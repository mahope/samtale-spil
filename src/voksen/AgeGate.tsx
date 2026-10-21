"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/** localStorage key for the age confirmation in the 18+ app (keys keep the samtale-spil- prefix) */
export const AGE_KEY = "samtale-spil-voksen-18";

function readAge(): string | null {
  try {
    return localStorage.getItem(AGE_KEY);
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

/**
 * Asks once whether the player is 18 or older before any card is shown (issue #57).
 * "Nej" keeps the cards hidden; the answer is stored on the device only.
 */
export function AgeGate({ children }: { children: React.ReactNode }) {
  // The static HTML always starts at the question; the stored answer is read after hydration
  const stored = useSyncExternalStore(subscribe, readAge, () => null);
  const [answer, setState] = useState<"ja" | "nej" | null>(null);
  const state = answer ?? (stored === "ja" ? "ja" : "ukendt");
  // "Nej" removes the button that had focus; move it to the new heading so a screen reader reads it
  const noHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (state === "nej") noHeading.current?.focus();
  }, [state]);

  if (state === "ja") return <>{children}</>;

  return (
    <div className="filt app-felt flex min-h-dvh items-center justify-center px-6 pb-[var(--app-inset-bottom)] pt-[var(--app-inset-top)] text-white">
      <main id="main-content" className="max-w-sm text-center">
        {state === "nej" ? (
          <>
            <h1 ref={noHeading} tabIndex={-1} className="text-3xl font-extrabold outline-none">
              Kortene er for voksne
            </h1>
            <p className="mt-4 text-lg text-white/85">
              Snakkespil 18+ er kun for voksne. Prøv den almindelige Snakkespil-app med kort til familie, venner og skole.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold">Er du fyldt 18?</h1>
            <p className="mt-4 text-lg text-white/85">Kortene handler om lyst, nærhed og frække udfordringer for par.</p>
            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                className="min-h-14 rounded-full bg-kridt px-6 text-lg font-bold text-kridt-blaek"
                onClick={() => {
                  try {
                    localStorage.setItem(AGE_KEY, "ja");
                  } catch {}
                  setState("ja");
                }}
              >
                Ja, jeg er fyldt 18
              </button>
              <button type="button" className="min-h-12 rounded-full font-semibold text-white underline underline-offset-4" onClick={() => setState("nej")}>
                Nej
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
