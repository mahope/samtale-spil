import { AppScreen } from "@/components/app/AppScreen";
import { dailyPool } from "@/intl/daily";
import { danishDateKey } from "@/lib/dagDato";
import { DailyCard } from "./DailyCard";
import { screens } from "@/locale/screens";

export const metadata = { title: screens.today.title };

/** The Today tab: the card of the day, the same one Snakkespil shows */
export default function TodayTab() {
  return (
    <AppScreen title={screens.today.title}>
      <div className="px-4">
        <p className="text-blaek-2">{screens.today.lead}</p>
        <DailyCard buildKey={danishDateKey(new Date())} pool={dailyPool} app />
      </div>
    </AppScreen>
  );
}
