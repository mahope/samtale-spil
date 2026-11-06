import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// AppScreen navigates with the app router; the setup screens are rendered without a router here
vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: vi.fn(), replace: vi.fn(), push: vi.fn(), prefetch: vi.fn(), refresh: vi.fn(), forward: vi.fn() }),
  usePathname: () => "/spil/",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

import { Trappen } from "@/app/spil/trappen/Trappen";
import { PassThePhone } from "@/app/multiplayer/PassThePhone";
import { GaetSpil } from "@/app/spil/gaet/GaetSpil";
import { getCategory } from "@/data/categories";

const deck = getCategory("kend-din-partner")!;

describe("Opsætningsskærme i appen (issue #108)", () => {
  beforeEach(() => localStorage.clear());

  it("Trappen: the app setup has the navigation bar and no site link", () => {
    render(<Trappen variant="app" />);
    expect(screen.getByRole("heading", { level: 1, name: "Trappen" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Tilbage til Spil" })).toBeTruthy();
    expect(screen.queryByText("Tilbage til spillene")).toBeNull();
    expect(screen.getByRole("button", { name: /Til jer to/ })).toBeTruthy();
  });

  it("Trappen: the site setup keeps its own back link", () => {
    render(<Trappen />);
    expect(screen.getByRole("link", { name: "Tilbage til spillene" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1, name: "Trappen" })).toBeTruthy();
  });

  it("Trappen: choosing a group starts the run in the app", () => {
    render(<Trappen variant="app" />);
    fireEvent.click(screen.getByRole("button", { name: /Til jer to/ }));
    expect(screen.queryByRole("heading", { level: 2, name: "Hvem spiller I med?" })).toBeNull();
    expect(screen.getByText("Trin 1 af 3: lette spørgsmål")).toBeTruthy();
  });

  it("Send telefonen rundt: the app setup has the navigation bar and no site link", () => {
    render(<PassThePhone variant="app" />);
    expect(screen.getByRole("heading", { level: 1, name: "Send telefonen rundt" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Tilbage til Spil" })).toBeTruthy();
    expect(screen.queryByText("Tilbage til spillene")).toBeNull();
  });

  it("Send telefonen rundt: the site setup keeps its own back link", () => {
    render(<PassThePhone />);
    expect(screen.getByRole("link", { name: "Tilbage til spillene" })).toBeTruthy();
  });

  it("Send telefonen rundt: two names start the game in the app", () => {
    render(<PassThePhone variant="app" />);
    fireEvent.change(screen.getByLabelText("Spiller 1"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText("Spiller 2"), { target: { value: "Bo" } });
    fireEvent.click(screen.getByRole("button", { name: "Start med Ana" }));
    expect(screen.getByText("Anas tur")).toBeTruthy();
  });

  it("Gæt svaret: the app setup is on the felt with the navigation bar and no site link", () => {
    render(<GaetSpil questions={deck.questions} deckName={deck.name} backHref="/" backLabel="Spil" variant="app" />);
    expect(screen.getByRole("heading", { level: 1, name: "Gæt svaret" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Tilbage til Spil" })).toBeTruthy();
    expect(screen.queryByText("Tilbage til Kend din partner")).toBeNull();
    expect(document.querySelector(".app-navbar[data-tone='filt']")).toBeTruthy();
  });

  it("Gæt svaret: the site setup keeps its own back link", () => {
    render(<GaetSpil questions={deck.questions} deckName={deck.name} backHref="/spil/kend-din-partner/" />);
    expect(screen.getByRole("link", { name: "Tilbage til Kend din partner" })).toBeTruthy();
  });

  it("Gæt svaret: the game starts from the app setup", () => {
    render(<GaetSpil questions={deck.questions} deckName={deck.name} backHref="/" backLabel="Spil" variant="app" />);
    fireEvent.change(screen.getByLabelText("Spiller 1"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText("Spiller 2"), { target: { value: "Bo" } });
    fireEvent.click(screen.getByRole("button", { name: "Start spillet" }));
    expect(screen.getByText("Ana, skriv dit svar")).toBeTruthy();
  });
});
