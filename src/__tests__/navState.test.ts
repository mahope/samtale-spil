import { describe, expect, it } from "vitest";
import { markPop, previousScreen, recordNavigation, rememberTitle } from "@/components/app/navState";

describe("app shell navigation stack", () => {
  it("knows the screen below, before and after the shell records the new one", () => {
    recordNavigation("/mere/");
    rememberTitle("/mere/", "Mere");
    // Indstillinger renders before AppShell's effect records it
    expect(previousScreen("/indstillinger/")).toEqual({ path: "/mere/", title: "Mere" });
    recordNavigation("/indstillinger");
    expect(previousScreen("/indstillinger/")?.path).toBe("/mere/");
  });

  it("drops the screens above when going back", () => {
    recordNavigation("/statistik/");
    markPop();
    expect(previousScreen("/indstillinger/")?.path).toBe("/mere/");
    recordNavigation("/indstillinger/");
    // Statistik is gone from the stack, so opening it again pushes it on top of Indstillinger
    expect(previousScreen("/statistik/")?.path).toBe("/indstillinger/");
  });
});
