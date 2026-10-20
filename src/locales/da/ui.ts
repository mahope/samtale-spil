/**
 * UI words used by components that both sites share (card, play screen, buttons).
 * Danish here; src/locales/en/ui.ts has the same keys. next.config.ts aliases
 * "@/locale/ui" to the site's locale (issue #30).
 */
export const ui = {
  numberLocale: "da-DK",
  card: {
    flip: "Vend kortet",
    flipHint: "Tryk for at vende kortet",
    flipBack: "Tryk for at vende kortet tilbage.",
    askMore: "Spørg videre",
    countDown: "Tæl ned",
    countdownSteps: ["3", "2", "1", "Peg nu!"],
  },
  depth: { let: "Let", medium: "Medium", dyb: "Dyb" },
  depthPrefix: "Dybde",
  cardType: {
    label: { opgave: "Opgave", peg: "Peg", "jeg-har-aldrig": "Jeg har aldrig", joker: "Joker" },
    hint: {
      opgave: "Den, der trækker kortet, gør det.",
      peg: "Tæl ned, og peg alle på samme tid.",
      "jeg-har-aldrig": "Ræk hånden op, hvis du har.",
      joker: "Et kort, der bryder rækken. Kan slås fra under Indstillinger.",
    },
  },
  play: {
    next: "Næste kort",
    hint: "Tryk på kortet for at vende det",
    back: "Tilbage til spillene",
    progress: (answered: string, total: string) => `${answered} af ${total} kort`,
    progressLabel: (answered: number, total: number) => `${answered} af ${total} kort spillet`,
    loading: "Blander kortene",
    progressRegion: "Fremskridt",
    reshuffle: "Bland forfra",
    backHref: "/spil/",
    /** Where a single card can be opened, for sharing */
    cardPath: (deckId: string, cardId: string) => `/spil/${deckId}/?question=${cardId}`,
  },
  deck: { cards: (n: number) => `${n} kort` },
  groups: {
    par: "Til jer to",
    familie: "Familien",
    venner: "Venner, fest og arbejde",
    skole: "Skole og uddannelse",
    spejder: "Spejder",
    dybt: "Dybe snakke og dig selv",
  } as Record<string, string>,
  favorite: { add: "Tilføj til favoritter", remove: "Fjern fra favoritter" },
  share: {
    question: "Del spørgsmål",
    copy: "Kopiér spørgsmål til udklipsholder",
    category: "Del kategori-fremskridt",
    copied: "Kopieret",
    dialogTitle: "Del spørgsmålet",
  },
};
