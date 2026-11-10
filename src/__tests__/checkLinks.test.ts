import { describe, it, expect, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

// scripts/check-links.mjs --base: the app's halves (out/da, out/en) must keep every link inside their base path
const dirs: string[] = [];
function exportWith(files: Record<string, string>) {
  const root = mkdtempSync(join(tmpdir(), "links-"));
  dirs.push(root);
  for (const [p, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, p)), { recursive: true });
    writeFileSync(join(root, p), body);
  }
  return root;
}
const check = (root: string, ...args: string[]) => spawnSync(process.execPath, ["scripts/check-links.mjs", root, ...args], { encoding: "utf8" });

const good = {
  "index.html": '<a href="/da/mere/">Mere</a><script src="/da/_next/static/chunks/a.js"></script><link rel="icon" href="/da/icon.svg?x">',
  "mere/index.html": '<a href="/da/">Spil</a>',
  "icon.svg": "<svg/>",
  "_next/static/chunks/a.js": 'jsx(Link,{href:"/mere/"});router.push("/")',
};

describe("check-links with a base path", () => {
  it("passes an export whose links all stay under the base path", () => {
    const r = check(exportWith(good), "--base", "/da");
    expect(r.stderr).toBe("");
    expect(r.status).toBe(0);
  });

  it("fails an HTML link without the base path", () => {
    const r = check(exportWith({ ...good, "mere/index.html": '<a href="/spil/">Spil</a>' }), "--base", "/da");
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("/spil/ (outside /da)");
  });

  it("fails an image or script outside the base path", () => {
    const r = check(exportWith({ ...good, "mere/index.html": '<img src="/og.png">' }), "--base", "/da");
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("/og.png (outside /da)");
  });

  it("fails a plain <a> in the client code, which the router does not give the base path", () => {
    const r = check(exportWith({ ...good, "_next/static/chunks/b.js": '(0,t.jsx)("a",{className:"x",href:"/mere/"})' }), "--base", "/da");
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("plain <a> without /da");
  });

  it("fails a router link to a screen the half does not have", () => {
    const r = check(exportWith({ ...good, "_next/static/chunks/b.js": 'jsx(Link,{href:"/favoritter/"})' }), "--base", "/da");
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("dead link /favoritter/");
  });

  it("checks root-relative links as before without --base", () => {
    const r = check(exportWith({ "index.html": '<a href="/om/">Om</a>', "om/index.html": "" }));
    expect(r.status).toBe(0);
  });

  afterAll(() => dirs.forEach((d) => rmSync(d, { recursive: true, force: true })));
});
