import { AppTextScreen } from "@/components/app/AppTextScreen";
import { OM_LEAD, OmTekst } from "@/voksen/Tekster";

export const metadata = { title: "Om Snakkespil 18+" };

export default function OmScreen() {
  return (
    <AppTextScreen title="Om Snakkespil 18+" lead={OM_LEAD}>
      <OmTekst />
    </AppTextScreen>
  );
}
