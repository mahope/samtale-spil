import { renderOgImage } from "@/lib/ogImage";

export const dynamic = "force-static";

export function GET() {
  return renderOgImage({
    title: "Free conversation cards for couples, families and friends",
    categoryId: "parforhold",
    categoryName: "Couples",
    question: "What is your favorite memory of the two of us?",
  });
}
