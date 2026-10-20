import { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { ShuffleAllLoader } from "./ShuffleAllLoader";

export const metadata: Metadata = appScreenMetadata("Bland alle kort");

export default function ShuffleAllPage() {
  return <ShuffleAllLoader />;
}
