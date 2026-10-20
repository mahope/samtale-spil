import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { TrappenLoader } from "./TrappenLoader";

export const metadata: Metadata = appScreenMetadata(
  "Trappen: 12 kort fra let til dyb",
  "Fire lette, fire personlige og fire dybe spørgsmål i rækkefølge, som i Arthur Arons 36 spørgsmål."
);

export default function TrappenPage() {
  return <TrappenLoader />;
}
