import { Metadata } from "next";

import { SITE_URL as siteUrl, CATEGORY_COUNT, QUESTION_COUNT_LABEL } from "@/config/site";

export const metadata: Metadata = {
  title: "Vælg kategori - Samtalekort",
  description:
    `Vælg mellem ${CATEGORY_COUNT} kategorier, fra parforhold og familie til sjove og filosofiske spørgsmål. ${QUESTION_COUNT_LABEL} samtalespørgsmål der skaber meningsfulde samtaler.`,
  openGraph: {
    title: "Vælg kategori - Samtalekort",
    description:
      `${CATEGORY_COUNT} kategorier med ${QUESTION_COUNT_LABEL} spørgsmål til meningsfulde samtaler mellem par, familier og venner.`,
    url: `${siteUrl}/spil/`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Vælg kategori - Samtalekort",
    description: `${CATEGORY_COUNT} kategorier med ${QUESTION_COUNT_LABEL} spørgsmål til meningsfulde samtaler.`,
  },
  alternates: {
    canonical: `${siteUrl}/spil/`,
  },
};

export default function SpilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
