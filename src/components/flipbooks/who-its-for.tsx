"use client";

import { motion } from "framer-motion";

const audiences = [
  {
    title: "Publishers",
    desc: "You have catalogs of books in print and PDF. Flipbooks turn a backlist into interactive editions students complete — without recommissioning the content.",
  },
  {
    title: "EdTech teams",
    desc: "Interactive is your product, not a nice-to-have. Activate the material you already license or own, as fast as your catalog changes, without standing up a build team.",
  },
  {
    title: "Universities & training programs",
    desc: "Faculty curriculum locked in textbooks and course PDFs. Your experts know the subject; we add the layer that makes students practice it.",
  },
];

export function FlipbooksWhoItsFor() {
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
            Who It&apos;s For
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
            Built for teams sitting on content nobody finishes.
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              className="bg-white rounded-2xl p-6 md:p-7 border-t-[3px] border-accent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="font-heading text-xl font-bold text-charcoal">
                {a.title}
              </h3>
              <p className="mt-3 text-charcoal/60 text-base leading-relaxed">
                {a.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-charcoal/60 text-lg max-w-3xl leading-relaxed">
          If you just need a PDF with a quiz stapled on, a cheaper tool will do.
          Flipbooks are for content where the learner actually has to practice,
          decide, and get feedback.
        </p>
      </div>
    </section>
  );
}
