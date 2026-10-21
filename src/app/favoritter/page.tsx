"use client";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FavoritterIndhold } from "./FavoritterIndhold";

export default function FavoritesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-2xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Dine favoritter
        </h1>
        <FavoritterIndhold />
      </main>
      <SiteFooter />
    </>
  );
}
