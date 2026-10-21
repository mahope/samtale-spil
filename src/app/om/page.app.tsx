import { AppTextScreen } from "@/components/app/AppTextScreen";
import { OmIndhold, OM_LEAD } from "./OmIndhold";

export const metadata = { title: "Om Snakkespil" };

export default function OmScreen() {
  return (
    <AppTextScreen title="Om Snakkespil" lead={OM_LEAD}>
      <OmIndhold />
    </AppTextScreen>
  );
}
