import { SITE_URL } from "@/config/site";

/** How many items the ItemList carries. Not all cards, to keep the HTML light. */
export const COLLECTION_ITEM_LIMIT = 10;

interface CollectionInput {
  /** Absolute path with trailing slash, e.g. "/spoergsmaal/parforhold/" */
  path: string;
  name: string;
  description: string;
  /** Texts of the cards on the page, in page order */
  items: readonly string[];
  inLanguage?: string;
}

/** schema.org CollectionPage with an ItemList of the first questions on the page. */
export function collectionJsonLd({ path, name, description, items, inLanguage = "da-DK" }: CollectionInput) {
  const names = items.map((t) => t.trim()).filter((t) => t.length > 0).slice(0, COLLECTION_ITEM_LIMIT);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${path}#collection`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    inLanguage,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: names.length,
      itemListElement: names.map((n, i) => ({ "@type": "ListItem", position: i + 1, name: n })),
    },
  };
}
