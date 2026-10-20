import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";

export const metadata: Metadata = appScreenMetadata("Din statistik");

export default function StatistikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
