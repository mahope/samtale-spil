"use client";

import { ErrorScreen } from "@/components/ErrorScreen";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorScreen error={error} reset={reset} what="dine favoritter" note="Dine gemte favoritter er ikke gået tabt." />;
}
