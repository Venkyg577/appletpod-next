"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const steps = [
  {
    num: "01",
    title: "You send a chapter (or the whole book)",
    desc: "PDF, print scan, EPUB, slides — whatever you have. We read it and find the spots where a student is most likely to get lost or fake understanding.",
  },
  {
    num: "02",
    title: "We build the interactive layer, reviewed by an instructional designer",
    desc: "Each interaction — a manipulable simulation, a check-for-understanding, a drag-and-drop, instant feedback — is generated fast with our AI workflow, then reviewed by an experienced instructional designer so the pedagogy is right, not just the code.",
  },
  {
    num: "03",
    title: "You get a live Flipbook",
    desc: "The same book, now interactive, working on any device including offline. You own the files. Use it in your platform, your LMS, or as a standalone link.",
  },
];

export function FlipbooksHowItWorks() {
  return (
    <section className="bg-warm py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
            How It Works
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
            You send the book. We add the layer.
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="bg-white rounded-2xl p-6 md:p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="inline-flex w-10 h-10 rounded-full bg-accent text-white items-center justify-center font-heading font-bold text-sm mb-4">
                {step.num}
              </span>
              <h3 className="font-heading text-lg font-bold text-charcoal leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 text-charcoal/60 text-base leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-charcoal/70 text-lg">
          First live page back in about 24 hours.{" "}
          <a
            href="https://cal.com/venkatesh.g/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("cta_click", {
                cta_type: "book_call",
                source: "flipbooks_how_it_works",
              })
            }
            className="inline-flex items-center gap-1.5 text-accent font-semibold hover:text-accent-hover transition-colors duration-200 cursor-pointer align-middle"
          >
            Book a call <MoveRight className="w-4 h-4" />
          </a>
        </p>
      </div>
    </section>
  );
}
