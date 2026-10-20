import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";

export const metadata: Metadata = appScreenMetadata("Send telefonen rundt");

export default function MultiplayerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
