import { AppTextScreen } from "@/components/app/AppTextScreen";
import { HOW_TO_PLAY_LEAD, HowToPlayText } from "@/intl/content";

export const metadata = { title: "How to play" };

export default function HowToPlayScreen() {
  return (
    <AppTextScreen title="How to play" lead={HOW_TO_PLAY_LEAD}>
      <HowToPlayText app />
    </AppTextScreen>
  );
}
