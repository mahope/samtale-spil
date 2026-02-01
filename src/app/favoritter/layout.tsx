import { Metadata } from "next";

const siteUrl = "https://mahope.github.io/samtale-spil";

export const metadata: Metadata = {
  title: "Mine favoritter - Samtalekort",
  description:
    "Se dine gemte yndlingsspørgsmål fra Samtalekort. Gem de bedste samtalespørgsmål til senere brug.",
  openGraph: {
    title: "Mine favoritter - Samtalekort",
    description:
      "Dine gemte yndlingsspørgsmål fra Samtalekort samlet ét sted.",
    url: `${siteUrl}/favoritter`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mine favoritter - Samtalekort",
    description: "Dine gemte yndlingsspørgsmål fra Samtalekort.",
  },
  alternates: {
    canonical: `${siteUrl}/favoritter`,
  },
};

export default function FavoritterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
