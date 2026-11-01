import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { track, umamiTrack } from "./track";

describe("track", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    delete window.umami;
    delete (window as unknown as { plausible?: unknown }).plausible;
  });

  it("calls both Plausible and Umami with the same props", () => {
    const plausible = vi.fn();
    const umami = vi.fn();
    (window as unknown as { plausible: unknown }).plausible = plausible;
    window.umami = { track: umami };
    track("spil_startet", { kategori: "par" });
    expect(plausible).toHaveBeenCalledWith("spil_startet", { props: { kategori: "par", platform: "web" } });
    expect(umami).toHaveBeenCalledWith("spil_startet", { kategori: "par", platform: "web" });
  });

  it("retries Umami until the script has loaded", () => {
    const umami = vi.fn();
    umamiTrack("e", { a: 1 });
    vi.advanceTimersByTime(2000);
    expect(umami).not.toHaveBeenCalled();
    window.umami = { track: umami };
    vi.advanceTimersByTime(500);
    expect(umami).toHaveBeenCalledWith("e", { a: 1 });
  });

  it("gives up after 15 s", () => {
    umamiTrack("e");
    vi.advanceTimersByTime(20000);
    const umami = vi.fn();
    window.umami = { track: umami };
    vi.advanceTimersByTime(5000);
    expect(umami).not.toHaveBeenCalled();
  });

  it("isolates failures between the trackers", () => {
    const plausible = vi.fn();
    (window as unknown as { plausible: unknown }).plausible = plausible;
    window.umami = { track: () => { throw new Error("x"); } };
    expect(() => track("e")).not.toThrow();
    expect(plausible).toHaveBeenCalled();
    (window as unknown as { plausible: unknown }).plausible = () => { throw new Error("y"); };
    const umami = vi.fn();
    window.umami = { track: umami };
    expect(() => track("e")).not.toThrow();
    expect(umami).toHaveBeenCalled();
  });
});
