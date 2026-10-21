"use client";

import { useEffect, useState } from "react";
import { AppRow } from "./AppList";
import { IconDel } from "./icons";
import { appVersion, shareText } from "@/lib/platform";

/** "Del appen": the share sheet in the app, Web Share or the clipboard in a browser */
export function AppShareRow({ label, text, url, copied }: { label: string; text: string; url: string; copied: string }) {
  const [status, setStatus] = useState<string | null>(null);
  return (
    <AppRow
      label={label}
      detail={status ?? undefined}
      icon={<IconDel className="h-[19px] w-[19px]" />}
      tone="#b9831c"
      onClick={async () => {
        const result = await shareText(text, url);
        setStatus(result === "kopieret" ? copied : null);
      }}
    />
  );
}

/** The installed app's version and build; the package version in a browser preview */
export function AppVersion({ name, fallback }: { name: string; fallback: string }) {
  const [version, setVersion] = useState(fallback);
  useEffect(() => {
    appVersion().then((v) => v && setVersion(v));
  }, []);
  return (
    <>
      {name} {version}
    </>
  );
}
