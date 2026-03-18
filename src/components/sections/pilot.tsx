"use client";

import { motion } from "framer-motion";
import { MoveRight, Check } from "lucide-react";

const checklist = [
  "3 custom interactive modules built from your content",
  "Reviewed by an experienced instructional designer",
  "SCORM-compatible, works on any device",
  "Source files are yours",
  "Delivered in 5 business days",
];

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
            Not convinced? Send us one lesson. We&apos;ll show you.
          </h2>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Scarcity badge */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold tracking-[0.05em] uppercase px-2 py-1 rounded bg-accent-light text-accent">
              Limited pilot spots each month &middot; 7 remaining
            </span>
          </div>

          <div className="bg-white rounded-2xl p-7 md:p-10 shadow-sm text-left inline-block max-w-lg w-full">
            <p className="font-heading text-2xl md:text-3xl font-extrabold text-accent text-center leading-snug">
              $1,500. 3&nbsp;modules.
              <br />
              5&nbsp;business days.
            </p>
            <p className="mt-5 text-charcoal/60 text-[1.0625rem] leading-relaxed">
              Pick any section of your curriculum. We&apos;ll turn it into 3
              production-ready interactive modules. You see the quality, the
              speed, and the process — before committing to anything bigger.
            </p>
            <ul className="mt-6 space-y-3.5">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-charcoal/60">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-charcoal/35 text-center font-medium tracking-wide">
              No retainers. No long-term contracts. Just proof.
            </p>
          </div>
        </motion.div>

        <div className="mt-8">
          <a
            href="#cta"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg bg-accent text-white hover:bg-accent-hover cursor-pointer shadow-lg shadow-accent/25 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Start a Pilot — $1,500 <MoveRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
