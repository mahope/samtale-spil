import { Metadata } from "next";
import ShuffleAllClient from "./ShuffleAllClient";

export const metadata: Metadata = {
  title: "Shuffle All - Alle kategorier blandet",
  description: "Spil med spørgsmål fra alle kategorier blandet sammen. Det ultimative samtale-eventyr!",
};

export default function ShuffleAllPage() {
  return <ShuffleAllClient />;
}
