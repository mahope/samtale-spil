import { AppScreen } from "@/components/app/AppScreen";
import { Indstillinger } from "@/voksen/Indstillinger";

export const metadata = { title: "Indstillinger" };

export default function IndstillingerScreen() {
  return (
    <AppScreen title="Indstillinger" back={{ href: "/mere/", label: "Mere" }}>
      <Indstillinger />
    </AppScreen>
  );
}
