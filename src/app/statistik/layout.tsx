import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Din Statistik",
  description: "Se din personlige statistik og fremskridt i Samtalekort - favoritter, besvarede spørgsmål og sjove facts.",
};

export default function StatistikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
