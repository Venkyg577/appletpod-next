"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

const lines = [
  {
    title: "Flipbooks.",
    body: "Your existing book, with applets on the pages students get wrong. First live page in about 24 hours.",
    href: "/flipbooks",
  },
  {
    title: "Applets.",
    body: "One concept, one interactive. From ₹15,000.",
    href: "/applets",
  },
];

export function Learning() {
  return (
    <section className="py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
          Interactive learning, still the core.
        </h2>
        <p className="mt-4 text-lg text-charcoal/60 max-w-2xl">
          AppletPod started here. I build interactive content that makes
          students practise instead of just read.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {lines.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group rounded-2xl border border-warm-dark bg-white p-7 hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(26,26,46,0.08)] transition-all duration-200"
            >
              <h3 className="font-heading text-2xl font-bold text-charcoal">
                {l.title}
              </h3>
              <p className="mt-3 text-charcoal/70 leading-relaxed">{l.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-accent font-semibold group-hover:text-accent-hover">
                See {l.title.replace(".", "")} <MoveRight className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>

        <p className="mt-10 text-lg text-charcoal/70 max-w-2xl">
          The same rule runs both sides of the studio. AI builds fast. A person
          checks that it works, whether &ldquo;works&rdquo; means a student
          learned it or a lead was real.
        </p>
      </motion.div>
    </section>
  );
}
