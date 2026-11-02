import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { DEEP_LINK_PATHS, deepLinkRoute } from "@/lib/deepLink";

describe("deep links", () => {
  it("AASA lists exactly the app's paths", () => {
    const file = JSON.parse(readFileSync("public/.well-known/apple-app-site-association", "utf8"));
    expect(file.applinks.details[0].paths).toEqual(DEEP_LINK_PATHS);
  });

  it("the Android intent filter matches the same paths", () => {
    const xml = readFileSync("android/app/src/main/AndroidManifest.xml", "utf8");
    const prefixes = [...xml.matchAll(/android:pathPrefix="([^"]+)"/g)].map((m) => m[1]);
    const expected = DEEP_LINK_PATHS.filter((p) => p.endsWith("/*")).map((p) => p.slice(0, -1));
    expect(prefixes).toEqual(expected);
    expect(xml).toContain('android:path="/"');
  });

  it("routes known links and sends everything else to the front page", () => {
    expect(deepLinkRoute("https://snakkespil.dk/spil/gaet/?x=1")).toBe("/spil/gaet/?x=1");
    expect(deepLinkRoute("https://snakkespil.dk/spoergsmaal/x/")).toBe("/");
    expect(deepLinkRoute("https://snakkespil.dk/app/")).toBe("/");
    expect(deepLinkRoute("https://evil.example/spil/x/")).toBe("/");
    expect(deepLinkRoute("dk.snakkespil.app://x/y")).toBe("/");
    expect(deepLinkRoute("not a url")).toBe("/");
  });
});
