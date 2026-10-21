import { AppScreen } from "@/components/app/AppScreen";
import { dailyPool } from "@/intl/daily";
import { danishDateKey } from "@/lib/dagDato";
import { DailyCard } from "./DailyCard";

export const metadata = { title: "Today" };

/** The Today tab: the card of the day, the same one Snakkespil shows */
export default function TodayTab() {
  return (
    <AppScreen title="Today">
      <div className="px-4">
        <p className="text-blaek-2">A new card every day. Take it to dinner or on your walk.</p>
        <DailyCard buildKey={danishDateKey(new Date())} pool={dailyPool} app />
      </div>
    </AppScreen>
  );
}
