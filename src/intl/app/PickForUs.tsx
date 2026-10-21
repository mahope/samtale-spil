"use client";

import { useRouter } from "next/navigation";
import { IconTerning } from "@/components/app/icons";
import { tap } from "@/lib/platform";

/** The Play tab's quick choice: open a deck picked at random */
export function PickForUs({ slugs }: { slugs: string[] }) {
  const router = useRouter();
  return (
    <div className="px-4">
      <button
        type="button"
        data-ripple
        onClick={() => {
          tap();
          router.push(`/play/${slugs[Math.floor(Math.random() * slugs.length)]}/`);
        }}
        className="app-press inline-flex min-h-9 items-center gap-1.5 rounded-full bg-flade px-3.5 text-[15px] font-semibold ring-1 ring-streg android:min-h-8 android:rounded-lg android:bg-transparent android:px-3 android:text-sm android:font-medium android:ring-blaek-2/50"
      >
        <IconTerning className="h-[1.1rem] w-[1.1rem]" />
        Pick for us
      </button>
    </div>
  );
}
