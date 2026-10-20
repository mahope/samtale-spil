import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { SITE_URL, CATEGORY_COUNT, QUESTION_COUNT_LABEL } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Samtalekort - Dybe samtaler med dem du holder af",
    template: "%s | Samtalekort",
  },
  description: `Et gratis online samtalespil der skaber meningsfulde samtaler mellem par, familier og venner. ${QUESTION_COUNT_LABEL} spørgsmål i ${CATEGORY_COUNT} kategorier. Perfekt til date night, familiehygge eller venneaftener.`,
  keywords: [
    "samtalespil",
    "samtalekort",
    "parforhold",
    "familie",
    "samtale",
    "spørgsmål",
    "relationer",
    "date night",
    "hygge",
    "kvalitetstid",
    "gratis samtalespil",
    "dansk samtalespil",
  ],
  authors: [{ name: "Mahope", url: "https://mahoje.dk" }],
  creator: "Mahope",
  publisher: "Mahope",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Samtalekort",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Samtalekort - Dybe samtaler med dem du holder af",
    description: `${QUESTION_COUNT_LABEL} spørgsmål der skaber meningsfulde samtaler mellem par, familier og venner. Gratis online samtalespil.`,
    url: siteUrl,
    siteName: "Samtalekort",
    locale: "da_DK",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Samtalekort - Dybe samtaler med dem du holder af",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samtalekort - Dybe samtaler med dem du holder af",
    description: `${QUESTION_COUNT_LABEL} spørgsmål der skaber meningsfulde samtaler. Gratis online samtalespil.`,
    images: [`${siteUrl}/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "games",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6366f1" },
    { media: "(prefers-color-scheme: dark)", color: "#4338ca" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// JSON-LD Structured Data for WebApplication
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Samtalekort",
  description:
    `Et gratis online samtalespil der skaber meningsfulde samtaler mellem par, familier og venner. ${QUESTION_COUNT_LABEL} spørgsmål i ${CATEGORY_COUNT} kategorier.`,
  url: siteUrl,
  applicationCategory: "GameApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "DKK",
  },
  author: {
    "@type": "Organization",
    name: "Mahope",
    url: "https://mahoje.dk",
  },
  inLanguage: "da",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  softwareVersion: "1.0.0",
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
// The pa-<id>.js script only sends events once plausible.init() has run.
const plausibleInitScript =
  "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script async src="https://analytics.holstjensen.eu/js/pa-yk0peyirQvnSBppLjWJYB.js" />
        <script dangerouslySetInnerHTML={{ __html: plausibleInitScript }} />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Spring til hovedindhold
        </a>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
