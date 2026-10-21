"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { JOKER_KEY } from "@/lib/joker";

export function JokerSetting() {
  const [on, setOn] = useLocalStorage<boolean>(JOKER_KEY, true);
  return (
    <label className="mt-4 flex min-h-12 items-center justify-between gap-4 rounded-xl bg-flade px-4 py-2 ring-1 ring-streg">
      <span>
        <span className="block font-semibold">Joker cards</span>
        <span className="text-sm text-blaek-2">About every tenth card is a joker, such as &ldquo;ask a question of your own&rdquo;.</span>
      </span>
      <input type="checkbox" checked={on ?? true} onChange={(e) => setOn(e.target.checked)} className="h-6 w-6 shrink-0 accent-[var(--bord)]" />
    </label>
  );
}
