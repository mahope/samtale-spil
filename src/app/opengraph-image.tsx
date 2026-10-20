import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Snakkespil: gratis samtalekort på dansk";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    title: "Gratis samtalekort og samtalespil på dansk",
    categoryId: "parforhold",
    categoryName: "Parforhold",
    question: "Hvad er dit yndlingsminde fra vores tid sammen?",
  });
}
