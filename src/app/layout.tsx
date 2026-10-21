import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { NativeBoot } from "@/components/NativeBoot";
import { NativeReminders } from "@/components/NativeReminders";
import { SITE_URL, SITE_NAME, CATEGORY_COUNT, QUESTION_COUNT_LABEL } from "@/config/site";
import { PLAUSIBLE_SRC, plausibleInitScript, themeInitScript } from "@/config/headScripts";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

const body = Atkinson_Hyperlegible_Next({
  variable: "--font-body",
  subsets: ["latin"],
});

const description = `Gratis samtalekort på dansk. ${QUESTION_COUNT_LABEL} spørgsmål i ${CATEGORY_COUNT} kategorier til par, familier, venner og kollegaer. Spil direkte i browseren eller på telefonen.`;

// No canonical here: Next.js inherits `alternates` into every child route, which
// made personal pages canonicalise to the front page. Each page sets its own.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Gratis samtalekort online: samtalespil på dansk | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: "Mahope", url: "https://mahoje.dk" }],
  creator: "Mahope",
  publisher: "Mahope",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "games",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1d4a38" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1a15" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script async src={PLAUSIBLE_SRC} />
        <script dangerouslySetInnerHTML={{ __html: plausibleInitScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Spring til indholdet
        </a>
        {children}
        <ServiceWorkerRegistration />
        <NativeBoot />
        <NativeReminders />
      </body>
    </html>
  );
}
