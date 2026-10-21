import { AppTextScreen } from "@/components/app/AppTextScreen";
import { SaadanIndhold, SAADAN_LEAD } from "./SaadanIndhold";

export const metadata = { title: "Sådan spiller I" };

export default function SaadanScreen() {
  return (
    <AppTextScreen title="Sådan spiller I" lead={SAADAN_LEAD}>
      <SaadanIndhold app />
    </AppTextScreen>
  );
}
