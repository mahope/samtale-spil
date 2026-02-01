import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mine Spørgsmål - Samtalespil",
  description: "Opret og administrer dine egne samtalespørgsmål",
};

export default function MineSpørgsmaalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
