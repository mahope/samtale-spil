import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "@/components/app/app-shell.css";
import { NativeBoot } from "@/components/NativeBoot";
import { AppShell } from "@/components/app/AppShell";
import { GOODTALK_TABS } from "@/components/app/tabs";
import { appPlatformScript, plausibleInitScript, themeInitScript } from "@/config/headScripts";
import { intlGames } from "@/intl/games";
import { site } from "@/locale/site";
import { ui } from "@/locale/ui";

// The Goodtalk app (APP_BUILD=1 with SITE_LOCALE=en, see next.config.ts): an app shell with tabs, not the website.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], axes: ["opsz", "wdth"] });
const body = Atkinson_Hyperlegible_Next({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  robots: { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f4f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1a15" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// The table with the card fills the screen: no tab bar there
const fullscreen = ["/play/", ...intlGames.map((g) => `/games/${g.slug}/play/`)];

export default function GoodtalkAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} data-shell="app" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: appPlatformScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script async src={site.plausibleScript} />
        <script dangerouslySetInnerHTML={{ __html: plausibleInitScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {ui.shell.skip}
        </a>
        <AppShell tabs={GOODTALK_TABS} fullscreen={fullscreen}>
          {children}
        </AppShell>
        <NativeBoot />
      </body>
    </html>
  );
}
