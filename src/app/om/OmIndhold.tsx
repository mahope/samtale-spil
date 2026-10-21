import Link from "next/link";
import { adultQuestions } from "@/data/questions/voksne";
import { QUESTION_COUNT, CATEGORY_COUNT } from "@/config/site";

export const OM_LEAD =
  "Snakkespil er et kortspil uden kort. Du trækker et spørgsmål, læser det højt, og så snakker I.";

/** The text of the page; the site wraps it in TextPage, the app in AppTextScreen */
export function OmIndhold() {
  return (
    <>
      <p>
        Idéen kommer fra de samtalekort, mange har liggende i en skuffe: en æske med spørgsmål, der får folk til at
        fortælle noget, de ellers ikke ville have sagt. Snakkespil gør det samme, bare på telefonen, gratis og på dansk.
      </p>
      <p>
        Der er {QUESTION_COUNT.toLocaleString("da-DK")} spørgsmål fordelt på {CATEGORY_COUNT} spil{adultQuestions.length > 0 && " og et spil kun for voksne"}.
        Hvert spørgsmål er mærket let, medium eller dyb, så I selv kan vælge, hvor langt ind I vil.
      </p>

      <h2>Hvem laver det</h2>
      <p>
        Snakkespil er lavet af Mads Holst Jensen, der driver det lille webbureau{" "}
        <a href="https://mahoje.dk">Mahope</a>. Spillet har ingen reklamer og samler ingen persondata, og sådan bliver
        det ved med at være.
      </p>

      <h2>Mangler du et spørgsmål?</h2>
      <p>
        Skriv til <a href="mailto:mads@mahoje.dk">mads@mahoje.dk</a> med dit forslag. Du kan også lave dit eget sæt
        under <Link href="/mine-spoergsmaal/">Dine egne spørgsmål</Link>.
      </p>
    </>
  );
}
