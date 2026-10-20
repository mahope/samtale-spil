import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

// International sites (SITE_LOCALE != "da"), issue #30. Kept out of search until launch.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], axes: ["opsz", "wdth"] });
const body = Atkinson_Hyperlegible_Next({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://goodtalkcards.com"),
  title: { default: "Goodtalk: free conversation cards", template: "%s | Goodtalk" },
  description: "Free conversation cards for couples, families and friends. Coming soon.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#1d4a38", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-papir text-blaek antialiased">{children}</body>
    </html>
  );
}
