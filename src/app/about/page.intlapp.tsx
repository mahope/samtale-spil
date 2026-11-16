import { AppTextScreen } from "@/components/app/AppTextScreen";
import { AboutText } from "@/intl/content";
import { screens } from "@/locale/screens";

export const metadata = { title: screens.pages.about };

export default function AboutScreen() {
  return (
    <AppTextScreen title={screens.pages.about}>
      <AboutText />
    </AppTextScreen>
  );
}
