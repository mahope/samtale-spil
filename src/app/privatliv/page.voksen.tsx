import { AppTextScreen } from "@/components/app/AppTextScreen";
import { PRIVATLIV_LEAD, PrivatlivTekst } from "@/voksen/Tekster";

export const metadata = { title: "Privatliv" };

export default function PrivatlivScreen() {
  return (
    <AppTextScreen title="Privatliv" lead={PRIVATLIV_LEAD}>
      <PrivatlivTekst />
    </AppTextScreen>
  );
}
