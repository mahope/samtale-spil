import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteNav, type NavItem, type NavTexts } from "@/components/site/SiteNav";

const nav: NavItem[] = [
  { href: "/spil/", label: "Spil" },
  { href: "/spoergsmaal/", label: "Spørgsmål" },
  { href: "/lege/", label: "Lege" },
  { href: "/guide/", label: "Guides" },
  { href: "/app/", label: "Appen" },
  { href: "/favoritter/", label: "Favoritter" },
];

const texts: NavTexts = {
  label: "Hovedmenu",
  open: "Menu",
  close: "Luk",
  cta: { href: "/spil/", label: "Vælg et spil" },
  theme: { label: "Tema", light: "Lys", dark: "Mørk", system: "System" },
};

/** Top bar for the content pages. The play screen has its own compact header. */
export function SiteHeader({ tone = "papir" }: { tone?: "papir" | "filt" }) {
  const onFelt = tone === "filt";
  return (
    <header className={`pt-safe ${onFelt ? "filt" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="rounded-lg py-1" aria-label="Snakkespil, til forsiden">
          <Logo />
        </Link>
        <SiteNav
          items={nav}
          texts={texts}
          tone={tone}
          logo={
            <Link href="/" className="rounded-lg py-1" aria-label="Snakkespil, til forsiden">
              <Logo />
            </Link>
          }
          themeToggle={<ThemeToggle className={onFelt ? "text-white/90" : "text-blaek-2"} />}
        />
      </div>
    </header>
  );
}
