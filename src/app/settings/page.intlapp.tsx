import { AppScreen } from "@/components/app/AppScreen";
import { Settings } from "@/intl/app/Settings";
import { screens } from "@/locale/screens";

export const metadata = { title: screens.settings.title };

export default function SettingsScreen() {
  return (
    <AppScreen title={screens.settings.title} back={{ href: "/more/", label: screens.more.title }}>
      <Settings />
    </AppScreen>
  );
}
