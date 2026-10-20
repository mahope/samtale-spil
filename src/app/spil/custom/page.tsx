import { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { Suspense } from "react";
import { PlayScreenLoading } from "@/components/PlayScreen";
import CustomQuestionsClient from "./CustomQuestionsClient";

export const metadata: Metadata = appScreenMetadata("Spil med dine egne spørgsmål");

export default function CustomQuestionsPage() {
  return (
    <Suspense fallback={<PlayScreenLoading />}>
      <CustomQuestionsClient />
    </Suspense>
  );
}
