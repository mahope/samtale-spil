import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDeck, markColorOnWhite } from "@/data/decks";
import { site } from "@/locale/site";

export const OG_SIZE = { width: 1200, height: 630 };

// Read at build time; satori needs TTF/OTF/WOFF, not WOFF2
const font = (weight: 700 | 800) => ({
  name: "Bricolage",
  weight,
  style: "normal" as const,
  data: readFileSync(join(process.cwd(), `assets/fonts/bricolage-grotesque-latin-${weight}-normal.woff`)),
});

/**
 * Share image: the felt table with a deck and one card face up.
 * Rendered at build time (static export), so it ships as a plain PNG.
 */
export function renderOgImage({
  title,
  categoryId,
  categoryName,
  question,
}: {
  title: string;
  categoryId: string;
  categoryName: string;
  question: string;
}) {
  const deck = getDeck(categoryId);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#1d4a38",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 610 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f4c04e", display: "flex" }} />
            {site.name}
          </div>
          <div style={{ fontSize: title.length > 40 ? 62 : 74, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.8)" }}>{site.ogTagline}</div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 420, marginLeft: 30 }}>
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 10,
              width: 330,
              height: 470,
              borderRadius: 26,
              background: deck.bg,
              transform: "rotate(8deg)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 30,
              top: 20,
              width: 330,
              height: 470,
              borderRadius: 26,
              background: "#ffffff",
              color: "#15201b",
              transform: "rotate(-3deg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "28px 30px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
              <span style={{ fontWeight: 800, color: markColorOnWhite(deck), fontSize: 30 }}>{deck.mark}</span>
              <span style={{ color: "#4b5a53" }}>{categoryName}</span>
            </div>
            <div style={{ fontSize: question.length > 70 ? 32 : 38, fontWeight: 700, lineHeight: 1.15 }}>{question}</div>
            <div style={{ display: "flex" }} />
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [font(700), font(800)] }
  );
}
