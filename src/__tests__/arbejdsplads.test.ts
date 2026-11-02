import { describe, expect, it } from "vitest";
import { ARBEJDSPLADS_DECK, ARBEJDSPLADS_MINUTTER, arbejdspladsTrin } from "@/data/arbejdsplads";
import { getQuestionById } from "@/data/categories";

describe("/til-arbejdspladsen/", () => {
  const ids = arbejdspladsTrin.flatMap((t) => t.questionIds);

  it("adds up to 30 minutes with three rounds of 8 minutes and four questions each", () => {
    expect(arbejdspladsTrin.reduce((sum, t) => sum + t.minutter, 0)).toBe(ARBEJDSPLADS_MINUTTER);
    const runder = arbejdspladsTrin.filter((t) => t.questionIds.length > 0);
    expect(runder).toHaveLength(3);
    for (const r of runder) {
      expect(r.minutter).toBe(8);
      expect(r.questionIds).toHaveLength(4);
    }
  });

  it("uses existing light or medium cards from the colleague deck, none twice", () => {
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      const found = getQuestionById(id);
      expect(found, id).not.toBeNull();
      expect(found!.category.id).toBe(ARBEJDSPLADS_DECK);
      expect(found!.question.depth, id).not.toBe("dyb");
    }
  });
});
