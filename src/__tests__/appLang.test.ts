import { describe, it, expect, vi, afterEach } from "vitest";
import {
  APP_LANG_KEY,
  appIndexHtml,
  appStart,
  asFile,
  currentAppLang,
  LANG_SWITCH_TARGET,
  notificationTarget,
  stripIndexScript,
  switchAppLang,
  withoutBase,
} from "@/lib/appLang";

/** Runs appStart like out/index.html does and returns where it sends the web view */
function start({ path = "/", search = "", hash = "", stored = null as string | null, languages = [] as string[], language = "", storageThrows = false }) {
  let went = "";
  appStart(
    {
      location: { pathname: path, search, hash, replace: (url: string) => (went = url) },
      localStorage: {
        getItem: (key: string) => {
          if (storageThrows) throw new Error("no storage");
          return key === APP_LANG_KEY ? stored : null;
        },
      },
      navigator: { languages, language },
    },
    APP_LANG_KEY
  );
  return went;
}

describe("the app's start page (out/index.html)", () => {
  it("opens Danish for Danish, Norwegian and Swedish devices, English for everyone else", () => {
    for (const lang of ["da", "da-DK", "nb-NO", "nn-NO", "no", "sv-SE", "sv-FI", "NB_no"]) expect(start({ languages: [lang] }), lang).toBe("/da/index.html");
    for (const lang of ["en-US", "en-GB", "de-DE", "fi-FI", "is-IS", "fo-FO", ""]) expect(start({ languages: [lang] }), lang).toBe("/en/index.html");
  });

  it("goes by the device's first language", () => {
    expect(start({ languages: ["en-GB", "da-DK"] })).toBe("/en/index.html");
    expect(start({ languages: ["sv-SE", "en-US"] })).toBe("/da/index.html");
    // older web views only have navigator.language
    expect(start({ language: "da-DK" })).toBe("/da/index.html");
  });

  it("puts a stored choice before the device language", () => {
    expect(start({ stored: "en", languages: ["da-DK"] })).toBe("/en/index.html");
    expect(start({ stored: "da", languages: ["en-US"] })).toBe("/da/index.html");
  });

  it("ignores a stored value that is not a language, and storage that throws", () => {
    expect(start({ stored: "fr", languages: ["da-DK"] })).toBe("/da/index.html");
    expect(start({ stored: "", languages: ["en-US"] })).toBe("/en/index.html");
    expect(start({ storageThrows: true, languages: ["da-DK"] })).toBe("/da/index.html");
  });

  it("keeps the query and hash (the browser preview's ?platform=ios)", () => {
    expect(start({ search: "?platform=ios", languages: ["da"] })).toBe("/da/index.html?platform=ios");
    expect(start({ search: "?platform=android", hash: "#x", languages: ["en"] })).toBe("/en/index.html?platform=android#x");
  });

  it("reopens a screen in the same language when the web view reloads deep in the app", () => {
    expect(start({ path: "/en/favorites/", stored: "en" })).toBe("/en/favorites/index.html");
    expect(start({ path: "/da/spil/parforhold/", search: "?question=par-1", languages: ["da"] })).toBe("/da/spil/parforhold/index.html?question=par-1");
    expect(start({ path: "/da/mere", languages: ["da"] })).toBe("/da/mere/index.html");
  });

  it("goes to the chosen language's start when an old screen of the other language reloads", () => {
    expect(start({ path: "/da/mere/", stored: "en" })).toBe("/en/index.html");
    expect(start({ path: "/en/more/", stored: "da" })).toBe("/da/index.html");
  });

  it("never loops back to itself: every target is a file, which the app's server serves as it is", () => {
    for (const path of ["/", "/da/", "/en/x/", "/fr/", "/da"]) expect(start({ path, languages: ["da"] })).toMatch(/^\/(da|en)\/(.+\/)?index\.html/);
  });

  it("ships appStart as a self-contained script", () => {
    const html = appIndexHtml();
    const script = /<script>([\s\S]*)<\/script>/.exec(html)![1];
    let went = "";
    const win = {
      location: { pathname: "/", search: "", hash: "", replace: (u: string) => (went = u) },
      localStorage: { getItem: () => "en" },
      navigator: { languages: ["da-DK"] },
    };
    new Function("window", script)(win);
    expect(went).toBe("/en/index.html");
    expect(html).toContain(JSON.stringify(APP_LANG_KEY));
  });
});

