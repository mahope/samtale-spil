import { AppScreen } from "@/components/app/AppScreen";
import { AppRow, AppSection } from "@/components/app/AppList";
import { AppShareRow, AppVersion } from "@/components/app/AppShareRow";
import { AppLanguage } from "@/components/app/AppLanguage";
import { IconBog, IconFest, IconInfo, IconLaas, IconTandhjul } from "@/components/app/icons";
import { site } from "@/locale/site";
import { screens } from "@/locale/screens";
import { version } from "../../../package.json";

const t = screens.more;

export const metadata = { title: t.title };

const icon = "h-[19px] w-[19px]";

/** The More tab: settings and everything about the game */
export default function MoreTab() {
  return (
    <AppScreen title={t.title}>
      <AppSection>
        <AppRow href="/settings/" label={t.settings} icon={<IconTandhjul className={icon} />} tone="#66756e" />
      </AppSection>

      <AppLanguage title={t.language} footer={t.languageFooter} />

      <AppSection title={t.aboutGame}>
        <AppRow href="/how-to-play/" label={t.howToPlay} icon={<IconBog className={icon} />} tone="#1d4a38" />
        <AppRow href="/games/" label={t.partyGames} icon={<IconFest className={icon} />} tone="#c8384f" />
        <AppRow href="/about/" label={t.about} icon={<IconInfo className={icon} />} tone="#4b5a53" />
        <AppRow href="/privacy/" label={t.privacy} icon={<IconLaas className={icon} />} tone="#2c6650" />
      </AppSection>

      <AppSection>
        <AppShareRow
          label={t.share}
          text={t.shareText}
          url={`${site.url}/`}
          copied={t.copied}
        />
      </AppSection>

      <p className="mt-8 text-center text-[13px] text-blaek-2">
        <AppVersion name={site.name} fallback={version} />
        <br />
        {t.free}
      </p>
    </AppScreen>
  );
}
