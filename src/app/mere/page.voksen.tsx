import { AppScreen } from "@/components/app/AppScreen";
import { AppRow, AppSection } from "@/components/app/AppList";
import { AppShareRow, AppVersion } from "@/components/app/AppShareRow";
import { IconHaand, IconInfo, IconLaas, IconTandhjul } from "@/components/app/icons";
import { SITE_URL } from "@/config/site";
import { version } from "../../../package.json";

export const metadata = { title: "Mere" };

const icon = "h-[19px] w-[19px]";

/** The Mere tab of the 18+ app: settings and everything about the app */
export default function MereTab() {
  return (
    <AppScreen title="Mere">
      <AppSection>
        <AppRow href="/indstillinger/" label="Indstillinger" icon={<IconTandhjul className={icon} />} tone="#66756e" />
      </AppSection>

      <AppSection title="Om appen">
        <AppRow href="/ikke-terapi/" label="Når det bliver svært" icon={<IconHaand className={icon} />} tone="#6d4a7e" />
        <AppRow href="/om/" label="Om Snakkespil 18+" icon={<IconInfo className={icon} />} tone="#4b5a53" />
        <AppRow href="/privatliv/" label="Privatliv" icon={<IconLaas className={icon} />} tone="#7a3462" />
      </AppSection>

      <AppSection>
        <AppShareRow
          label="Del Snakkespil 18+"
          text="Snakkespil 18+: frække samtalekort og udfordringer til par."
          url={`${SITE_URL}/`}
          copied="Linket er kopieret"
        />
      </AppSection>

      <p className="mt-8 text-center text-[13px] text-blaek-2">
        <AppVersion name="Snakkespil 18+" fallback={version} />
        <br />
        Et samtalespil til voksne par. Ikke terapi.
      </p>
    </AppScreen>
  );
}
