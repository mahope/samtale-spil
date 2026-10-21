import { getTotalQuestionCount } from "@/data/categories";

/** "Andre måder at spille på": on /spil/ and on the app's Spil tab */
export const modes = [
  {
    href: "/spil/trappen/",
    deck: "dybe",
    title: "Trappen",
    text: "Tolv kort fra let til dyb, som i Arons 36 spørgsmål.",
  },
  {
    href: "/spil/aftensmad/",
    deck: "familie",
    title: "Aftensmad",
    text: "Tre lette kort til familiebordet.",
  },
  {
    href: "/spil/aaret-der-gik/",
    deck: "aaret",
    title: "Året der gik",
    text: "Fire runder: se tilbage, gæt, se frem og gæt igen. Til nytår og fødselsdage.",
  },
  {
    href: "/spil/shuffle-all/",
    deck: "blandet",
    title: "Bland alle kort",
    text: `Alle ${getTotalQuestionCount().toLocaleString("da-DK")} spørgsmål i én bunke.`,
  },
  {
    href: "/multiplayer/",
    deck: "venner",
    title: "Send telefonen rundt",
    text: "I skiftes til at trække og svare. Holder styr på, hvis tur det er.",
  },
  {
    href: "/spil/gaet/",
    deck: "kend-din-partner",
    title: "Gæt svaret",
    text: "Én svarer i hemmelighed, og den næste gætter. Med point, hvis I vil.",
  },
  {
    href: "/mine-spoergsmaal/",
    deck: "egne",
    title: "Dine egne spørgsmål",
    text: "Skriv jeres egne kort og spil med dem.",
  },
];
