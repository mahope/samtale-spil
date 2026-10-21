import Link from "next/link";

/**
 * Shown on every guide: Snakkespil is a conversation game, and where to find real help.
 * The 18+ app has no Sådan spiller I, so it passes saadanHref={null}.
 */
export function IkkeTerapi({ saadanHref = "/saadan-spiller-i/" }: { saadanHref?: string | null }) {
  return (
    <aside aria-labelledby="ikke-terapi" className="my-8 rounded-2xl bg-flade p-5 ring-1 ring-streg">
      <h2 id="ikke-terapi" className="text-lg font-bold">
        Et samtalespil, ikke behandling
      </h2>
      <p className="mt-2">
        Øvelserne her kan gøre det lettere at tale sammen, men de erstatter ikke hjælp fra en fagperson. Fylder noget
        meget, eller går de samme konflikter i ring, så tal med din egen læge, som kan henvise til psykolog eller
        parterapeut. Mange kommuner har også gratis og anonym familierådgivning.
      </p>
      <ul className="mt-3 space-y-1">
        <li>
          <strong>Livslinien</strong>, hvis du har tanker om selvmord: <a href="tel:+4570201201" className="underline">70 201 201</a>
        </li>
        <li>
          <strong>Lev Uden Vold</strong>, hvis der er vold i et nært forhold, hele døgnet: <a href="tel:1888" className="underline">1888</a>
        </li>
        <li>Er nogen i akut fare, så ring 112.</li>
      </ul>
      {saadanHref && (
        <p className="mt-3 text-[0.95rem]">
          Mere om det i <Link href={saadanHref} className="underline">Sådan spiller I</Link>.
        </p>
      )}
    </aside>
  );
}
