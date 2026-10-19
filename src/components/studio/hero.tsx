"use client";

import { MoveRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function StudioHero() {
  return (
    <section className="px-4 md:px-6 lg:px-8 pt-32 md:pt-44 pb-16 md:pb-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-4">
          AppletPod. A build studio.
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.08] text-charcoal text-balance">
          Your team does the same work by hand every morning.{" "}
          <span className="text-accent">I build the agent that does it.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-charcoal/60 leading-relaxed font-light max-w-2xl">
          Reading, sorting, chasing, drafting. Work that eats an hour of a good
          person&apos;s day and never shows up in a report. I turn it into an
          agent that runs on its own, with a person checking the parts that
          matter.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="https://cal.com/venkatesh.g/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("cta_click", {
                cta_type: "book_call",
                source: "studio_hero",
              })
            }
            className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg bg-accent text-white hover:bg-accent-hover cursor-pointer shadow-lg shadow-accent/25 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Bring me one task <MoveRight className="w-4 h-4" />
          </a>
          <a
            href="#builds"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg border border-border bg-background hover:bg-muted cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            See what I have built
          </a>
        </div>

        <p className="mt-7 text-sm text-charcoal/50 font-medium tracking-wide max-w-2xl">
          For ten years I ran a content studio of about two hundred people at
          BYJU&apos;S. Since 2023 I build with AI. Agents in production for
          clients in real estate, logistics and education.
        </p>
      </div>
    </section>
  );
}
