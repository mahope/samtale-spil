import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "@/components/app/app-shell.css";
import { NativeBoot } from "@/components/NativeBoot";
import { NativeReminders } from "@/components/NativeReminders";
import { AppShell } from "@/components/app/AppShell";
import { SNAKKESPIL_TABS } from "@/components/app/tabs";
import { PLAUSIBLE_SRC, plausibleInitScript, themeInitScript } from "@/config/headScripts";
import { SITE_NAME } from "@/config/site";
import { legeSider } from "@/data/lege";

// The Snakkespil app (APP_BUILD=1, see next.config.ts): an app shell with tabs, not the website.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], axes: ["opsz", "wdth"] });
const body = Atkinson_Hyperlegible_Next({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
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

// data-platform picks the iOS or Material look before the first paint. In a browser preview
// ?platform=ios|android forces one for the rest of the session.
const platformScript = `(function(){try{var d=document.documentElement,s=sessionStorage,q=new URLSearchParams(location.search).get('platform');if(q==='ios'||q==='android'||q==='web')s.setItem('app-platform',q);var c=window.Capacitor,p=c&&c.getPlatform?c.getPlatform():'web';if(p==='web')p=s.getItem('app-platform')||'web';d.dataset.platform=p;}catch(e){}})();`;

// The table with the card fills the screen: no tab bar there
const fullscreen = ["/spil/", "/multiplayer/", ...legeSider.map((s) => `/lege/${s.slug}/kort/`)];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" data-shell="app" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: platformScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script async src={PLAUSIBLE_SRC} />
        <script dangerouslySetInnerHTML={{ __html: plausibleInitScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Spring til indholdet
        </a>
        <AppShell tabs={SNAKKESPIL_TABS} fullscreen={fullscreen}>
          {children}
        </AppShell>
        <NativeBoot />
        <NativeReminders />
      </body>
    </html>
  );
}
