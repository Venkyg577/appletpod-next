"use client";

import { ArrowDown, Gift } from "lucide-react";

function Hero() {
  return (
    <div className="w-full">
      <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <div className="flex gap-8 pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 items-center justify-center flex-col">
          <div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-warm px-3 py-1.5 text-sm text-charcoal/60 font-medium">
              100+ interactive applets shipped
              <span className="text-accent font-semibold">&middot;</span>
              Built by a 10-year BYJU&apos;S veteran
            </span>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl tracking-tighter text-center font-heading font-extrabold leading-[1.08] text-charcoal">
              You built the course. Your learners stopped paying attention.
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-charcoal/60 max-w-2xl text-center font-light">
              AppletPod turns the curriculum you already have into interactive modules learners work through, not slides they click past. You bring the subject. We build the version that holds attention.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/free-applet"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg bg-accent text-white hover:bg-accent-hover cursor-pointer shadow-lg shadow-accent/25 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <Gift className="w-4 h-4" /> Get Your Free Applet
            </a>
            <a
              href="#before-after"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg border border-border bg-background hover:bg-muted cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              See a before and after <ArrowDown className="w-4 h-4" />
            </a>
          </div>
          <p className="text-sm text-charcoal/40 font-medium tracking-wide">
            5 days. Any LMS. You own the code.
          </p>
        </div>
      </div>
    </div>
  );
}

export { Hero };
