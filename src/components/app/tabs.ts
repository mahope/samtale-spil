import type { TabSpec } from "./TabBar";

/** The Snakkespil app's tabs (layout.app.tsx) */
export const SNAKKESPIL_TABS: TabSpec[] = [
  { href: "/", label: "Spil", icon: "kort", owns: ["/spil/", "/multiplayer/"] },
  { href: "/dagens-spoergsmaal/", label: "I dag", icon: "kalender" },
  { href: "/favoritter/", label: "Favoritter", icon: "hjerte" },
  {
    href: "/mere/",
    label: "Mere",
    icon: "mere",
    owns: ["/indstillinger/", "/mine-spoergsmaal/", "/statistik/", "/saadan-spiller-i/", "/lege/", "/ikke-terapi/", "/om/", "/privatliv/"],
  },
];

/** The Goodtalk app's tabs (layout.intlapp.tsx) */
export const GOODTALK_TABS: TabSpec[] = [
  { href: "/", label: "Play", icon: "kort", owns: ["/play/"] },
  { href: "/daily-question/", label: "Today", icon: "kalender" },
  { href: "/favorites/", label: "Favorites", icon: "hjerte" },
  { href: "/more/", label: "More", icon: "mere", owns: ["/settings/", "/how-to-play/", "/games/", "/about/", "/privacy/"] },
];

/** The Snakkespil 18+ app's tabs (layout.voksen.tsx) */
export const VOKSEN_TABS: TabSpec[] = [
  { href: "/", label: "Bunker", icon: "kort", owns: ["/spil/"] },
  { href: "/i-aften/", label: "I aften", icon: "maane" },
  { href: "/favoritter/", label: "Favoritter", icon: "hjerte" },
  { href: "/mere/", label: "Mere", icon: "mere", owns: ["/indstillinger/", "/ikke-terapi/", "/om/", "/privatliv/"] },
];
