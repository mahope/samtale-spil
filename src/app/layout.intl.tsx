import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { site } from "@/locale/site";
import { NativeBoot } from "@/components/NativeBoot";

// International sites (SITE_LOCALE != "da"), issue #30.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], axes: ["opsz", "wdth"] });
const body = Atkinson_Hyperlegible_Next({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  openGraph: { siteName: site.name, locale: site.ogLocale, type: "website", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  title: { default: "Goodtalk: free conversation cards", template: "%s | Goodtalk" },
  description: "Free conversation cards for couples, first dates, families, kids and friends. Draw a card, read the question out loud, and talk.",
};

const plausibleInitScript =
  "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init(window.Capacitor?{captureOnLocalhost:true}:undefined)";

export const viewport: Viewport = { themeColor: "#1d4a38", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Plausible CE: cookieless; events wait for plausible.init() (src/utils/track.ts) */}
        <script async src={site.plausibleScript} />
        <script dangerouslySetInnerHTML={{ __html: plausibleInitScript }} />
      </head>
      <body className="bg-papir text-blaek antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <NativeBoot />
      </body>
    </html>
  );
}
