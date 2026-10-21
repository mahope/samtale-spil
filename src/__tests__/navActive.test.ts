import { describe, expect, it } from "vitest";
import { isActive } from "@/components/site/navActive";

describe("isActive (site menu)", () => {
  it("marks the page itself and the pages under it", () => {
    expect(isActive("/spoergsmaal/", "/spoergsmaal/")).toBe(true);
    expect(isActive("/spoergsmaal/familie/", "/spoergsmaal/")).toBe(true);
    expect(isActive("/guide", "/guide/")).toBe(true);
  });

  it("does not mark a section whose name only starts the same way", () => {
    expect(isActive("/spillet/", "/spil/")).toBe(false);
    expect(isActive("/samtaler-ved-aftensmaden/", "/spoergsmaal/")).toBe(false);
  });

  it("marks the front page only on the front page", () => {
    expect(isActive("/", "/")).toBe(true);
    expect(isActive("/spil/", "/")).toBe(false);
  });
});
