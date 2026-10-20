import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

/** Simple long-form page: om, privatliv */
export function TextPage({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-[40rem] px-4 pt-10 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          {title}
        </h1>
        {lead && <p className="mt-5 text-lg leading-relaxed">{lead}</p>}
        <div className="mt-8 space-y-5 leading-relaxed [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
