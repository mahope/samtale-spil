import { describe, it, expect } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { CardDraw, type DrawCard } from "@/components/home/CardDraw";

const cards: DrawCard[] = [
  { id: "a", categoryId: "sjove", categoryName: "Sjove", text: "Første spørgsmål?", depth: "let" },
  { id: "b", categoryId: "parforhold", categoryName: "Parforhold", text: "Andet spørgsmål?", depth: "let" },
];

describe("CardDraw", () => {
  it("shows the card before the animation chunk loads, keeps it after, and draws a new one", async () => {
    const { container } = render(<CardDraw cards={cards} />);
    expect(screen.getAllByText("Første spørgsmål?").length).toBeGreaterThan(0);
    expect(container.querySelector("[data-card-stack]")).toBeNull();
    const drawButton = screen.getByRole("button", { name: "Træk et nyt kort" });

    await act(async () => {
      drawButton.focus(); // starts the lazy load
      await import("@/components/home/CardStack");
    });
    await waitFor(() => expect(container.querySelector('[data-card-stack="a"]')).not.toBeNull());
    expect(screen.getAllByText("Første spørgsmål?").length).toBeGreaterThan(0);

    await act(async () => {
      drawButton.click();
    });
    expect(screen.getAllByText("Andet spørgsmål?").length).toBeGreaterThan(0);
    await waitFor(() => expect(container.querySelector('[data-card-stack="b"]')).not.toBeNull());
  });
});
