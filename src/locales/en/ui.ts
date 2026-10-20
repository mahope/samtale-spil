import type { ui as da } from "../da/ui";

/** English UI words for Goodtalk; same keys as src/locales/da/ui.ts */
export const ui: typeof da = {
  numberLocale: "en-US",
  card: {
    flip: "Flip the card",
    flipHint: "Tap to flip the card",
    flipBack: "Tap to flip the card back.",
    askMore: "Ask more",
    countDown: "Count down",
    countdownSteps: ["3", "2", "1", "Point!"],
  },
  depth: { let: "Light", medium: "Medium", dyb: "Deep" },
  depthPrefix: "Depth",
  cardType: {
    label: { opgave: "Challenge", peg: "Point", "jeg-har-aldrig": "Never have I ever", joker: "Joker" },
    hint: {
      opgave: "Whoever draws the card does it.",
      peg: "Count down, and everyone points at the same time.",
      "jeg-har-aldrig": "Raise your hand if you have.",
      joker: "A wild card that shakes things up. You can turn jokers off in Settings.",
    },
  },
  play: {
    next: "Next card",
    hint: "Tap the card to flip it",
    back: "Back to all decks",
    progress: (answered: string, total: string) => `${answered} of ${total} cards`,
    progressLabel: (answered: number, total: number) => `${answered} of ${total} cards played`,
    loading: "Shuffling the cards",
    progressRegion: "Progress",
    reshuffle: "Shuffle again",
    backHref: "/play/",
    // Card ids are Danish deck ids, which are not URLs here; PlayDeck passes the real sharePath
    cardPath: () => "/play/",
  },
  deck: { cards: (n: number) => `${n} cards` },
  groups: {
    par: "For the two of you",
    familie: "Family",
    venner: "Friends and fun",
    skole: "School",
    spejder: "Scouts",
    dybt: "Deep talks and self-reflection",
  },
  favorite: { add: "Add to favorites", remove: "Remove from favorites" },
  share: {
    question: "Share question",
    copy: "Copy question to clipboard",
    category: "Share progress",
    copied: "Copied",
    dialogTitle: "Share the question",
  },
};
