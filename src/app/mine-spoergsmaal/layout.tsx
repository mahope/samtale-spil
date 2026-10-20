import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";

export const metadata: Metadata = appScreenMetadata("Dine egne spørgsmål");

export default function MineSpørgsmaalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
