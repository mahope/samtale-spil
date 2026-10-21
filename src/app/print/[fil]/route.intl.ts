import { intlPrintDecks } from "@/intl/printDecks";
import { buildPrintPdf } from "@/lib/printPdf";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return intlPrintDecks.map((d) => ({ fil: `${d.fil}.pdf` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ fil: string }> }) {
  const { fil } = await params;
  const deck = intlPrintDecks.find((d) => `${d.fil}.pdf` === fil);
  if (!deck) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(await buildPrintPdf(deck)), { headers: { "Content-Type": "application/pdf" } });
}
