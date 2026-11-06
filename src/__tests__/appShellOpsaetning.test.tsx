import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: vi.fn(), replace: vi.fn(), push: vi.fn(), prefetch: vi.fn(), refresh: vi.fn(), forward: vi.fn() }),
  usePathname: () => "/spil/gaet/",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

import { AppShell } from "@/components/app/AppShell";
import { SNAKKESPIL_TABS } from "@/components/app/tabs";

const tabBar = () => screen.queryByRole("navigation", { name: /./ }) ?? document.querySelector("nav");

describe("AppShell: fanebjælke på spilruter (issue #108)", () => {
  it("shows the tab bar for a felt-toned setup screen (AppScreen)", () => {
    render(
      <AppShell tabs={SNAKKESPIL_TABS} fullscreen={["/spil/"]}>
        <div className="app-page filt">opsætning</div>
      </AppShell>,
    );
    expect(tabBar()).toBeTruthy();
    expect(document.querySelector(".app-screen")?.className).toContain("app-has-tabbar");
    expect(document.querySelector(".app-screen")?.className).toContain("app-page-screen");
  });

  it("hides the tab bar on the felt game board", () => {
    render(
      <AppShell tabs={SNAKKESPIL_TABS} fullscreen={["/spil/"]}>
        <main className="filt">bord</main>
      </AppShell>,
    );
    expect(tabBar()).toBeNull();
    expect(document.querySelector(".app-screen")?.className).toContain("app-felt");
  });
});
