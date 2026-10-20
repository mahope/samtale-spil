// Renders favicon, PWA and store icons from assets/icon*.svg.
// Run after changing the logo: `node scripts/generate-icons.mjs` (needs sharp, which ships with next).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const rounded = await readFile(new URL("../assets/icon.svg", import.meta.url));
const fullbleed = await readFile(new URL("../assets/icon-fullbleed.svg", import.meta.url));

const png = (svg, size) => sharp(svg, { density: Math.ceil((size / 64) * 72) }).resize(size, size).png().toBuffer();

await mkdir(new URL("../public/icons/", import.meta.url), { recursive: true });
await mkdir(new URL("../assets/store/", import.meta.url), { recursive: true });

const out = {
  "../public/icons/icon-192.png": await png(rounded, 192),
  "../public/icons/icon-512.png": await png(rounded, 512),
  "../public/icons/maskable-512.png": await png(fullbleed, 512),
  // iOS rounds the corners itself, so the touch icon is full-bleed
  "../src/app/apple-icon.png": await png(fullbleed, 180),
  // 1024px masters for App Store / Play / Capacitor asset generation
  "../assets/store/icon-1024.png": await png(fullbleed, 1024),
};
for (const [path, buf] of Object.entries(out)) {
  await writeFile(new URL(path, import.meta.url), buf);
}

// favicon.ico with 16/32/48 px PNG entries (ICO may embed PNG data directly)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(rounded, s)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
await writeFile(new URL("../src/app/favicon.ico", import.meta.url), Buffer.concat([header, ...images]));

console.log("icons written:", Object.keys(out).length + 1);
