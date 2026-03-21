"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export function Pilot() {
  return (
    <section id="pilot" className="bg-warm py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
            Get Started
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
            Start with one. See what&apos;s possible.
          </h2>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-lg text-charcoal/60 leading-relaxed max-w-lg mx-auto">
            Pick one topic from your curriculum. We&apos;ll turn it into a
            production-ready interactive applet — before you commit to anything
            bigger.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://cal.com/venkatesh.g/30min"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg bg-accent text-white hover:bg-accent-hover cursor-pointer shadow-lg shadow-accent/25 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Book a Call <MoveRight className="w-5 h-5" />
            </a>
            <a
              href="mailto:Venkatesh@appletpod.com"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg border border-charcoal/15 bg-white hover:bg-warm-dark text-charcoal cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Email us
            </a>
          </div>

          <p className="mt-6 text-xs text-charcoal/35 font-medium tracking-wide">
            No retainers. No long-term contracts. Just proof.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
