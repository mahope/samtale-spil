"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useTheme, type Theme } from "@/components/ThemeToggle";

export type NavItem = { href: string; label: string };

export type NavTexts = {
  label: string;
  open: string;
  close: string;
  cta: { href: string; label: string };
  theme: { label: string; light: string; dark: string; system: string };
};

const normalize = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** Is `href` the current page, or a section the current page lives under? */
function isActive(pathname: string, href: string) {
  const here = normalize(pathname);
  return href === "/" ? here === "/" : here.startsWith(href);
}

/**
 * Main menu for the website headers (Danish and international). Desktop shows the items inline;
 * below lg a "Menu" button opens a full-screen sheet (a modal <dialog>, so the page behind is
 * inert and focus stays inside). The play screens have their own header and never render this.
 */
export function SiteNav({
  items,
  texts,
  tone,
  logo,
  themeToggle,
}: {
  items: NavItem[];
  texts: NavTexts;
  tone: "papir" | "filt";
  /** The logo link, repeated at the top of the sheet so the layout does not move when it opens */
  logo: ReactNode;
  /** Desktop theme button */
  themeToggle?: ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  // The sheet remembers the page it was opened on, so it is closed again after navigation
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetId = useId();
  const onFelt = tone === "filt";

  // Open the dialog, lock page scroll while it is open, and give focus back to the button on close
  useEffect(() => {
    const dialog = dialogRef.current;
    const button = buttonRef.current;
    if (!open || !dialog) return;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    // Any link in the sheet closes it, also one to the page you are already on
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("a")) setOpenOn(null);
    };
    dialog.addEventListener("click", onClick);
    return () => {
      dialog.removeEventListener("click", onClick);
      if (dialog.open) dialog.close();
      root.style.overflow = previous;
      button?.focus();
    };
  }, [open]);

  const linkTone = onFelt ? "text-white/90 hover:bg-white/10" : "text-blaek-2 hover:bg-flade-2 hover:text-blaek";
  const activeTone = onFelt ? "text-white underline decoration-2 underline-offset-[6px]" : "text-blaek underline decoration-2 underline-offset-[6px]";

  return (
    <>
      <nav aria-label={texts.label} className="hidden items-center gap-1 lg:flex">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-lg px-3 text-[0.95rem] font-semibold ${active ? activeTone : linkTone}`}
            >
              {item.label}
            </Link>
          );
        })}
        {themeToggle}
      </nav>

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={sheetId}
        onClick={() => setOpen(true)}
        className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-[0.95rem] font-semibold lg:hidden ${linkTone}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        {texts.open}
      </button>

      <dialog
        ref={dialogRef}
        id={sheetId}
        aria-label={texts.label}
        onClose={() => setOpen(false)}
        className="menu-ark fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-papir p-0 text-blaek backdrop:bg-black/40 lg:hidden"
      >
        <div className="pt-safe pb-safe">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            {logo}
            <button
              ref={closeRef}
              type="button"
              aria-expanded={open}
              aria-controls={sheetId}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-[0.95rem] font-semibold text-blaek hover:bg-flade-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
              {texts.close}
            </button>
          </div>

          <nav aria-label={texts.label} className="mx-auto max-w-6xl px-4 pt-2 sm:px-6">
            <ul className="divide-y divide-streg border-y border-streg">
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-14 items-center justify-between gap-4 text-xl font-bold ${active ? "text-blaek" : "text-blaek hover:text-blaek-2"}`}
                    >
                      <span className={active ? "underline decoration-2 underline-offset-[6px]" : undefined}>{item.label}</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-blaek-2" aria-hidden="true">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={texts.cta.href}
              className="mt-8 flex min-h-13 w-full items-center justify-center rounded-full bg-bord px-6 text-lg font-bold text-white hover:bg-bord-lys"
            >
              {texts.cta.label}
            </Link>

            <ThemeChoice texts={texts.theme} />
          </nav>
        </div>
      </dialog>
    </>
  );
}

/** Light, dark or follow the system, as three large buttons */
function ThemeChoice({ texts }: { texts: NavTexts["theme"] }) {
  const { theme, mounted, setTheme } = useTheme();
  const options: { value: Theme; label: string }[] = [
    { value: "light", label: texts.light },
    { value: "dark", label: texts.dark },
    { value: "system", label: texts.system },
  ];
  return (
    <fieldset className="mt-10 pb-8">
      <legend className="text-[0.95rem] font-semibold text-blaek-2">{texts.label}</legend>
      <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-flade-2 p-1">
        {options.map((o) => {
          const selected = mounted && theme === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setTheme(o.value)}
              className={`min-h-11 rounded-lg text-base font-semibold ${selected ? "bg-flade text-blaek shadow-kort" : "text-blaek-2 hover:text-blaek"}`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
