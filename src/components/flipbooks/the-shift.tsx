"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function TheShift() {
  return (
    <section className="py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
            The Shift
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
            Same page. Now it talks back.
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 rounded-2xl border border-warm-dark overflow-hidden shadow-[0_4px_24px_rgba(26,26,46,0.06)] bg-warm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <iframe
            src="https://demos.appletpod.com/comparing-fractions/"
            title="Live applet: a fractions page that gives instant feedback when a student answers"
            loading="lazy"
            className="w-full h-[460px] md:h-[560px] block bg-white"
          />
        </motion.div>

        <p className="mt-6 text-base text-charcoal/60 leading-relaxed max-w-2xl">
          This is your existing page with one{" "}
          <a
            href="https://demos.appletpod.com/cbse-surface-area/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-semibold underline underline-offset-2 hover:text-accent-hover transition-colors duration-200"
          >
            applet
          </a>{" "}
          added. Nothing rewritten. The student can&apos;t skim past it — they
          have to engage, and they get told the moment they&apos;re wrong.
        </p>

        <a
          href="https://cal.com/venkatesh.g/30min"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("cta_click", {
              cta_type: "book_call",
              source: "the_shift",
            })
          }
          className="mt-6 inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-hover transition-colors duration-200 cursor-pointer"
        >
          Want this for one of your chapters? Book a call
          <MoveRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
