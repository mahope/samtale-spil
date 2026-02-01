import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://mahope.github.io/samtale-spil";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Samtalekort - Dybe samtaler med dem du holder af",
    template: "%s | Samtalekort",
  },
  description: "Et gratis online samtalespil der skaber meningsfulde samtaler mellem par, familier og venner. 350+ spørgsmål i 7 kategorier. Perfekt til date night, familiehygge eller venneaftener.",
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
  authors: [{ name: "mahope", url: "https://mahope.dk" }],
  creator: "mahope",
  publisher: "mahope",
  manifest: "/samtale-spil/manifest.json",
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
    description: "350+ spørgsmål der skaber meningsfulde samtaler mellem par, familier og venner. Gratis online samtalespil.",
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
    description: "350+ spørgsmål der skaber meningsfulde samtaler. Gratis online samtalespil.",
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
    canonical: siteUrl,
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
  maximumScale: 1,
  userScalable: false,
};

// JSON-LD Structured Data for WebApplication
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Samtalekort",
  description:
    "Et gratis online samtalespil der skaber meningsfulde samtaler mellem par, familier og venner. 350+ spørgsmål i 7 kategorier.",
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
    name: "mahope",
    url: "https://mahope.dk",
  },
  inLanguage: "da",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  softwareVersion: "1.0.0",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "1",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/samtale-spil/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/samtale-spil/icons/icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
