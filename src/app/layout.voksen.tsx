import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "@/components/app/app-shell.css";
import "@/voksen/voksen.css";
import { NativeBoot } from "@/components/NativeBoot";
import { AppShell } from "@/components/app/AppShell";
import { VOKSEN_TABS } from "@/components/app/tabs";
import { appPlatformScript, PLAUSIBLE_SRC, plausibleInitScript, voksenThemeInitScript } from "@/config/headScripts";
import { AgeGate } from "@/voksen/AgeGate";

// The 18+ app (APP_VARIANT=voksen, issue #57): an app shell with tabs behind the age gate. Never deployed as a website.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], axes: ["opsz", "wdth"] });
const body = Atkinson_Hyperlegible_Next({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Snakkespil 18+", template: "%s | Snakkespil 18+" },
  robots: { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#1d1820", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function VoksenLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" data-shell="app" data-variant="voksen" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: appPlatformScript }} />
        <script dangerouslySetInnerHTML={{ __html: voksenThemeInitScript }} />
        <script async src={PLAUSIBLE_SRC} />
        <script dangerouslySetInnerHTML={{ __html: plausibleInitScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Spring til indholdet
        </a>
        {/* Nothing in the app, not even the tabs, shows before the player has said they are 18 */}
        <AgeGate>
          <AppShell tabs={VOKSEN_TABS} fullscreen={["/spil/"]}>
            {children}
          </AppShell>
        </AgeGate>
        <NativeBoot />
      </body>
    </html>
  );
}
