#!/usr/bin/env node
// Fails if an internal link in the static export points at a page that is not there.
// Checks href="/..." in every out/**/*.html, and href:"/..." and router .push("/...")/.replace("/...")
// literals in the client chunks (links that only render after hydration, such as empty states, and
// navigation from code, such as a keyboard shortcut). Usage: node scripts/check-links.mjs [out]
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] ?? "out";
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
const note = (href, file) => {
  if (href.startsWith("//") || href.startsWith("/_next/")) return;
  checked++;
  if (!exists(href)) broken.set(href, [...(broken.get(href) ?? []), relative(root, file)]);
};

for (const file of walk(root)) {
  if (file.endsWith(".html")) {
    const html = readFileSync(file, "utf8");
    for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) note(href.replaceAll("&amp;", "&"), file);
  } else if (file.endsWith(".js") && file.includes(`${join("_next", "static")}`)) {
    const js = readFileSync(file, "utf8");
    for (const [, href] of js.matchAll(/href:"(\/[^"]*)"/g)) note(href, file);
    for (const [, href] of js.matchAll(/\.(?:push|replace)\("(\/[^"]*)"\)/g)) note(href, file);
  }
}

if (broken.size) {
  for (const [href, files] of broken) console.error(`dead link ${href} in ${[...new Set(files)].slice(0, 3).join(", ")}`);
  console.error(`${broken.size} dead internal links`);
  process.exit(1);
}
console.log(`links ok: ${checked} internal links, all point at a page in ${root}/`);
