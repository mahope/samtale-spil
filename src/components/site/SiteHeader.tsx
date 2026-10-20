import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "/spil/", label: "Kategorier" },
  { href: "/favoritter/", label: "Favoritter" },
];

/** Top bar for the content pages. The play screen has its own compact header. */
export function SiteHeader({ tone = "papir" }: { tone?: "papir" | "filt" }) {
  const onFelt = tone === "filt";
  return (
    <header className={`pt-safe ${onFelt ? "filt" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="rounded-lg py-1" aria-label="Snakkespil, til forsiden">
          <Logo />
        </Link>
        <nav aria-label="Hovedmenu" className="flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`min-h-11 items-center rounded-lg px-3 text-[0.95rem] font-semibold ${item.href === "/spil/" ? "inline-flex" : "hidden sm:inline-flex"} ${
                onFelt ? "text-white/90 hover:bg-white/10" : "text-blaek-2 hover:bg-flade-2 hover:text-blaek"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle className={onFelt ? "text-white/90" : "text-blaek-2"} />
        </nav>
      </div>
    </header>
  );
}
