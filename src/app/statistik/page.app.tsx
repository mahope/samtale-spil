"use client";

import { AppScreen } from "@/components/app/AppScreen";
import { Statistik } from "./Statistik";

export default function StatistikScreen() {
  return (
    <AppScreen title="Statistik" back={{ href: "/mere/", label: "Mere" }}>
      <div className="px-4 [&>p:first-child]:mt-0">
        <Statistik app />
      </div>
    </AppScreen>
  );
}
