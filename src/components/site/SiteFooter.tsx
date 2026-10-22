import Link from "next/link";
import { categories } from "@/data/categories";
import { categoryTexts } from "@/data/categoryTexts";
import { LogoMark } from "@/components/brand/Logo";
import { StoreButtons } from "@/components/site/StoreButtons";
import { SHOW_APP_PROMO } from "@/config/site";
import { homeLanguages } from "@/locales/sites";

type FooterLink = { href: string; label: string };

const spil: FooterLink[] = [
  { href: "/spil/", label: "Vælg et spil" },
  { href: "/dagens-spoergsmaal/", label: "Dagens spørgsmål" },
  { href: "/generator/", label: "Spørgsmålsgenerator" },
  { href: "/lege/", label: "Lege til festen" },
  // PDF downloads do not work well inside the apps' web view
  ...(process.env.APP_BUILD !== "1" ? [{ href: "/print/", label: "Kort til print" }] : []),
  { href: "/mine-spoergsmaal/", label: "Dine egne spørgsmål" },
  { href: "/favoritter/", label: "Favoritter" },
];

const spoergsmaal: FooterLink[] = [
  { href: "/spoergsmaal/", label: "Alle spørgsmål" },
  { href: "/samtaler-ved-aftensmaden/", label: "Samtaler ved aftensmaden" },
  ...categories
    .filter((c) => categoryTexts[c.id])
    .slice(0, 6)
    .map((c) => ({ href: `/spoergsmaal/${c.id}/`, label: c.name })),
];

const omHjaelp: FooterLink[] = [
  { href: "/saadan-spiller-i/", label: "Sådan spiller I" },
  { href: "/guide/", label: "Guides til bedre samtaler" },
  ...(SHOW_APP_PROMO ? [{ href: "/app/", label: "Appen" }] : []),
  { href: "/om/", label: "Om Snakkespil" },
  { href: "/statistik/samlet/", label: "Hvad spiller folk?" },
  { href: "/statistik/", label: "Din statistik" },
  { href: "/indstillinger/", label: "Indstillinger" },
];

const juridisk: FooterLink[] = [
  { href: "/privatliv/", label: "Privatliv" },
  { href: "/ikke-terapi/", label: "Et spil, ikke terapi" },
];

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h2 className="text-base font-bold">{title}</h2>
      <ul className="mt-3 space-y-1 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-8 items-center text-blaek-2 hover:text-blaek hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Footer for the Danish site. `englishHref` is the same page on Goodtalk where one exists
 * (src/locales/alternates.ts); otherwise the language link goes to Goodtalk's front page.
 */
export function SiteFooter({ englishHref }: { englishHref?: string }) {
  return (
    <footer className="mt-24 border-t border-streg pb-safe">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_3fr]">
        <div className="max-w-sm">
          <LogoMark size={40} />
          <p className="mt-4 text-[0.95rem] text-blaek-2">
            Gratis samtalekort på dansk. Ingen konto, ingen reklamer, og det du gemmer, bliver på din egen enhed.
          </p>
          {SHOW_APP_PROMO && (
            <div className="mt-6 rounded-2xl bg-flade p-5 ring-1 ring-streg">
              <h2 className="text-base font-bold">Snakkespil som app</h2>
              <p className="mt-1 text-[0.95rem] text-blaek-2">Til iPhone og Android, også uden internet.</p>
              <div className="mt-3 text-[0.95rem]">
                <StoreButtons />
              </div>
              <Link href="/app/" className="mt-3 inline-flex min-h-8 items-center text-[0.95rem] font-semibold underline">
                Læs om appen
              </Link>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          <Column title="Spil" links={spil} />
          <Column title="Spørgsmål" links={spoergsmaal} />
          <Column title="Om og hjælp" links={omHjaelp} />
          <Column title="Juridisk" links={juridisk} />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-streg py-6 text-sm text-blaek-2">
          <p>
            Lavet af <a href="https://mahoje.dk" className="underline hover:text-blaek">Mahope</a> i Danmark.
          </p>
          <p>
            <span lang="en">In English: </span>
            <a href={englishHref ?? homeLanguages.en} hrefLang="en" lang="en" className="inline-flex min-h-8 items-center font-semibold underline hover:text-blaek">
              Goodtalk
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
