import { describe, expect, it } from "vitest";
import { aftensmadAldre } from "@/data/aftensmad";
import { getQuestionById } from "@/data/categories";

describe("/samtaler-ved-aftensmaden/", () => {
  const ids = aftensmadAldre.flatMap((a) => a.questionIds);

  it("shows between 10 and 15 example questions, none twice", () => {
    expect(ids.length).toBeGreaterThanOrEqual(10);
    expect(ids.length).toBeLessThanOrEqual(15);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only uses cards that exist in the family and children's decks", () => {
    for (const id of ids) {
      const found = getQuestionById(id);
      expect(found, id).not.toBeNull();
      expect(["familie", "boern", "barndom", "familiehistorier"]).toContain(found!.category.id);
    }
  });
});
