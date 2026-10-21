import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { getDeck, markColorOnWhite } from "@/data/decks";
import { site } from "@/locale/site";
import { ui } from "@/locale/ui";

/**
 * Print-yourself cards (issue #45): A4, 8 cards per sheet with cut lines, the back
 * in the deck's colour mirrored for double-sided printing, and 4 blank cards at the end.
 * Runs at build time only (src/app/print/[fil]/route.ts).
 */

const MM = 72 / 25.4;
const A4 = { w: 210 * MM, h: 297 * MM };
const CARD = { w: 95 * MM, h: 65 * MM };
const COLS = 2;
const ROWS = 4;
const PER_SHEET = COLS * ROWS;
const MARGIN = { x: (A4.w - COLS * CARD.w) / 2, y: (A4.h - ROWS * CARD.h) / 2 };
const INK = rgb(0.082, 0.125, 0.106);
const MUTED = rgb(0.35, 0.4, 0.38);
const LINE = rgb(0.75, 0.75, 0.75);

export interface PrintCard {
  text: string;
  /** Small label on the card, e.g. "Opgave"; omitted for plain questions */
  label?: string;
}

function hex(color: string) {
  const n = parseInt(color.slice(1), 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= width) line = next;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Top-left corner of slot i (0-7) in PDF coordinates; mirrored puts the columns in reverse for the back */
function slot(i: number, mirrored: boolean) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const c = mirrored ? COLS - 1 - col : col;
  return { x: MARGIN.x + c * CARD.w, y: A4.h - MARGIN.y - row * CARD.h };
}

function cutLines(page: PDFPage) {
  for (let c = 0; c <= COLS; c++) {
    const x = MARGIN.x + c * CARD.w;
    page.drawLine({ start: { x, y: MARGIN.y }, end: { x, y: A4.h - MARGIN.y }, thickness: 0.4, color: LINE, dashArray: [3, 3] });
  }
  for (let r = 0; r <= ROWS; r++) {
    const y = MARGIN.y + r * CARD.h;
    page.drawLine({ start: { x: MARGIN.x, y }, end: { x: A4.w - MARGIN.x, y }, thickness: 0.4, color: LINE, dashArray: [3, 3] });
  }
}

export async function buildPrintPdf(opts: { deckId: string; title: string; cards: PrintCard[] }): Promise<Uint8Array> {
  const deck = getDeck(opts.deckId);
  const bg = hex(deck.bg);
  const ink = hex(deck.ink);
  // Same rule as the card face on the site: deck colour where it reads on white
  const mark = hex(markColorOnWhite(deck));

  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const host = new URL(site.url).host;
  doc.setTitle(`${opts.title}: ${ui.print.titleSuffix}`);
  doc.setAuthor(site.name);
  doc.setSubject(`${ui.print.license} ${host}`);
  doc.setLanguage(site.ogLocale.replace("_", "-"));
  const fonts = path.join(process.cwd(), "assets", "fonts");
  const bold = await doc.embedFont(await readFile(path.join(fonts, "bricolage-grotesque-latin-700-normal.woff")), { subset: true });
  const heavy = await doc.embedFont(await readFile(path.join(fonts, "bricolage-grotesque-latin-800-normal.woff")), { subset: true });

  const all: (PrintCard | null)[] = [...opts.cards, null, null, null, null]; // 4 blank cards
  for (let start = 0; start < all.length; start += PER_SHEET) {
    const sheet = all.slice(start, start + PER_SHEET);

    // Front: the questions
    const front = doc.addPage([A4.w, A4.h]);
    sheet.forEach((card, i) => {
      const { x, y } = slot(i, false);
      const pad = 6 * MM;
      front.drawText(deck.mark, { x: x + pad, y: y - pad - 9, size: 11, font: heavy, color: mark });
      front.drawText(opts.title, {
        x: x + CARD.w - pad - bold.widthOfTextAtSize(opts.title, 7.5),
        y: y - pad - 8,
        size: 7.5,
        font: bold,
        color: MUTED,
      });
      if (!card) {
        // A blank card: lines to write your own question on
        for (let l = 0; l < 3; l++) {
          const ly = y - CARD.h / 2 + 8 - l * 9 * MM + 6 * MM;
          front.drawLine({ start: { x: x + pad, y: ly }, end: { x: x + CARD.w - pad, y: ly }, thickness: 0.5, color: LINE });
        }
        front.drawText(ui.print.blank, { x: x + pad, y: y - CARD.h + pad, size: 7.5, font: bold, color: MUTED });
        return;
      }
      if (card.label) front.drawText(card.label, { x: x + pad, y: y - pad - 22, size: 8, font: heavy, color: mark });
      let size = 13;
      let lines = wrap(card.text, bold, size, CARD.w - 2 * pad);
      while (lines.length > 4 && size > 9) {
        size -= 1;
        lines = wrap(card.text, bold, size, CARD.w - 2 * pad);
      }
      const lineH = size * 1.25;
      const top = y - CARD.h / 2 + (lines.length * lineH) / 2 - size * 0.8;
      lines.forEach((line, l) => front.drawText(line, { x: x + pad, y: top - l * lineH, size, font: bold, color: INK }));
      front.drawText(host, { x: x + pad, y: y - CARD.h + pad - 2, size: 6.5, font: bold, color: MUTED });
    });
    cutLines(front);

    // Back: the deck, mirrored so it lines up with the front when printed on both sides
    const back = doc.addPage([A4.w, A4.h]);
    // One colour field over the used rows plus 2 mm bleed, so a slightly shifted duplex print leaves no white edge
    const rows = Math.ceil(sheet.length / COLS);
    const bleed = 2 * MM;
    back.drawRectangle({
      x: MARGIN.x - bleed,
      y: A4.h - MARGIN.y - rows * CARD.h - bleed,
      width: COLS * CARD.w + 2 * bleed,
      height: rows * CARD.h + 2 * bleed,
      color: bg,
    });
    sheet.forEach((_, i) => {
      const { x, y } = slot(i, true);
      const markSize = 34;
      back.drawText(deck.mark, {
        x: x + CARD.w / 2 - heavy.widthOfTextAtSize(deck.mark, markSize) / 2,
        y: y - CARD.h / 2 - markSize * 0.25,
        size: markSize,
        font: heavy,
        color: ink,
      });
      back.drawText(host, {
        x: x + CARD.w / 2 - bold.widthOfTextAtSize(host, 8) / 2,
        y: y - CARD.h + 5 * MM,
        size: 8,
        font: bold,
        color: ink,
      });
    });
    cutLines(back);
  }
  return doc.save();
}
