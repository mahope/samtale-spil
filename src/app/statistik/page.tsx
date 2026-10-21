"use client";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Statistik } from "./Statistik";

export default function StatistikPage() {
  return <Statistik site={{ header: <SiteHeader />, footer: <SiteFooter /> }} />;
}
