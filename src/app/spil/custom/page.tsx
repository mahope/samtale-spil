import { Metadata } from "next";
import { Suspense } from "react";
import CustomQuestionsClient from "./CustomQuestionsClient";

export const metadata: Metadata = {
  title: "Mine Spørgsmål - Samtalekort",
  description: "Spil med dine egne samtalespørgsmål",
};

function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function CustomQuestionsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CustomQuestionsClient />
    </Suspense>
  );
}
