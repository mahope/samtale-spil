import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { AGE_KEY, AgeGate } from "@/voksen/AgeGate";

const App = () => (
  <AgeGate>
    <p>Bunkerne</p>
  </AgeGate>
);

describe("the 18+ age gate (issue #57)", () => {
  afterEach(() => {
    cleanup();
    window.localStorage.removeItem(AGE_KEY);
  });

  it("puts only the question in the static HTML, also for someone who has said yes", () => {
    window.localStorage.setItem(AGE_KEY, "ja");
    const html = renderToString(<App />);
    expect(html).toContain("Er du fyldt 18?");
    expect(html).not.toContain("Bunkerne");
  });

  it("shows nothing behind it until the player says yes, and remembers the answer", () => {
    render(<App />);
    expect(screen.queryByText("Bunkerne")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Ja, jeg er fyldt 18" }));
    expect(screen.getByText("Bunkerne")).toBeTruthy();
    expect(window.localStorage.getItem(AGE_KEY)).toBe("ja");
  });

  it("keeps the cards hidden after no, stores nothing and moves focus to the answer", async () => {
    render(<App />);
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Nej" })));
    expect(screen.queryByText("Bunkerne")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("heading", { name: "Kortene er for voksne" }));
    expect(window.localStorage.getItem(AGE_KEY)).toBeNull();
  });

  it("lets a stored yes through and asks again once Indstillinger has cleared it", () => {
    window.localStorage.setItem(AGE_KEY, "ja");
    render(<App />);
    expect(screen.getByText("Bunkerne")).toBeTruthy();
    cleanup();
    window.localStorage.removeItem(AGE_KEY);
    render(<App />);
    expect(screen.queryByText("Bunkerne")).toBeNull();
  });
});
