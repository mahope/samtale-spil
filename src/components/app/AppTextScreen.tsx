import type { ReactNode } from "react";
import { TEXT_PAGE_PROSE } from "@/components/site/TextPage";
import { ui } from "@/locale/ui";
import { AppScreen } from "./AppScreen";

/** A pushed text screen (Om, Privatliv, Sådan spiller I) with the site's typography; back goes to the Mere tab */
export function AppTextScreen({
  title,
  lead,
  back = { href: ui.shell.moreHref, label: ui.shell.more },
  children,
}: {
  title: string;
  lead?: string;
  back?: { href: string; label: string };
  children: ReactNode;
}) {
  return (
    <AppScreen title={title} back={back}>
      <article className="mx-auto max-w-[40rem] px-5 pt-3">
        {lead && <p className="text-lg leading-relaxed">{lead}</p>}
        <div className={TEXT_PAGE_PROSE}>{children}</div>
      </article>
    </AppScreen>
  );
}
