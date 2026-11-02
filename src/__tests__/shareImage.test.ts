import { describe, it, expect } from "vitest";
import { fitText, wrapText } from "@/lib/shareImage";

// Every character is half the font size wide
const at = (size: number) => (t: string) => t.length * size * 0.5;

describe("wrapText", () => {
  it("keeps a short text on one line", () => {
    expect(wrapText("Hvad er du stolt af?", 1000, at(40))).toEqual(["Hvad er du stolt af?"]);
  });

  it("wraps at word boundaries within the width", () => {
    const lines = wrapText("en to tre fire fem seks syv otte", 200, at(40));
    expect(lines.length).toBeGreaterThan(1);
    for (const l of lines) expect(at(40)(l)).toBeLessThanOrEqual(200);
    expect(lines.join(" ")).toBe("en to tre fire fem seks syv otte");
  });

  it("breaks a single word wider than the line", () => {
    const lines = wrapText("Uforholdsmæssigtlangtordsomikkekanvære", 200, at(40));
    for (const l of lines) expect(at(40)(l)).toBeLessThanOrEqual(200);
    expect(lines.join("")).toBe("Uforholdsmæssigtlangtordsomikkekanvære");
  });

  it("returns no lines for empty text", () => {
    expect(wrapText("   ", 200, at(40))).toEqual([]);
  });
});

describe("fitText", () => {
  const W = 940;
  const H = 750;

  it("uses the largest size for a short question", () => {
    expect(fitText("Hvad glæder du dig til?", W, H, at).size).toBe(84);
  });

  it("shrinks a long question until it fits, never below the minimum when it can fit", () => {
    const long = "Hvis du kunne vælge ét øjeblik i dit liv at opleve igen, hvilket ville det være, og hvad er det ved netop det øjeblik der gør det så særligt for dig? ".repeat(2);
    const r = fitText(long, W, H, at);
    expect(r.size).toBeLessThan(84);
    expect(r.lines.length * r.size * 1.25).toBeLessThanOrEqual(H);
    for (const l of r.lines) expect(at(r.size)(l)).toBeLessThanOrEqual(W);
    expect(r.lines.join(" ")).toBe(long.trim().split(/\s+/).join(" "));
  });

  it("still fits an absurdly long text by shrinking below the minimum", () => {
    const huge = "ord ".repeat(600).trim();
    const r = fitText(huge, W, H, at);
    expect(r.lines.length * r.size * 1.25).toBeLessThanOrEqual(H);
    expect(r.lines.join(" ")).toBe(huge);
  });
});
