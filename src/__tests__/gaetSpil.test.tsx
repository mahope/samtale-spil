import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GaetSpil } from "@/app/spil/gaet/GaetSpil";

describe("Gæt svaret", () => {
  beforeEach(() => localStorage.clear());

  const start = () => {
    render(<GaetSpil />);
    fireEvent.change(screen.getByLabelText("Spiller 1"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText("Spiller 2"), { target: { value: "Bo" } });
    fireEvent.click(screen.getByRole("button", { name: "Start spillet" }));
  };

  it("hides the answer until Afslør and gives the guesser a point", () => {
    start();
    fireEvent.change(screen.getByLabelText("Dit svar"), { target: { value: "Pizza på taget" } });
    fireEvent.click(screen.getByRole("button", { name: "Skjul og giv telefonen til Bo" }));
    expect(screen.queryByText("Pizza på taget")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Afslør" }));
    expect(screen.getByText("Pizza på taget")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Rigtigt gættet" }));
    expect(screen.getByText("Bo: 1")).toBeTruthy();
    expect(screen.getByText("Ana: 0")).toBeTruthy();
    // roles swap on the next card
    expect(screen.getByText("Bo, skriv dit svar")).toBeTruthy();
  });

  it("resets the points when a new game starts", () => {
    start();
    fireEvent.change(screen.getByLabelText("Dit svar"), { target: { value: "x" } });
    fireEvent.click(screen.getByRole("button", { name: "Skjul og giv telefonen til Bo" }));
    fireEvent.click(screen.getByRole("button", { name: "Afslør" }));
    fireEvent.click(screen.getByRole("button", { name: "Rigtigt gættet" }));
    fireEvent.click(screen.getByRole("button", { name: "Nyt spil" }));
    fireEvent.click(screen.getByRole("button", { name: "Start spillet" }));
    expect(screen.getByText("Bo: 0")).toBeTruthy();
  });

  it("shows everyone's hidden answers together in the 'alle' mode", () => {
    render(<GaetSpil />);
    fireEvent.change(screen.getByLabelText("Spiller 1"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText("Spiller 2"), { target: { value: "Bo" } });
    fireEvent.click(screen.getByLabelText(/Alle svarer skjult/));
    fireEvent.click(screen.getByRole("button", { name: "Start spillet" }));
    fireEvent.change(screen.getByLabelText("Dit svar"), { target: { value: "Svar A" } });
    fireEvent.click(screen.getByRole("button", { name: "Skjul og giv videre til Bo" }));
    expect(screen.queryByText("Svar A")).toBeNull();
    fireEvent.change(screen.getByLabelText("Dit svar"), { target: { value: "Svar B" } });
    fireEvent.click(screen.getByRole("button", { name: "Skjul svaret" }));
    expect(screen.getByText("Svar A")).toBeTruthy();
    expect(screen.getByText("Svar B")).toBeTruthy();
  });
});
