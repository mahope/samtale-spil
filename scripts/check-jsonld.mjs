// Usage: node scripts/check-jsonld.mjs <html file>...
// Each page must carry parseable JSON-LD with a BreadcrumbList and a CollectionPage whose ItemList is non-empty.
import { readFileSync } from "node:fs";

let failed = false;
for (const file of process.argv.slice(2)) {
  const html = readFileSync(file, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const types = [];
  try {
    for (const b of blocks) {
      const data = JSON.parse(b[1]);
      for (const node of data["@graph"] ?? [data]) {
        types.push(node["@type"]);
        if (node["@type"] === "CollectionPage") {
          const list = node.mainEntity?.itemListElement ?? [];
          if (list.length === 0 || list.some((it, i) => it.position !== i + 1 || !it.name)) throw new Error("bad ItemList");
          if (node.isPartOf?.["@id"] !== "https://snakkespil.dk/#website") throw new Error("bad isPartOf");
        }
      }
    }
    for (const t of ["BreadcrumbList", "CollectionPage"]) if (!types.includes(t)) throw new Error(`missing ${t}`);
    console.log(`ok ${file}: ${types.join(", ")}`);
  } catch (e) {
    console.error(`FAIL ${file}: ${e.message}`);
    failed = true;
  }
}
process.exit(failed ? 1 : 0);
