import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ReminderSettings } from "./ReminderSettings";

export const metadata: Metadata = appScreenMetadata("Indstillinger");

export default function SettingsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-[40rem] px-4 pt-10 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Indstillinger
        </h1>
        <div className="mt-8">
          <ReminderSettings />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
