import { AppScreen } from "@/components/app/AppScreen";
import { AppSettings } from "./AppSettings";

export const metadata = { title: "Indstillinger" };

export default function IndstillingerScreen() {
  return (
    <AppScreen title="Indstillinger" back={{ href: "/mere/", label: "Mere" }}>
      <AppSettings />
    </AppScreen>
  );
}
