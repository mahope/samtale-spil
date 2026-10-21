import { AppScreen } from "@/components/app/AppScreen";
import { AppRow, AppSection } from "@/components/app/AppList";
import { IconBlyant, IconBog, IconFest, IconHaand, IconInfo, IconLaas, IconSoejler, IconTandhjul } from "@/components/app/icons";
import { version } from "../../../package.json";
import { AppShareRow, AppVersion } from "@/components/app/AppShareRow";
import { SITE_URL } from "@/config/site";

export const metadata = { title: "Mere" };

const icon = "h-[19px] w-[19px]";

/** The Mere tab: settings, your own things, and everything about the game */
export default function MereTab() {
  return (
    <AppScreen title="Mere">
      <AppSection>
        <AppRow href="/indstillinger/" label="Indstillinger" icon={<IconTandhjul className={icon} />} tone="#66756e" />
      </AppSection>

      <AppSection title="Dit spil">
        <AppRow href="/mine-spoergsmaal/" label="Dine egne spørgsmål" icon={<IconBlyant className={icon} />} tone="#c06a1f" />
        <AppRow href="/statistik/" label="Statistik" icon={<IconSoejler className={icon} />} tone="#2f6b8f" />
      </AppSection>

      <AppSection title="Om spillet">
        <AppRow href="/saadan-spiller-i/" label="Sådan spiller I" icon={<IconBog className={icon} />} tone="#1d4a38" />
        <AppRow href="/lege/" label="Lege til festen" icon={<IconFest className={icon} />} tone="#c8384f" />
        <AppRow href="/ikke-terapi/" label="Når det bliver svært" icon={<IconHaand className={icon} />} tone="#6d4a7e" />
        <AppRow href="/om/" label="Om Snakkespil" icon={<IconInfo className={icon} />} tone="#4b5a53" />
        <AppRow href="/privatliv/" label="Privatliv" icon={<IconLaas className={icon} />} tone="#2c6650" />
      </AppSection>

      <AppSection>
        <AppShareRow
          label="Del Snakkespil"
          text="Snakkespil: gratis samtalekort på dansk til par, familie og venner."
          url={`${SITE_URL}/`}
          copied="Linket er kopieret"
        />
      </AppSection>

      <p className="mt-8 text-center text-[13px] text-blaek-2">
        <AppVersion name="Snakkespil" fallback={version} />
        <br />
        Gratis, uden reklamer og uden konto.
      </p>
    </AppScreen>
  );
}
