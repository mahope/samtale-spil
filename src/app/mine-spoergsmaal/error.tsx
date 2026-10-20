"use client";

import { ErrorScreen } from "@/components/ErrorScreen";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorScreen error={error} reset={reset} what="dine egne spørgsmål" note="Dine spørgsmål er stadig gemt på enheden." />;
}
