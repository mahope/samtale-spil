import { describe, it, expect } from "vitest";
import { collectionJsonLd, COLLECTION_ITEM_LIMIT } from "./collectionJsonLd";

const base = { path: "/spoergsmaal/x/", name: "X", description: "Beskrivelse" };

describe("collectionJsonLd", () => {
  it("serialises to valid JSON and links to the WebSite", () => {
    const ld = JSON.parse(JSON.stringify(collectionJsonLd({ ...base, items: ["A?", "B?"] })));
    expect(ld["@type"]).toBe("CollectionPage");
    expect(ld.isPartOf["@id"]).toBe("https://snakkespil.dk/#website");
    expect(ld.inLanguage).toBe("da-DK");
    expect(ld.mainEntity["@type"]).toBe("ItemList");
  });

  it("caps the list and numbers positions from 1", () => {
    const items = Array.from({ length: 25 }, (_, i) => `Spørgsmål ${i}?`);
    const list = collectionJsonLd({ ...base, items }).mainEntity.itemListElement;
    expect(list).toHaveLength(COLLECTION_ITEM_LIMIT);
    expect(list.map((l) => l.position)).toEqual(Array.from({ length: COLLECTION_ITEM_LIMIT }, (_, i) => i + 1));
    expect(list[0].name).toBe("Spørgsmål 0?");
  });

  it("drops empty names and renumbers", () => {
    const ld = collectionJsonLd({ ...base, items: ["", "  ", "Ét?", "To?"] });
    expect(ld.mainEntity.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Ét?" },
      { "@type": "ListItem", position: 2, name: "To?" },
    ]);
    expect(ld.mainEntity.numberOfItems).toBe(2);
  });
});
