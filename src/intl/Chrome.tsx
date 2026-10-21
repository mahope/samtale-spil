import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { site } from "@/locale/site";
import { intlGroups } from "@/intl/data";
import { ui } from "@/locale/ui";

/** Header for the international sites (issue #30). Texts are English; Goodtalk is the only one so far. */
export function IntlHeader({ tone = "papir" }: { tone?: "papir" | "filt" }) {
  const onFelt = tone === "filt";
  const link = `min-h-11 inline-flex items-center rounded-lg px-3 text-[0.95rem] font-semibold ${
    onFelt ? "text-white/90 hover:bg-white/10" : "text-blaek-2 hover:bg-flade-2 hover:text-blaek"
  }`;
  return (
    <header className={`pt-safe ${onFelt ? "filt" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg py-1" aria-label={`${site.name}, home`}>
          <LogoMark size={34} />
          <span className="font-display text-[1.375rem] font-bold leading-none tracking-[-0.02em]" style={{ fontStretch: "88%" }}>
            {site.name}
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <Link href="/play/" className={link}>
            Play
          </Link>
          <Link href="/questions/" className={`${link} hidden sm:inline-flex`}>
            Questions
          </Link>
          <Link href="/games/" className={`${link} hidden sm:inline-flex`}>
            Games
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function IntlFooter() {
  const groups = intlGroups();
  return (
    <footer className="mt-24 border-t border-streg pb-safe">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_2fr]">
        <div className="max-w-xs">
          <LogoMark size={40} />
          <p className="mt-4 text-[0.95rem] text-blaek-2">
            Free conversation cards. No account and no ads, and anything you save stays on your own device.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {groups.slice(0, 2).map((g) => (
            <div key={g.id}>
              <h2 className="text-base font-bold">{ui.groups[g.id]}</h2>
              <ul className="mt-3 space-y-1.5 text-[0.95rem]">
                {g.decks.slice(0, 6).map((d) => (
                  <li key={d.id}>
                    <Link href={`/questions/${d.slug}/`} className="text-blaek-2 hover:text-blaek hover:underline">
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-base font-bold">{site.name}</h2>
            <ul className="mt-3 space-y-1.5 text-[0.95rem]">
              <li><Link href="/questions/" className="text-blaek-2 hover:text-blaek hover:underline">All questions</Link></li>
              <li><Link href="/games/" className="text-blaek-2 hover:text-blaek hover:underline">Party games</Link></li>
              <li><Link href="/daily-question/" className="text-blaek-2 hover:text-blaek hover:underline">Question of the day</Link></li>
              <li><Link href="/question-generator/" className="text-blaek-2 hover:text-blaek hover:underline">Question generator</Link></li>
              <li><Link href="/guide/" className="text-blaek-2 hover:text-blaek hover:underline">Guides</Link></li>
              <li><Link href="/print/" className="text-blaek-2 hover:text-blaek hover:underline">Printable cards</Link></li>
              <li><Link href="/how-to-play/" className="text-blaek-2 hover:text-blaek hover:underline">How to play</Link></li>
              <li><Link href="/stats/" className="text-blaek-2 hover:text-blaek hover:underline">What people play</Link></li>
              <li><Link href="/settings/" className="text-blaek-2 hover:text-blaek hover:underline">Settings</Link></li>
              <li><Link href="/about/" className="text-blaek-2 hover:text-blaek hover:underline">About</Link></li>
              <li><Link href="/privacy/" className="text-blaek-2 hover:text-blaek hover:underline">Privacy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-10 text-sm text-blaek-2 sm:px-6">
        Made by <a href="https://mahoje.dk" className="underline hover:text-blaek">Mahope</a> in Denmark. Also in Danish as{" "}
        <a href="https://snakkespil.dk" hrefLang="da" className="underline hover:text-blaek">Snakkespil</a>.
      </p>
    </footer>
  );
}

/** A plain text page (about, privacy, how to play) */
export function IntlTextPage({ title, lead, children }: { title: string; lead?: string; children: React.ReactNode }) {
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-[40rem] px-4 pt-10 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          {title}
        </h1>
        {lead && <p className="mt-5 text-lg leading-relaxed">{lead}</p>}
        <div className="mt-8 space-y-5 leading-relaxed [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </main>
      <IntlFooter />
    </>
  );
}
