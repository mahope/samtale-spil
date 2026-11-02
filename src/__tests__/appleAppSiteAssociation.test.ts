import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("apple-app-site-association", () => {
  const file = JSON.parse(readFileSync("public/.well-known/apple-app-site-association", "utf8"));
  const detail = file.applinks.details[0];

  it("binds the Snakkespil app id to the team", () => {
    expect(detail.appIDs).toEqual(["P7698GU4AV.dk.snakkespil.app"]);
  });

  it("only opens paths the app has, never the website's indexed pages", () => {
    expect(detail.paths).not.toContain("/*");
    expect(detail.paths.some((p: string) => p.startsWith("/spoergsmaal") || p.startsWith("/app"))).toBe(false);
  });
});
