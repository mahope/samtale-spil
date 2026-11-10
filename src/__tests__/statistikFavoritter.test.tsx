import { describe, it, expect, vi, afterEach, afterAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { STORAGE_KEYS } from "@/constants";

// The Danish half of the app (next.config.ts sets APP_BASE_PATH); src/lib/loadCardTexts.ts reads it on load
vi.stubEnv("APP_BASE_PATH", "/da");
const { Statistik } = await import("@/app/statistik/Statistik");
const { cardTexts } = await import("@/lib/cardTexts");

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
afterAll(() => vi.unstubAllEnvs());

const savedInEnglish = [
  { id: "par-1", categoryId: "par", text: "What's the first thing you noticed about me?", depth: "let", savedAt: 1 },
];

describe("favourites in the app's Statistik screen", () => {
  it("show a favourite saved in the English half in Danish", async () => {
    window.localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(savedInEnglish));
    render(<Statistik />);
    expect(await screen.findByText(cardTexts.get("par-1")!, {}, { timeout: 4000 })).toBeTruthy();
    expect(screen.queryByText(savedInEnglish[0].text)).toBeNull();
  });
});
