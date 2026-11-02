import { getCategory } from "@/data/categories";

/** Most used decks, shown on the 404 page as /spoergsmaal/<id>/ landing pages. */
export const NOT_FOUND_SHORTCUT_IDS = ["parforhold", "familie", "venner", "boern", "kollegaer", "foerste-date"] as const;

/** Shortcuts with labels taken from the deck names, so they cannot drift. */
export function notFoundShortcuts(): { id: string; label: string }[] {
  return NOT_FOUND_SHORTCUT_IDS.map((id) => {
    const c = getCategory(id);
    if (!c) throw new Error(`404 shortcut points at missing deck: ${id}`);
    return { id, label: c.name };
  });
}
