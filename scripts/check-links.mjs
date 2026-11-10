#!/usr/bin/env node
// Fails if an internal link in the static export points at a page that is not there.
// Checks href="/..." in every out/**/*.html, and href:"/..." and router .push("/...")/.replace("/...")
// literals in the client chunks (links that only render after hydration, such as empty states, and
// navigation from code, such as a keyboard shortcut). Usage: node scripts/check-links.mjs [out] [--base /da]
// With --base (the Snakkespil app's halves, out/da and out/en, see src/lib/appLang.ts) every href and src in
// the HTML must carry the base path, since a link without it leaves the half; the literals in the client
// chunks are router paths (Link and the router add the base), and a plain <a href="/..."> there is an error.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const args = process.argv.slice(2);
const baseAt = args.indexOf("--base");
const base = baseAt >= 0 ? args.splice(baseAt, 2)[1].replace(/\/$/, "") : "";
if (baseAt >= 0 && !/^\/[a-z]+$/.test(base)) {
  console.error(`--base must look like /da, got "${base}"`);
  process.exit(2);
}
const root = args[0] ?? "out";
if (!existsSync(root)) {
  console.error(`${root}/ does not exist; build first`);
  process.exit(2);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

const exists = (href) => {
  const path = decodeURIComponent(href.split(/[?#]/)[0]);
  if (path === "/") return existsSync(join(root, "index.html"));
  const target = join(root, path);
  if (path.endsWith("/")) return existsSync(join(target, "index.html"));
  return (existsSync(target) && statSync(target).isFile()) || existsSync(join(target, "index.html")) || existsSync(`${target}.html`);
};

const broken = new Map();
let checked = 0;
const fail = (href, file) => broken.set(href, [...(broken.get(href) ?? []), relative(root, file)]);
const note = (href, file) => {
  if (href.startsWith("//") || href.startsWith("/_next/")) return;
  checked++;
  if (!exists(href)) fail(href, file);
};
// An href or src in the HTML: with a base path it must start with it
const noteHtml = (href, file) => {
  if (href.startsWith("//")) return;
  if (!base) return note(href, file);
  if (href !== base && !href.startsWith(`${base}/`)) {
    checked++;
    return fail(`${href} (outside ${base})`, file);
  }
  const inner = href.slice(base.length) || "/";
  if (inner.startsWith("/_next/")) return;
  note(inner, file);
};

for (const file of walk(root)) {
  if (file.endsWith(".html")) {
    const html = readFileSync(file, "utf8");
    for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) noteHtml(href.replaceAll("&amp;", "&"), file);
    if (base) for (const [, src] of html.matchAll(/src="(\/[^"]*)"/g)) noteHtml(src.replaceAll("&amp;", "&"), file);
  } else if (file.endsWith(".js") && file.includes(`${join("_next", "static")}`)) {
    const js = readFileSync(file, "utf8");
    for (const [, href] of js.matchAll(/href:"(\/[^"]*)"/g)) note(href, file);
    for (const [, href] of js.matchAll(/\.(?:push|replace)\("(\/[^"]*)"\)/g)) note(href, file);
    // jsx("a", {href: "/..."}): a plain anchor, which the router does not give the base path
    if (base) for (const [, href] of js.matchAll(/\("a",\{(?:[^{}]*?,)?href:"(\/[^"]*)"/g)) fail(`${href} (plain <a> without ${base})`, file);
  }
}

if (broken.size) {
  for (const [href, files] of broken) console.error(`dead link ${href} in ${[...new Set(files)].slice(0, 3).join(", ")}`);
  console.error(`${broken.size} dead internal links`);
  process.exit(1);
}
console.log(`links ok: ${checked} internal links, all point at a page in ${root}/${base ? ` under ${base}` : ""}`);
