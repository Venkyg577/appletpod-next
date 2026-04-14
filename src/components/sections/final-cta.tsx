"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function FinalCta() {
  return (
    <section id="cta" className="bg-charcoal py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
          Let&apos;s Go
        </p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight">
          Your curriculum deserves better than slides.
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
          Send your content. Get back interactive applets that actually teach.
          Five days.
        </p>

        <div className="mt-10">
          <div className="max-w-md mx-auto">
            <a
              href="https://cal.com/venkatesh.g/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_type: "book_call",
                  source: "final_cta",
                })
              }
              className="inline-flex items-center justify-center gap-2 w-full h-14 text-base font-medium rounded-lg bg-accent text-white hover:bg-accent-hover cursor-pointer shadow-lg shadow-accent/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Book a Call <MoveRight className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-6 text-white/40 text-sm">
            Or email directly —{" "}
            <a
              href="mailto:Venkatesh@appletpod.com"
              className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors duration-200 cursor-pointer"
            >
              Venkatesh@appletpod.com
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
