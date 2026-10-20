import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { AaretLoader } from "./AaretLoader";

export const metadata: Metadata = appScreenMetadata(
  "Året der gik: fire runder til nytår og fødselsdage",
  "Se tilbage, gæt hinandens svar, se frem, og gæt igen. Til nytår, fødselsdage og årsdage."
);

export default function AaretPage() {
  return <AaretLoader />;
}
