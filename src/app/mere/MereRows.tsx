"use client";

import { useEffect, useState } from "react";
import { AppRow } from "@/components/app/AppList";
import { IconDel } from "@/components/app/icons";
import { appVersion, shareText } from "@/lib/platform";
import { SITE_URL } from "@/config/site";

/** "Del appen": the share sheet in the app, Web Share or the clipboard in a browser */
export function DelAppenRow() {
  const [status, setStatus] = useState<string | null>(null);
  return (
    <AppRow
      label="Del Snakkespil"
      detail={status ?? undefined}
      icon={<IconDel className="h-[19px] w-[19px]" />}
      tone="#b9831c"
      onClick={async () => {
        const result = await shareText("Snakkespil: gratis samtalekort på dansk til par, familie og venner.", `${SITE_URL}/`);
        setStatus(result === "kopieret" ? "Linket er kopieret" : null);
      }}
    />
  );
}

/** The installed app's version and build; the package version in a browser preview */
export function AppVersion({ fallback }: { fallback: string }) {
  const [version, setVersion] = useState(fallback);
  useEffect(() => {
    appVersion().then((v) => v && setVersion(v));
  }, []);
  return <>Snakkespil {version}</>;
}
