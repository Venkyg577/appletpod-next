"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const demos = [
  {
    slug: "cbse-digital-book",
    label: "Fractions workbook",
    sub: "Flip pages, answer embedded checks, get instant feedback.",
  },
  {
    slug: "cbse-surface-area",
    label: "Cylinder surface area",
    sub: "Manipulate it and watch the net unfold.",
  },
  {
    slug: "equivalent-fractions",
    label: "Equivalent fractions",
    sub: "Build clay blocks to see why ½ = 2⁄4 = 4⁄8.",
  },
];

const numbers = [
  { stat: "100+", label: "interactive modules shipped" },
  {
    stat: "10 yrs",
    label:
      "at BYJU'S — ran studio operations for 300+ people and built the interactive content engine behind one of the world's largest EdTech platforms",
  },
  { stat: "24 hrs", label: "from a static page to a live interactive one" },
];

export function FlipbooksProof() {
  return (
    <section className="py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
            Proof
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
            Don&apos;t take my word for it. Try the pages.
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="rounded-2xl border border-warm-dark overflow-hidden shadow-[0_4px_24px_rgba(26,26,46,0.06)] bg-warm">
                <iframe
                  src={`https://demos.appletpod.com/${demo.slug}/`}
                  title={`Live applet: ${demo.label}`}
                  loading="lazy"
                  className="w-full h-[320px] block bg-white"
                />
              </div>
              <p className="mt-4 font-heading font-semibold text-charcoal">
                {demo.label}
              </p>
              <p className="text-sm text-charcoal/60">{demo.sub}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-charcoal/60 text-lg">
          Each of these started as a static textbook page. Each took under 24
          hours.
        </p>

        <div className="mt-12 grid sm:grid-cols-3 gap-8 border-t border-warm-dark pt-10">
          {numbers.map((n) => (
            <div key={n.stat}>
              <p className="font-heading text-4xl font-extrabold text-accent leading-none">
                {n.stat}
              </p>
              <p className="mt-3 text-charcoal/60 text-base leading-relaxed">
                {n.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="https://cal.com/venkatesh.g/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("cta_click", {
                cta_type: "book_call",
                source: "flipbooks_proof",
              })
            }
            className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg bg-accent text-white hover:bg-accent-hover cursor-pointer shadow-lg shadow-accent/25 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Book a Call <MoveRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
