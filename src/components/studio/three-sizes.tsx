"use client";

import { motion } from "framer-motion";

const sizes = [
  {
    title: "A written brief.",
    body: "The judgment already exists, in your head. Nobody has written it down, so AI guesses. I sent 4,000 cold emails before I learned this. Almost nobody replied.",
    time: "An afternoon.",
  },
  {
    title: "A small tool.",
    body: "The rule is clear and the work repeats. A form, a sheet, a daily list.",
    time: "A few days.",
  },
  {
    title: "An agent system.",
    body: "The work runs every day, needs memory, and needs a person to approve before anything goes out.",
    time: "A working first version in about two weeks. More if the work is complex.",
  },
];

export function ThreeSizes() {
  return (
    <section className="py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight max-w-3xl">
          Not everything needs an agent.
        </h2>
        <p className="mt-4 text-lg text-charcoal/60 max-w-2xl">
          When you show me the task, it usually lands in one of three places.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {sizes.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border border-warm-dark bg-white p-6 md:p-7 flex flex-col"
            >
              <span className="font-heading text-sm font-semibold text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-charcoal">
                {s.title}
              </h3>
              <p className="mt-3 text-charcoal/70 leading-relaxed flex-1">
                {s.body}
              </p>
              <p className="mt-5 text-sm font-semibold text-charcoal">{s.time}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-lg text-charcoal/70 max-w-2xl">
          Most firms need the first or the second. If that is you, I will say
          so on the call.
        </p>
      </motion.div>
    </section>
  );
}
