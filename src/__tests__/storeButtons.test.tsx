import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { cleanup, render, screen } from "@testing-library/react";
import { StoreButtons } from "@/components/site/StoreButtons";
import { APPS_LIVE, APPS_PENDING, appsPending, liveStoreLinks } from "@/config/site";

const track = vi.hoisted(() => vi.fn());
vi.mock("@/utils/track", () => ({ track }));

const apps = { ios: "https://apps.apple.com/dk/app/id1", android: "https://play.google.com/store/apps/details?id=x" };

describe("store buttons per store (issue #95)", () => {
  afterEach(cleanup);

  it("ships with both stores off", () => {
    expect(APPS_LIVE).toEqual({ ios: false, android: false });
  });

  it("shows only 'coming soon' when no store is live", () => {
    render(<StoreButtons links={liveStoreLinks({ ios: false, android: false }, apps)} />);
    expect(screen.getByText("Kommer snart i App Store og Google Play.")).toBeTruthy();
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("links the live store with its real URL and says 'coming soon' for the other", () => {
    render(<StoreButtons links={liveStoreLinks({ ios: true, android: false }, apps)} />);
    expect(screen.getByRole("link", { name: /App Store/ }).getAttribute("href")).toBe(apps.ios);
    expect(screen.queryByRole("link", { name: /Google Play/ })).toBeNull();
    expect(screen.getByText("Kommer snart på Google Play.")).toBeTruthy();
  });

  it("links both when both are live", () => {
    render(<StoreButtons links={liveStoreLinks({ ios: true, android: true }, apps)} />);
    expect(screen.getByRole("link", { name: /App Store/ }).getAttribute("href")).toBe(apps.ios);
    expect(screen.getByRole("link", { name: /Google Play/ }).getAttribute("href")).toBe(apps.android);
    expect(screen.queryByText(/Kommer snart/)).toBeNull();
  });

  it("never links a store without a URL, even when flagged live (Goodtalk)", () => {
    render(<StoreButtons links={liveStoreLinks({ ios: true, android: true }, { ios: null, android: null })} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("tracks a click as Butik-klik with the store", () => {
    track.mockClear();
    render(<StoreButtons links={liveStoreLinks({ ios: true, android: true }, apps)} />);
    fireEvent.click(screen.getByRole("link", { name: /App Store/ }));
    fireEvent.click(screen.getByRole("link", { name: /Google Play/ }));
    expect(track).toHaveBeenNthCalledWith(1, "Butik-klik", { butik: "ios" });
    expect(track).toHaveBeenNthCalledWith(2, "Butik-klik", { butik: "android" });
  });

  it("keeps the browser fallback ('Indtil da') while a store is pending", () => {
    expect(APPS_PENDING).toBe(true);
    expect(appsPending(liveStoreLinks({ ios: true, android: false }, apps))).toBe(true);
    expect(appsPending(liveStoreLinks({ ios: true, android: true }, apps))).toBe(false);
  });
});
