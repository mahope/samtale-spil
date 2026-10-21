import { AppTextScreen } from "@/components/app/AppTextScreen";
import { PRIVACY_LEAD, PrivacyText } from "@/intl/content";

export const metadata = { title: "Privacy" };

export default function PrivacyScreen() {
  return (
    <AppTextScreen title="Privacy" lead={PRIVACY_LEAD}>
      <PrivacyText app />
    </AppTextScreen>
  );
}
