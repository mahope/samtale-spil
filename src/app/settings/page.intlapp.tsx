import { AppScreen } from "@/components/app/AppScreen";
import { Settings } from "@/intl/app/Settings";

export const metadata = { title: "Settings" };

export default function SettingsScreen() {
  return (
    <AppScreen title="Settings" back={{ href: "/more/", label: "More" }}>
      <Settings />
    </AppScreen>
  );
}
