import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ReportCard } from "../components/ReportCard";
import { ui } from "../locales/sv/ui";

vi.mock("@/locale/site", () => ({ site: { lang: "sv", url: "https://goodtalkcards.com" } }));
vi.mock("@/locale/ui", async () => await import("../locales/sv/ui"));
vi.mock("@/utils/track", () => ({ track: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("sends the app language in both the URL and body of a card report", async () => {
  HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  const fetch = vi.fn().mockResolvedValue(Response.json({ ok: true }));
  vi.stubGlobal("fetch", fetch);
  vi.stubGlobal("turnstile", {
    render: (_el: HTMLElement, options: { callback: (token: string) => void }) => {
      options.callback("test-token");
      return "widget";
    },
    remove: vi.fn(), reset: vi.fn(),
  });
  render(<ReportCard questionId="par-1" />);
  fireEvent.click(screen.getByRole("button", { name: ui.report.button }));
  fireEvent.click(screen.getByLabelText(ui.report.reasons.stavefejl));
  await waitFor(() => expect((screen.getByRole("button", { name: ui.report.send }) as HTMLButtonElement).disabled).toBe(false));
  fireEvent.click(screen.getByRole("button", { name: ui.report.send }));
  await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
  const [url, options] = fetch.mock.calls[0];
  expect(url).toBe("https://goodtalkcards.com/api/flag?sprog=sv");
  expect(JSON.parse(options.body)).toMatchObject({ sprog: "sv", id: "par-1", token: "test-token" });
});
