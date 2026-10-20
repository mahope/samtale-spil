import Link from "next/link";
import { categories } from "@/data/categories";
import { LogoMark } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-streg pb-safe">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_2fr]">
        <div className="max-w-xs">
          <LogoMark size={40} />
          <p className="mt-4 text-[0.95rem] text-blaek-2">
            Gratis samtalekort på dansk. Ingen konto, ingen reklamer, og det du gemmer, bliver på din egen enhed.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="text-base font-bold">Spørgsmål</h2>
            <ul className="mt-3 space-y-1.5 text-[0.95rem]">
              {categories.slice(0, 8).map((c) => (
                <li key={c.id}>
                  <Link href={`/spoergsmaal/${c.id}/`} className="text-blaek-2 hover:text-blaek hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold">Flere</h2>
            <ul className="mt-3 space-y-1.5 text-[0.95rem]">
              {categories.slice(8).map((c) => (
                <li key={c.id}>
                  <Link href={`/spoergsmaal/${c.id}/`} className="text-blaek-2 hover:text-blaek hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold">Snakkespil</h2>
            <ul className="mt-3 space-y-1.5 text-[0.95rem]">
              <li><Link href="/saadan-spiller-i/" className="text-blaek-2 hover:text-blaek hover:underline">Sådan spiller I</Link></li>
              <li><Link href="/lege/" className="text-blaek-2 hover:text-blaek hover:underline">Lege til festen</Link></li>
              <li><Link href="/guide/" className="text-blaek-2 hover:text-blaek hover:underline">Guides til bedre samtaler</Link></li>
              <li><Link href="/dagens-spoergsmaal/" className="text-blaek-2 hover:text-blaek hover:underline">Dagens spørgsmål</Link></li>
              <li><Link href="/generator/" className="text-blaek-2 hover:text-blaek hover:underline">Spørgsmålsgenerator</Link></li>
              <li><Link href="/om/" className="text-blaek-2 hover:text-blaek hover:underline">Om spillet</Link></li>
              <li><Link href="/privatliv/" className="text-blaek-2 hover:text-blaek hover:underline">Privatliv</Link></li>
              <li><Link href="/mine-spoergsmaal/" className="text-blaek-2 hover:text-blaek hover:underline">Dine egne spørgsmål</Link></li>
              <li><Link href="/statistik/" className="text-blaek-2 hover:text-blaek hover:underline">Din statistik</Link></li>
              <li><Link href="/statistik/samlet/" className="text-blaek-2 hover:text-blaek hover:underline">Hvad spiller folk?</Link></li>
              <li><Link href="/indstillinger/" className="text-blaek-2 hover:text-blaek hover:underline">Indstillinger</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-10 text-sm text-blaek-2 sm:px-6">
        Lavet af <a href="https://mahoje.dk" className="underline hover:text-blaek">Mahope</a> i Danmark.
      </p>
    </footer>
  );
}
