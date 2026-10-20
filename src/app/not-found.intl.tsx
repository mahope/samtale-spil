import Link from "next/link";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";

export default function NotFound() {
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-xl px-4 pt-16 text-center sm:px-6">
        <h1 className="text-4xl font-extrabold">This card is not in the deck</h1>
        <p className="mt-4 text-lg text-blaek-2">The page you were looking for does not exist.</p>
        <Link href="/play/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white">
          Choose a deck
        </Link>
      </main>
      <IntlFooter />
    </>
  );
}
