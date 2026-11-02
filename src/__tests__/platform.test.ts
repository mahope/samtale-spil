import { afterEach, describe, expect, it, vi } from "vitest";
import { isNative } from "@/lib/platform";

afterEach(() => vi.unstubAllGlobals());

describe("isNative", () => {
  it("returns false during server rendering", () => {
    vi.stubGlobal("window", undefined);
    expect(isNative()).toBe(false);
  });

  it("returns false without the bridge or its platform method", () => {
    vi.stubGlobal("window", {});
    expect(isNative()).toBe(false);
    vi.stubGlobal("window", { Capacitor: {} });
    expect(isNative()).toBe(false);
  });

  it.each([true, false])("returns the injected bridge result: %s", (native) => {
    const isNativePlatform = vi.fn(() => native);
    vi.stubGlobal("window", { Capacitor: { isNativePlatform } });
    expect(isNative()).toBe(native);
    expect(isNativePlatform).toHaveBeenCalledOnce();
  });
});
