import { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import ShuffleAllClient from "./ShuffleAllClient";

export const metadata: Metadata = appScreenMetadata("Bland alle kort");

export default function ShuffleAllPage() {
  return <ShuffleAllClient />;
}
