import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { NativeBoot } from "@/components/NativeBoot";

// The 18+ app (APP_VARIANT=voksen, issue #57). Never deployed as a website.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], axes: ["opsz", "wdth"] });
const body = Atkinson_Hyperlegible_Next({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Snakkespil 18+", template: "%s | Snakkespil 18+" },
  robots: { index: false, follow: false },
};

// In the apps the page host is localhost, which Plausible skips unless captureOnLocalhost is set
const plausibleInitScript =
  "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init(window.Capacitor?{captureOnLocalhost:true}:undefined)";

export const viewport: Viewport = { themeColor: "#1d1820", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${display.variable} ${body.variable}`}>
      <head>
        <script async src="https://analytics.holstjensen.eu/js/pa-yk0peyirQvnSBppLjWJYB.js" />
        <script dangerouslySetInnerHTML={{ __html: plausibleInitScript }} />
      </head>
      <body className="bg-papir text-blaek antialiased">
        <a href="#main-content" className="skip-link">
          Spring til indholdet
        </a>
        {children}
        <NativeBoot />
      </body>
    </html>
  );
}
