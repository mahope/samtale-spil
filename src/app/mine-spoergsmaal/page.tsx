"use client";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MineSpoergsmaal } from "./MineSpoergsmaal";

export default function MineSpoergsmaalPage() {
  return <MineSpoergsmaal site={{ header: <SiteHeader />, footer: <SiteFooter /> }} />;
}
