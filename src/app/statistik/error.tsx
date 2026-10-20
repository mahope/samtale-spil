"use client";

import { ErrorScreen } from "@/components/ErrorScreen";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorScreen error={error} reset={reset} what="din statistik" note="Dit fremskridt er ikke gået tabt." />;
}
