import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import AdultPlayClient from "./AdultPlayClient";

export const metadata: Metadata = appScreenMetadata("Kun for voksne");

export default function AdultPlayPage() {
  return <AdultPlayClient />;
}
