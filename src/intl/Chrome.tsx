import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { site } from "@/locale/site";
import { intlGroups } from "@/intl/data";
import { ThemeToggle, type ThemeToggleTexts } from "@/components/ThemeToggle";
import { SiteNav, type NavItem, type NavTexts } from "@/components/site/SiteNav";
import { StoreButtons, type StoreTexts } from "@/components/site/StoreButtons";
import { SHOW_APP_PROMO } from "@/config/site";
import { homeLanguages } from "@/locales/sites";

const nav: NavItem[] = [
  { href: "/play/", label: "Play" },
  { href: "/questions/", label: "Questions" },
  { href: "/games/", label: "Games" },
  { href: "/guide/", label: "Guides" },
  ...(SHOW_APP_PROMO ? [{ href: "/app/", label: "App" }] : []),
];

const texts: NavTexts = {
  label: "Main",
  open: "Menu",
  close: "Close",
  cta: { href: "/play/", label: "Choose a deck" },
  theme: { label: "Theme", light: "Light", dark: "Dark", system: "System" },
};

const themeTexts: ThemeToggleTexts = { title: "Theme", switch: "Change theme", now: "now", light: "Light", dark: "Dark", system: "System" };

export const STORE_TEXTS_EN: StoreTexts = {
  ios: "Download on the App Store",
  android: "Get it on Google Play",
  soon: "Coming soon to the App Store and Google Play.",
};

function HomeLink() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg py-1" aria-label={`${site.name}, home`}>
      <LogoMark size={34} />
      <span className="font-display text-[1.375rem] font-bold leading-none tracking-[-0.02em]" style={{ fontStretch: "88%" }}>
        {site.name}
      </span>
    </Link>
  );
}

/** Header for the international sites (issue #30). Texts are English; Goodtalk is the only one so far. */
export function IntlHeader({ tone = "papir" }: { tone?: "papir" | "filt" }) {
  const onFelt = tone === "filt";
  return (
    <header className={`pt-safe ${onFelt ? "filt" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <HomeLink />
        <SiteNav
          items={nav}
          texts={texts}
          tone={tone}
          logo={<HomeLink />}
          themeToggle={<ThemeToggle texts={themeTexts} className={onFelt ? "text-white/90" : "text-blaek-2"} />}
        />
      </div>
    </header>
  );
}

type FooterLink = { href: string; label: string };

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

/** `danishHref` is the same page on snakkespil.dk where one exists; otherwise its front page */
export function IntlFooter({ danishHref }: { danishHref?: string }) {
  const play: FooterLink[] = [
    { href: "/play/", label: "Choose a deck" },
    { href: "/daily-question/", label: "Question of the day" },
    { href: "/question-generator/", label: "Question generator" },
    { href: "/games/", label: "Party games" },
    { href: "/print/", label: "Printable cards" },
  ];
  const questions: FooterLink[] = [
    { href: "/questions/", label: "All questions" },
    ...intlGroups()
      .flatMap((g) => g.decks.slice(0, 2))
      .slice(0, 6)
      .map((d) => ({ href: `/questions/${d.slug}/`, label: d.name })),
  ];
  const help: FooterLink[] = [
    { href: "/how-to-play/", label: "How to play" },
    { href: "/guide/", label: "Guides" },
    ...(SHOW_APP_PROMO ? [{ href: "/app/", label: "The app" }] : []),
    { href: "/about/", label: "About" },
    { href: "/stats/", label: "What people play" },
    { href: "/settings/", label: "Settings" },
  ];
  const legal: FooterLink[] = [
    { href: "/privacy/", label: "Privacy" },
    { href: "/how-to-play/#not-therapy", label: "A game, not therapy" },
  ];
  return (
    <footer className="mt-24 border-t border-streg pb-safe">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_3fr]">
        <div className="max-w-sm">
          <LogoMark size={40} />
          <p className="mt-4 text-[0.95rem] text-blaek-2">
            Free conversation cards. No account and no ads, and anything you save stays on your own device.
          </p>
          {SHOW_APP_PROMO && (
            <div className="mt-6 rounded-2xl bg-flade p-5 ring-1 ring-streg">
              <h2 className="text-base font-bold">{site.name} as an app</h2>
              <p className="mt-1 text-[0.95rem] text-blaek-2">For iPhone and Android, also offline.</p>
              <div className="mt-3 text-[0.95rem]">
                <StoreButtons texts={STORE_TEXTS_EN} />
              </div>
              <Link href="/app/" className="mt-3 inline-flex min-h-8 items-center text-[0.95rem] font-semibold underline">
                About the app
              </Link>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          <Column title="Play" links={play} />
          <Column title="Questions" links={questions} />
          <Column title="Help and about" links={help} />
          <Column title="Legal" links={legal} />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-streg py-6 text-sm text-blaek-2">
          <p>
            Made by <a href="https://mahoje.dk" className="underline hover:text-blaek">Mahope</a> in Denmark.
          </p>
          <p>
            <span lang="da">På dansk: </span>
            <a href={danishHref ?? homeLanguages.da} hrefLang="da" lang="da" className="inline-flex min-h-8 items-center font-semibold underline hover:text-blaek">
              Snakkespil
            </a>
          </p>
        </div>
      </div>
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
