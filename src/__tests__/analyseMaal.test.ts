import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "..", "..");
const src = join(root, "src");

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return files(p);
    return /\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name) ? [p] : [];
  });
}

function eventNames(): Set<string> {
  const names = new Set<string>();
  for (const f of files(src)) {
    if (f.endsWith(join("utils", "track.ts"))) continue;
    const text = readFileSync(f, "utf8");
    for (const m of text.matchAll(/\btrack\(\s*"([^"]+)"/g)) names.add(m[1]);
  }
  return names;
}

describe("docs/analyse-maal.md", () => {
  const doc = readFileSync(join(root, "docs", "analyse-maal.md"), "utf8");

  it("finds the track() calls", () => {
    expect(eventNames().size).toBeGreaterThan(0);
  });

  it.each([...eventNames()].sort())("lists the event %s", (name) => {
    expect(doc).toContain(`| \`${name}\` |`);
  });
});
