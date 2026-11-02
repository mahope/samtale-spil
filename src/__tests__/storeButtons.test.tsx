import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { StoreButtons } from "@/components/site/StoreButtons";
import { APPS_LIVE, liveStoreLinks } from "@/config/site";

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
});
