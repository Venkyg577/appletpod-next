"use client";

import { motion } from "framer-motion";

const values = [
  {
    title: "Your book, activated — not rebuilt.",
    desc: "We add to what you have. No rewriting the curriculum, no new authoring tool to learn.",
  },
  {
    title: "Pedagogy stays in the loop.",
    desc: "Every interaction is reviewed by an instructional designer with 10+ years in education. AI builds fast; human judgment makes sure it teaches.",
  },
  {
    title: "You own everything.",
    desc: "The pages, the interactions, the source files. No proprietary format, no lock-in. Works on any device, including offline.",
  },
  {
    title: "Speed that's real.",
    desc: "A static page to a live interactive one in about 24 hours, because the workflow is built different — not because corners get cut.",
  },
  {
    title: "You talk to the builder.",
    desc: "No account managers, no project-coordinator layer. You work directly with the person making your pages.",
  },
];

export function FlipbooksWhatYouGet() {
  return (
    <section className="py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
            What You Get
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
            What makes a Flipbook different.
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 gap-x-10 gap-y-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            >
              <h3 className="font-heading text-lg font-bold text-charcoal">
                {v.title}
              </h3>
              <p className="mt-2 text-charcoal/60 text-base leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
