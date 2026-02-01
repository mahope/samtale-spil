import { Metadata } from "next";
import CustomQuestionsClient from "./CustomQuestionsClient";

export const metadata: Metadata = {
  title: "Mine Spørgsmål - Samtalekort",
  description: "Spil med dine egne samtalespørgsmål",
};

export default function CustomQuestionsPage() {
  return <CustomQuestionsClient />;
}
