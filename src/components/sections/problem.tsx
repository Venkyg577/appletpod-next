"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const comparisons = [
  {
    problem: "Your experts know it cold. But no one can make it interactive.",
    solution: "Send us what you have. Slides, notes, recordings. We handle the rest.",
  },
  {
    problem: "Freelancers use templates. They don't understand how people learn.",
    solution: "Custom-built from your content. Reviewed by someone with 10 years in education.",
  },
  {
    problem: "Agencies put four people between you and the work. None know your subject.",
    solution: "You talk to the person building it. No layers. No telephone game.",
  },
  {
    problem: "Storyline exports. Break on mobile. Lock you in. You own nothing.",
    solution: "React code. Works everywhere, offline included. Source files are yours.",
  },
  {
    problem: "Agencies charge $1,500–15,000+ per module. It still takes weeks. You still get a slide deck.",
    solution: "AppletPod starts at ~$175 per applet. Delivered in 5 days. Students actually interact with it.",
  },
];

function AnimatedX() {
  return (
    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
      >
        <X className="w-4 h-4 text-red-400" strokeWidth={3} />
      </motion.div>
    </div>
  );
}

function AnimatedCheck() {
  return (
    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
      >
        <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
      </motion.div>
    </div>
  );
}

function ComparisonRow({ problem, solution }: { problem: string; solution: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
      <motion.div
        className="flex items-start gap-3 bg-white rounded-xl p-4 md:p-5 border border-red-100/80"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <AnimatedX />
        <motion.p
          className="text-base text-charcoal/55 leading-relaxed pt-1 line-through decoration-red-300/50 decoration-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {problem}
        </motion.p>
      </motion.div>

      <motion.div
        className="flex items-start gap-3 bg-white rounded-xl p-4 md:p-5 border border-emerald-100/80"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 }}
      >
        <AnimatedCheck />
        <motion.p
          className="text-base text-charcoal/80 leading-relaxed font-medium pt-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          {solution}
        </motion.p>
      </motion.div>
    </div>
  );
}

export function Problem() {
  return (
    <section className="bg-warm py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
            The Problem
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
            The expertise exists. The tech doesn&apos;t.
          </h2>
        </motion.div>

        {/* Column headers */}
        <div className="hidden md:grid grid-cols-2 gap-6 mb-6 px-2">
          <motion.p
            className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-red-400"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            What you&apos;re stuck with
          </motion.p>
          <motion.p
            className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-emerald-500"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            How we fix it
          </motion.p>
        </div>

        <div className="relative">
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
            style={{ background: "linear-gradient(180deg, rgba(26,26,46,0.08) 0%, rgba(26,26,46,0.02) 100%)" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <div className="space-y-5 md:space-y-4">
            {comparisons.map((item, i) => (
              <ComparisonRow
                key={i}
                problem={item.problem}
                solution={item.solution}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
