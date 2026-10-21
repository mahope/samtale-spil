import { describe, expect, it } from "vitest";
import {
  androidBack,
  markPop,
  previousScreen,
  recordNavigation,
  registerTabRoots,
  registeredTabRoots,
  rememberTitle,
  slideDirection,
} from "@/components/app/navState";
import { GOODTALK_TABS, SNAKKESPIL_TABS, VOKSEN_TABS } from "@/components/app/tabs";

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

  it("has nothing to go back to after a fallback step back from a screen opened directly", () => {
    // /lege/julelege/ opened cold; its back button replaces it with /lege/
    recordNavigation("/lege/julelege/");
    markPop();
    expect(previousScreen("/lege/")).toBeNull();
    recordNavigation("/lege/");
  });
});

describe("app shell slide direction", () => {
  const base = { popping: false, still: false };
  it("pushes deeper screens and pops shallower ones within a tab", () => {
    expect(slideDirection({ ...base, fromDepth: 0, toDepth: 1, fromTab: "/mere/", toTab: "/mere/" })).toBe("push");
    expect(slideDirection({ ...base, fromDepth: 1, toDepth: 0, fromTab: "/mere/", toTab: "/mere/" })).toBe("pop");
    expect(slideDirection({ ...base, fromDepth: 2, toDepth: 0, fromTab: "/", toTab: "/" })).toBe("pop");
  });

  it("switches tabs without a slide, also from a screen pushed inside another tab", () => {
    expect(slideDirection({ ...base, fromDepth: 0, toDepth: 0, fromTab: "/", toTab: "/favoritter/" })).toBe("tab");
    expect(slideDirection({ ...base, fromDepth: 1, toDepth: 0, fromTab: "/mere/", toTab: "/dagens-spoergsmaal/" })).toBe("tab");
  });

  it("lets a step back and a finished edge swipe win", () => {
    expect(slideDirection({ ...base, popping: true, fromDepth: 1, toDepth: 0, fromTab: "/mere/", toTab: "/dagens-spoergsmaal/" })).toBe("pop");
    expect(slideDirection({ ...base, popping: true, still: true, fromDepth: 1, toDepth: 0, fromTab: "/mere/", toTab: "/mere/" })).toBe("none");
  });
});

describe("Android back in the app shell", () => {
  const roots = SNAKKESPIL_TABS.map((t) => t.href).filter((h) => h !== "/");
  it("leaves the app from Spil and goes to Spil from the other tabs", () => {
    expect(androidBack("/", true, roots)).toBe("exit");
    expect(androidBack("/favoritter/", true, roots)).toBe("home");
    expect(androidBack("/mere", true, roots)).toBe("home");
  });

  it("steps back from pushed screens and games, or goes to Spil when opened cold", () => {
    expect(androidBack("/indstillinger/", true, roots)).toBe("back");
    expect(androidBack("/spil/familie/", true, roots)).toBe("back");
    expect(androidBack("/spil/familie/", false, roots)).toBe("home");
  });
});

describe("tab roots of each app", () => {
  it("gives NativeBoot the roots of the app that is running", () => {
    registerTabRoots(GOODTALK_TABS.map((t) => t.href));
    expect(androidBack("/favorites/", true, registeredTabRoots())).toBe("home");
    expect(androidBack("/settings/", true, registeredTabRoots())).toBe("back");
    // A Danish tab root is not a root in Goodtalk
    expect(androidBack("/favoritter/", true, registeredTabRoots())).toBe("back");
    registerTabRoots(VOKSEN_TABS.map((t) => t.href));
    expect(androidBack("/i-aften", true, registeredTabRoots())).toBe("home");
    expect(androidBack("/spil/udfordringer/", true, registeredTabRoots())).toBe("back");
  });

  it("starts every app's tabs at /, where the Android back button leaves the app", () => {
    for (const tabs of [SNAKKESPIL_TABS, GOODTALK_TABS, VOKSEN_TABS]) {
      expect(tabs[0].href).toBe("/");
      expect(tabs).toHaveLength(4);
    }
  });
});
