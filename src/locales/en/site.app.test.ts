import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { site as web } from "./site";
import { site as app } from "./site.app";

describe("Goodtalk app site settings", () => {
  it("turns favorites on for the app, which has a Favorites tab", () => {
    expect(app.favorites).toBe(true);
    expect(web.favorites).toBe(false);
    expect({ ...app, favorites: web.favorites }).toEqual(web);
  });
  it("is aliased for the Goodtalk app build only", () => {
    const config = readFileSync(join(__dirname, "../../../next.config.ts"), "utf8");
    expect(config).toContain("const intlAppAlias = { '@/locale/site': `./src/locales/${locale}/site.app.ts` }");
    expect(config).toContain("...(isIntlApp ? intlAppAlias : {})");
  });
});
