import type { Metadata } from "next";
import Link from "next/link";
import { APPS_LIVE, OG_BASE } from "@/config/site";
import { site } from "@/locale/site";
import { IntlHeader, IntlFooter, STORE_TEXTS_EN } from "@/intl/Chrome";
import { StoreButtons } from "@/components/site/StoreButtons";
import { INTL_CARD_COUNT } from "@/intl/data";

const title = `${site.name} app for iPhone and Android`;
const description = `The ${site.name} app has the same free conversation cards as the website. It works offline, needs no account and has no ads.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/app/", languages: { en: "https://goodtalkcards.com/app/", da: "https://snakkespil.dk/app/" } },
  openGraph: { ...OG_BASE, url: "/app/", title, description },
};

const features = [
  { title: "Works offline", text: "Every card lives in the app. Play at the cabin, on the train or on a plane." },
  { title: "Every deck and game", text: "Couples, families, kids, friends and the party games, all in one place." },
  { title: "No account", text: "Nothing to sign up for and nothing to log in to. Open the app and draw a card." },
  { title: "No ads", text: "The app is free and has no ads, just like the website." },
];

export default function AppPage() {
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          {site.name} as an app
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          The same {INTL_CARD_COUNT.toLocaleString("en-US")} questions as on this website, in an app for iPhone and Android. It is free,
          and it suits a phone that gets passed around the table.
        </p>
        <div className="mt-7">
          <StoreButtons texts={STORE_TEXTS_EN} />
        </div>

        <h2 className="mt-14 text-2xl font-bold sm:text-3xl">What the app does</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f.title} className="rounded-2xl bg-flade p-5 ring-1 ring-streg">
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-1.5 leading-relaxed text-blaek-2">{f.text}</p>
            </li>
          ))}
        </ul>

        {!APPS_LIVE && (
          <>
            <h2 className="mt-14 text-2xl font-bold sm:text-3xl">Until then</h2>
            <p className="mt-3 leading-relaxed">
              Every card already works in the browser on your phone. Open the site and choose &quot;Add to Home Screen&quot; in the
              browser menu, and {site.name} sits next to your other apps.
            </p>
            <Link
              href="/play/"
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-bord px-6 dark:bg-kridt dark:text-kridt-blaek dark:hover:bg-kridt/90 text-base font-bold text-white hover:bg-bord-lys"
            >
              Choose a deck
            </Link>
          </>
        )}
        <p className="mt-8 text-[0.95rem] text-blaek-2">
          Anything you save in the app stays on your phone. Read more in our <Link href="/privacy/" className="underline">privacy policy</Link>.
        </p>
      </main>
      <IntlFooter danishHref="https://snakkespil.dk/app/" />
    </>
  );
}
