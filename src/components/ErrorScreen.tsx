"use client";

import { useEffect } from "react";
import Link from "next/link";
import { logger } from "@/utils/logger";

interface ErrorScreenProps {
  error: Error & { digest?: string };
  reset: () => void;
  /** What could not be shown, e.g. "dine favoritter" */
  what?: string;
  /** Reassurance about saved data, shown under the message */
  note?: string;
}

/** Shared error page for the route error boundaries: says what failed and what to do. */
export function ErrorScreen({ error, reset, what = "siden", note }: ErrorScreenProps) {
  useEffect(() => {
    logger.error("Route error:", error);
  }, [error]);

  return (
    <main id="main-content" className="flex min-h-dvh items-center justify-center bg-papir px-4 text-blaek">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold">Vi kunne ikke vise {what}</h1>
        <p className="mt-3 text-blaek-2">
          Der skete en fejl, mens {what} blev indlæst. Prøv igen. Hvis det bliver ved, så genindlæs siden eller gå
          tilbage til forsiden.
        </p>
        {note && <p className="mt-3 text-blaek-2">{note}</p>}
        {error.digest && <p className="mt-3 text-sm text-blaek-2">Fejlkode: {error.digest}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="min-h-12 rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek"
          >
            Prøv igen
          </button>
          <Link href="/" className="inline-flex min-h-12 items-center rounded-full px-5 font-semibold ring-1 ring-streg hover:bg-flade-2">
            Til forsiden
          </Link>
        </div>
      </div>
    </main>
  );
}
