import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { NativeBoot } from "@/components/NativeBoot";
import { SITE_URL, SITE_NAME, CATEGORY_COUNT, QUESTION_COUNT_LABEL } from "@/config/site";

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

// Inline script to set theme before hydration (prevents flash)
const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    var isDark = theme === 'dark' ||
      (theme === 'system' || !theme) && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.add(isDark ? 'dark' : 'light');
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

// Plausible CE (analytics.holstjensen.eu): cookieless, self-hosted in the EU.
// The pa-<id>.js script only sends events once plausible.init() has run. Inside the
// apps the page host is localhost, which Plausible skips unless captureOnLocalhost is set.
const plausibleInitScript =
  "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init(window.Capacitor?{captureOnLocalhost:true}:undefined)";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script async src="https://analytics.holstjensen.eu/js/pa-yk0peyirQvnSBppLjWJYB.js" />
        <script dangerouslySetInnerHTML={{ __html: plausibleInitScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Spring til indholdet
        </a>
        {children}
        <ServiceWorkerRegistration />
        <NativeBoot />
      </body>
    </html>
  );
}