describe("stripIndexScript", () => {
  it("turns /da/mere/index.html into /da/mere/ before the router starts, keeping query and hash", () => {
    const replaced: string[] = [];
    const run = (pathname: string, search = "", hash = "") =>
      new Function("location", "history", stripIndexScript)({ pathname, search, hash }, { state: null, replaceState: (_s: unknown, _t: string, url: string) => replaced.push(url) });
    run("/da/mere/index.html", "?platform=ios", "#a");
    run("/en/index.html");
    run("/en/more/");
    expect(replaced).toEqual(["/da/mere/?platform=ios#a", "/en/"]);
  });
});

describe("base path helpers", () => {
  it("know which half of the app they run in", () => {
    expect(currentAppLang("/da")).toBe("da");
    expect(currentAppLang("/en")).toBe("en");
    expect(currentAppLang("")).toBeNull();
    // the websites and the tests have no base path
    expect(currentAppLang()).toBeNull();
  });

  it("strip the base path from browser paths", () => {
    expect(withoutBase("/da/mere/", "/da")).toBe("/mere/");
    expect(withoutBase("/da/", "/da")).toBe("/");
    expect(withoutBase("/da", "/da")).toBe("/");
    expect(withoutBase("/dagens-spoergsmaal/", "/da")).toBe("/dagens-spoergsmaal/");
    expect(withoutBase("/spil/x/", "")).toBe("/spil/x/");
  });

  it("make page paths into files", () => {
    expect(asFile("/en/daily-question/")).toBe("/en/daily-question/index.html");
    expect(asFile("/da/spil/x/?question=1")).toBe("/da/spil/x/index.html?question=1");
    expect(asFile("/da/spil/x?question=1#y")).toBe("/da/spil/x/index.html?question=1#y");
  });

  it("switch language by storing it and loading the other half's More tab", () => {
    const replace = vi.fn();
    vi.stubGlobal("location", { ...window.location, replace });
    switchAppLang("en");
    expect(localStorage.getItem(APP_LANG_KEY)).toBe("en");
    expect(replace).toHaveBeenCalledWith("/en/more/index.html");
    expect(LANG_SWITCH_TARGET.da).toBe("/da/mere/index.html");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });
});

describe("reminder taps", () => {
  it("open screens in the same half with the router", () => {
    expect(notificationTarget("/da/spil/parforhold/?question=par-1", "/da")).toEqual({ push: "/spil/parforhold/?question=par-1" });
    expect(notificationTarget("/en/daily-question/", "/en")).toEqual({ push: "/daily-question/" });
  });

  it("load the other half for a reminder scheduled before a language switch", () => {
    expect(notificationTarget("/da/spil/parforhold/?question=par-1", "/en")).toEqual({ load: "/da/spil/parforhold/index.html?question=par-1" });
    expect(notificationTarget("/en/daily-question/", "/da")).toEqual({ load: "/en/daily-question/index.html" });
  });

  it("treat reminders from 2.0.0 (no language in the path) as Danish", () => {
    expect(notificationTarget("/spil/familie/?question=fam-3", "/da")).toEqual({ push: "/spil/familie/?question=fam-3" });
    expect(notificationTarget("/spil/familie/?question=fam-3", "/en")).toEqual({ load: "/da/spil/familie/index.html?question=fam-3" });
  });

  it("ignore anything that is not a path in the app", () => {
    expect(notificationTarget("https://example.com/", "/da")).toBeNull();
    expect(notificationTarget("//example.com/", "/da")).toBeNull();
  });
});
