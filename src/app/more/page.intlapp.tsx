import { AppScreen } from "@/components/app/AppScreen";
import { AppRow, AppSection } from "@/components/app/AppList";
import { AppShareRow, AppVersion } from "@/components/app/AppShareRow";
import { IconBog, IconFest, IconInfo, IconLaas, IconTandhjul } from "@/components/app/icons";
import { site } from "@/locale/site";
import { version } from "../../../package.json";

export const metadata = { title: "More" };

const icon = "h-[19px] w-[19px]";

/** The More tab: settings and everything about the game */
export default function MoreTab() {
  return (
    <AppScreen title="More">
      <AppSection>
        <AppRow href="/settings/" label="Settings" icon={<IconTandhjul className={icon} />} tone="#66756e" />
      </AppSection>

      <AppSection title="About the game">
        <AppRow href="/how-to-play/" label="How to play" icon={<IconBog className={icon} />} tone="#1d4a38" />
        <AppRow href="/games/" label="Party games" icon={<IconFest className={icon} />} tone="#c8384f" />
        <AppRow href="/about/" label="About Goodtalk" icon={<IconInfo className={icon} />} tone="#4b5a53" />
        <AppRow href="/privacy/" label="Privacy" icon={<IconLaas className={icon} />} tone="#2c6650" />
      </AppSection>

      <AppSection>
        <AppShareRow
          label="Share Goodtalk"
          text="Goodtalk: free conversation cards for couples, families and friends."
          url={`${site.url}/`}
          copied="Link copied"
        />
      </AppSection>

      <p className="mt-8 text-center text-[13px] text-blaek-2">
        <AppVersion name={site.name} fallback={version} />
        <br />
        Free, with no ads and no account.
      </p>
    </AppScreen>
  );
}
