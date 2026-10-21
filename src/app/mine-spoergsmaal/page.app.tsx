"use client";

import { AppScreen } from "@/components/app/AppScreen";
import { MineSpoergsmaal } from "./MineSpoergsmaal";

export default function MineSpoergsmaalScreen() {
  return (
    <AppScreen title="Dine egne spørgsmål" back={{ href: "/mere/", label: "Mere" }}>
      <div className="px-4 [&>p:first-child]:mt-0">
        <MineSpoergsmaal />
      </div>
    </AppScreen>
  );
}
