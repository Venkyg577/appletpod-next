"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Send us what you have",
    desc: "Slides, notes, recordings, textbooks. Whatever exists. We figure out what should become interactive.",
  },
  {
    num: "02",
    title: "We build. You review.",
    desc: "AI generates the modules. A human checks the pedagogy. You see drafts early and stay in control.",
  },
  {
    num: "03",
    title: "Ship it.",
    desc: "Interactive modules that work on any device, plug into any LMS, and belong entirely to you.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
            How It Works
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
            Your content in. Interactive modules out.
          </h2>
        </motion.div>

        <div className="mt-14 flex flex-col md:flex-row md:items-stretch gap-6 md:gap-0">
          {steps.map((step, i) => (
            <div key={step.num} className="contents">
              <motion.div
                className="flex-1 bg-warm rounded-2xl p-6 md:p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">
                    {step.num}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-charcoal">
                    {step.title}
                  </h3>
                </div>
                <p className="text-charcoal/60 text-base leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-12 shrink-0 text-accent">
                  <MoveRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
