"use client";

import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function BookCallCTA() {
  return (
    <div className="relative rounded-xl border border-warm-dark/60 bg-warm p-7 md:p-9 overflow-hidden text-center">
      {/* Subtle accent gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0" />

      <h3 className="font-heading text-lg md:text-xl font-semibold text-charcoal mb-2">
        Need interactive learning content built?
      </h3>
      <p className="text-charcoal/55 text-base leading-relaxed mb-6 max-w-lg mx-auto">
        We design and ship interactive applets for K-12 math, science, and language learning. 100+ modules delivered. Let&apos;s talk about your project.
      </p>
      <a
        href="https://cal.com/venkatesh.g/30min"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("cta_click", {
            cta_type: "book_call",
            source: "blog_book_call_cta",
          })
        }
        className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-accent text-white text-base font-medium hover:bg-accent-hover transition-colors"
      >
        Book a Call
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
