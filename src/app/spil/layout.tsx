import { Metadata } from "next";

const siteUrl = "https://mahope.github.io/samtale-spil";

export const metadata: Metadata = {
  title: "Vælg kategori - Samtalekort",
  description:
    "Vælg mellem 7 kategorier: Parforhold, Familie, Intimitet, Fremtid, Fortid, Sjove og Dybe spørgsmål. 350+ samtale-spørgsmål der skaber meningsfulde samtaler.",
  openGraph: {
    title: "Vælg kategori - Samtalekort",
    description:
      "7 kategorier med 350+ spørgsmål til meningsfulde samtaler mellem par, familier og venner.",
    url: `${siteUrl}/spil`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Vælg kategori - Samtalekort",
    description: "7 kategorier med 350+ spørgsmål til meningsfulde samtaler.",
  },
  alternates: {
    canonical: `${siteUrl}/spil`,
  },
};

export default function SpilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
