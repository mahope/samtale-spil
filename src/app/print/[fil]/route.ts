import { printDecks } from "@/data/printDecks";
import { buildPrintPdf } from "@/lib/printPdf";

// Built once at export time into out/print/<fil>.pdf
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return printDecks.map((d) => ({ fil: `${d.fil}.pdf` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ fil: string }> }) {
  const { fil } = await params;
  const deck = printDecks.find((d) => `${d.fil}.pdf` === fil);
  if (!deck) return new Response("Ikke fundet", { status: 404 });
  const pdf = await buildPrintPdf(deck);
  return new Response(new Uint8Array(pdf), {
    headers: { "Content-Type": "application/pdf" },
  });
}
