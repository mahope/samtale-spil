import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { AftensmadLoader } from "./AftensmadLoader";

export const metadata: Metadata = appScreenMetadata("Aftensmad: tre kort til familiebordet");

export default function AftensmadPage() {
  return <AftensmadLoader />;
}
