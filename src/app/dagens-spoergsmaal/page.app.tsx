import { AppScreen } from "@/components/app/AppScreen";
import { danishDateKey } from "@/lib/dagensKort";
import { DagensKortVisning } from "./DagensKortVisning";

export const metadata = { title: "I dag" };

/** The I dag tab: today's card, the same one the reminder sends */
export default function IDagTab() {
  return (
    <AppScreen title="I dag">
      <div className="px-4">
        <p className="text-blaek-2">Et nyt kort hver dag. Tag det med til aftensmaden eller på gåturen.</p>
        <DagensKortVisning buildKey={danishDateKey(new Date())} app />
      </div>
    </AppScreen>
  );
}
