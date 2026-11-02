/**
 * "Share as image" (#103): draws a card on a canvas in the deck's colours and hands
 * it to the share sheet as a file, or downloads it. No server, no packages.
 * wrapText/fitText are pure (the measure function is injected) so they can be tested.
 */
import { getDeck, type DeckPattern } from "@/data/decks";

export const IMAGE_W = 1080;
export const IMAGE_H = 1350;

export type Measure = (text: string) => number;

/** Greedy word wrap; a word wider than the line is broken by characters so nothing is clipped. */
export function wrapText(text: string, maxWidth: number, measure: Measure): string[] {
  const lines: string[] = [];
  let line = "";
  const push = () => {
    if (line) lines.push(line);
    line = "";
  };
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word;
    if (measure(candidate) <= maxWidth) {
      line = candidate;
      continue;
    }
    push();
    if (measure(word) <= maxWidth) {
      line = word;
      continue;
    }
    for (const ch of Array.from(word)) {
      if (line && measure(line + ch) > maxWidth) push();
      line += ch;
    }
  }
  push();
  return lines;
}

export interface FittedText {
  size: number;
  lines: string[];
}

/**
 * Largest font size (from max down to min, step 2) at which the wrapped text fits the box.
 * Below min it keeps shrinking, so even absurdly long texts are never cut off.
 */
export function fitText(
  text: string,
  maxWidth: number,
  maxHeight: number,
  measureAt: (size: number) => Measure,
  { max = 84, min = 36, lineHeight = 1.25 } = {}
): FittedText {
  let size = max;
  for (;;) {
    const lines = wrapText(text, maxWidth, measureAt(size));
    if ((lines.length * size * lineHeight <= maxHeight) || size <= 8) return { size, lines };
    size -= size > min ? 2 : 1;
  }
}

function drawPattern(ctx: CanvasRenderingContext2D, pattern: DeckPattern, w: number, h: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
  const step = 56;
  for (let y = 0; y < h + step; y += step) {
    for (let x = 0; x < w + step; x += step) {
      switch (pattern) {
        case "prikker":
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "tern":
          if (((x + y) / step) % 2 === 0) ctx.fillRect(x, y, step, step);
          break;
        case "zigzag":
          ctx.beginPath();
          ctx.moveTo(x, y + step);
          ctx.lineTo(x + step / 2, y);
          ctx.lineTo(x + step, y + step);
          ctx.stroke();
          break;
        case "buer":
          ctx.beginPath();
          ctx.arc(x + step / 2, y + step, step / 2 - 6, Math.PI, 0);
          ctx.stroke();
          break;
        case "ruder":
          ctx.beginPath();
          ctx.moveTo(x, y + step / 2);
          ctx.lineTo(x + step / 2, y);
          ctx.lineTo(x + step, y + step / 2);
          ctx.lineTo(x + step / 2, y + step);
          ctx.closePath();
          ctx.stroke();
          break;
        case "striber":
          ctx.beginPath();
          ctx.moveTo(x, y + step);
          ctx.lineTo(x + step, y);
          ctx.stroke();
          break;
      }
    }
  }
  ctx.restore();
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Font family from the site's own font variable (next/font), so the image matches the cards. */
function displayFamily(): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim();
  return v ? `${v}, sans-serif` : "sans-serif";
}

export async function renderCardImage(opts: {
  categoryId: string;
  categoryName: string;
  text: string;
  siteName: string;
}): Promise<Blob> {
  const deck = getDeck(opts.categoryId);
  const family = displayFamily();
  try {
    await Promise.all([document.fonts.load(`800 60px ${family}`), document.fonts.load(`600 60px ${family}`)]);
  } catch {
    // fall back to the system font
  }
  const canvas = document.createElement("canvas");
  canvas.width = IMAGE_W;
  canvas.height = IMAGE_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");

  // Deck colour with the pattern in a frame; the text sits on a flat panel so contrast stays at the deck's AA pair
  ctx.fillStyle = deck.bg;
  ctx.fillRect(0, 0, IMAGE_W, IMAGE_H);
  drawPattern(ctx, deck.pattern, IMAGE_W, IMAGE_H, hexA(deck.ink, 0.16));
  const m = 72;
  const panel = { x: m, y: m, w: IMAGE_W - 2 * m, h: IMAGE_H - 2 * m };
  ctx.fillStyle = deck.bg;
  roundedRect(ctx, panel.x, panel.y, panel.w, panel.h, 48);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = hexA(deck.ink, 0.35);
  ctx.stroke();

  ctx.fillStyle = deck.ink;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "center";
  const cx = IMAGE_W / 2;

  // Header: category name, shrunk to fit
  const headerSize = fitText(opts.categoryName, panel.w - 120, 56, (s) => (t) => {
    ctx.font = `600 ${s}px ${family}`;
    return ctx.measureText(t).width;
  }, { max: 44, min: 28, lineHeight: 1.2 });
  ctx.font = `600 ${headerSize.size}px ${family}`;
  const headerLh = headerSize.size * 1.2;
  headerSize.lines.forEach((line, i) => ctx.fillText(line, cx, panel.y + 120 + i * headerLh));

  // Question
  const boxTop = panel.y + 200;
  const boxBottom = panel.y + panel.h - 200;
  const fitted = fitText(opts.text, panel.w - 140, boxBottom - boxTop, (s) => (t) => {
    ctx.font = `800 ${s}px ${family}`;
    return ctx.measureText(t).width;
  });
  ctx.font = `800 ${fitted.size}px ${family}`;
  const lh = fitted.size * 1.25;
  let y = (boxTop + boxBottom) / 2 - ((fitted.lines.length - 1) * lh) / 2 + fitted.size * 0.35;
  for (const line of fitted.lines) {
    ctx.fillText(line, cx, y);
    y += lh;
  }

  // Footer: site name
  ctx.font = `800 52px ${family}`;
  ctx.fillText(opts.siteName, cx, panel.y + panel.h - 90);

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob"))), "image/png")
  );
}

function hexA(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Whether this browser can hand a PNG to the share sheet. */
export function canShareFile(file: File): boolean {
  return typeof navigator !== "undefined" && !!navigator.canShare && navigator.canShare({ files: [file] });
}

/** Share the file if the browser can, otherwise download it. "afbrudt" = the player closed the sheet. */
export async function shareOrDownload(blob: Blob, fileName: string, title: string): Promise<"delt" | "hentet" | "afbrudt"> {
  const file = new File([blob], fileName, { type: "image/png" });
  if (canShareFile(file)) {
    try {
      await navigator.share({ files: [file], title });
      return "delt";
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return "afbrudt";
      // other failures: fall through to download
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  return "hentet";
}
