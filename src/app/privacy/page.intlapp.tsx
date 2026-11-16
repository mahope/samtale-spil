import { AppTextScreen } from "@/components/app/AppTextScreen";
import { PRIVACY_LEAD, PrivacyText } from "@/intl/content";
import { screens } from "@/locale/screens";

export const metadata = { title: screens.pages.privacy };

export default function PrivacyScreen() {
  return (
    <AppTextScreen title={screens.pages.privacy} lead={PRIVACY_LEAD}>
      <PrivacyText app />
    </AppTextScreen>
  );
}
