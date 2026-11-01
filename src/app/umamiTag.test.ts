import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { site as da } from "@/locales/da/site";
import { site as en } from "@/locales/en/site";

const dir = __dirname;
const layouts = ["layout.tsx", "layout.app.tsx", "layout.voksen.tsx", "layout.intl.tsx", "layout.intlapp.tsx"];

describe("Umami tag in layouts", () => {
  it.each(layouts)("%s loads the tracker with a website id and host", (f) => {
    const src = readFileSync(join(dir, f), "utf8");
    expect(src).toContain("src={UMAMI_SRC}");
    expect(src).toContain("data-website-id={site.umamiId}");
    expect(src).toContain("data-host-url={UMAMI_HOST}");
  });
  it("has a distinct uuid per site", () => {
    expect(da.umamiId).toMatch(/^[0-9a-f-]{36}$/);
    expect(en.umamiId).toMatch(/^[0-9a-f-]{36}$/);
    expect(da.umamiId).not.toBe(en.umamiId);
  });
});
