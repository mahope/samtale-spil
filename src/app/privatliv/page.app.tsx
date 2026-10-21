import { AppTextScreen } from "@/components/app/AppTextScreen";
import { PrivatlivIndhold, PRIVATLIV_LEAD } from "./PrivatlivIndhold";

export const metadata = { title: "Privatliv" };

export default function PrivatlivScreen() {
  return (
    <AppTextScreen title="Privatliv" lead={PRIVATLIV_LEAD}>
      <PrivatlivIndhold />
    </AppTextScreen>
  );
}
