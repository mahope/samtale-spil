import type { TabSpec } from "./TabBar";

/** The Snakkespil app's tabs (layout.app.tsx); NativeBoot uses the roots for Android back */
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
