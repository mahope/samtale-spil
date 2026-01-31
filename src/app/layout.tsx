import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samtalekort - Dybe samtaler med dem du holder af",
  description: "Et spil der skaber meningsfulde samtaler mellem par, familier og venner. Stil de spørgsmål der betyder noget.",
  keywords: ["samtalespil", "parforhold", "familie", "samtale", "spørgsmål", "relationer"],
  authors: [{ name: "mahope" }],
  openGraph: {
    title: "Samtalekort",
    description: "Dybe samtaler med dem du holder af",
    locale: "da_DK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
