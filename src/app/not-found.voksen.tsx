import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto max-w-xl px-4 pt-16 text-center sm:px-6">
      <h1 className="text-4xl font-extrabold">Det kort findes ikke</h1>
      <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white">
        Vælg en bunke
      </Link>
    </main>
  );
}
