"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { isNative } from "@/lib/platform";
import { ui } from "@/locale/ui";
import { site } from "@/locale/site";
import { track } from "@/utils/track";

const subscribe = () => () => {};

/**
 * "Share as image" (#103). Hidden in the Capacitor apps: src/lib/native.ts has no file
 * sharing, and the app must not get new native code for this.
 */
export function ShareImageButton({
  text,
  categoryId,
  categoryName,
}: {
  text: string;
  categoryId: string;
  categoryName: string;
}) {
  // false while hydrating, so server and client markup match
  const visible = useSyncExternalStore(subscribe, () => !isNative(), () => false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  // Image drawn ahead of the tap, so navigator.share runs while the user activation is still valid (Safari/iOS)
  const prepared = useRef<{ key: string; blob: Promise<Blob> } | null>(null);

  const prepare = () => {
    const key = `${categoryId}|${text}`;
    if (prepared.current?.key === key) return prepared.current.blob;
    const blob = import("@/lib/shareImage").then(({ renderCardImage }) =>
      renderCardImage({ categoryId, categoryName, text, siteName: new URL(site.url).hostname })
    );
    blob.catch(() => {
      if (prepared.current?.blob === blob) prepared.current = null;
    });
    prepared.current = { key, blob };
    return blob;
  };

  // Load the chunk and the fonts as soon as the button exists
  useEffect(() => {
    if (visible) void import("@/lib/shareImage").catch(() => {});
  }, [visible]);

  if (!visible) return null;

  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    setFailed(false);
    try {
      const [{ shareOrDownload }, blob] = await Promise.all([import("@/lib/shareImage"), prepare()]);
      const result = await shareOrDownload(blob, ui.share.imageFile, ui.share.dialogTitle);
      // Only the deck id, never the question text
      if (result !== "afbrudt") track("Del-billede", { bunke: categoryId });
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <span className="rounded-full bg-white text-[#15201b] shadow-kort">
    <button
      type="button"
      onClick={handle}
      onPointerEnter={() => void prepare().catch(() => {})}
      onFocus={() => void prepare().catch(() => {})}
      disabled={busy}
      aria-label={failed ? ui.share.imageFailed : ui.share.image}
      title={failed ? ui.share.imageFailed : ui.share.image}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#4b5a53] transition-colors hover:bg-black/5 disabled:opacity-50"
    >
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16l-5-5-8 9" />
      </svg>
    </button>
    </span>
  );
}
