import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { IntlTextPage } from "@/intl/Chrome";
import { JokerSetting } from "./JokerSetting";

export const metadata: Metadata = appScreenMetadata("Settings");

export default function SettingsPage() {
  return (
    <IntlTextPage title="Settings">
      <h2>The game</h2>
      <JokerSetting />
      <p className="text-blaek-2">Settings are saved in this browser only.</p>
    </IntlTextPage>
  );
}
