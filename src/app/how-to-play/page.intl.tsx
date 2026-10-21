import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { IntlTextPage } from "@/intl/Chrome";
import { HOW_TO_PLAY_LEAD, HowToPlayText } from "@/intl/content";

export const metadata: Metadata = {
  title: "How to Play Conversation Cards",
  description: "Start light, everyone answers, ask a follow-up, and skip whenever you like. Simple tips for good conversations, and what to do when a talk gets hard.",
  alternates: { canonical: "/how-to-play/" },
  openGraph: { ...OG_BASE, url: "/how-to-play/" },
};

export default function HowToPlay() {
  return (
    <IntlTextPage title="How to play" lead={HOW_TO_PLAY_LEAD}>
      <HowToPlayText />
    </IntlTextPage>
  );
}
