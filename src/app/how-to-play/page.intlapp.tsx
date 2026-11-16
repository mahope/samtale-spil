import { AppTextScreen } from "@/components/app/AppTextScreen";
import { HOW_TO_PLAY_LEAD, HowToPlayText } from "@/intl/content";
import { screens } from "@/locale/screens";

export const metadata = { title: screens.pages.howToPlay };

export default function HowToPlayScreen() {
  return (
    <AppTextScreen title={screens.pages.howToPlay} lead={HOW_TO_PLAY_LEAD}>
      <HowToPlayText app />
    </AppTextScreen>
  );
}
