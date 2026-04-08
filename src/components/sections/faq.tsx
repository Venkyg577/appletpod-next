"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How fast can you really deliver?",
    a: "Most applets are delivered within 5 business days. Complex simulations with custom logic may take 7–10 days. We'll give you a realistic timeline upfront — no surprises.",
  },
  {
    q: "What if I don't have polished content — just rough notes?",
    a: "That's fine. Most clients send us raw curriculum — slides, textbooks, even recordings. We extract the learning objectives and figure out what should become interactive.",
  },
  {
    q: "Do the applets work with our LMS?",
    a: "Yes. Every applet is offline-ready and can be configured to work with your LMS. They work standalone on any device, with or without LMS integration.",
  },
  {
    q: "What if I need changes after delivery?",
    a: "You get the source files. You can make changes yourself or come back to us. We include one round of revisions in every project.",
  },
  {
    q: "How is this different from hiring a freelancer on Upwork?",
    a: "Freelancers build from templates. We build custom from your curriculum. Every applet is reviewed by an experienced instructional designer — not just a developer checking if the code runs. And we deliver in days, not weeks.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-5 text-left font-heading font-semibold text-charcoal hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
        aria-expanded={open}
      >
        {q}
        <ChevronDown
          className={`w-5 h-5 text-charcoal/30 shrink-0 ml-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 text-base text-charcoal/60 leading-relaxed -mt-1">
          {a}
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="bg-warm py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
            Common Questions
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
            Got questions? We&apos;ve got answers.
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>

        <p className="mt-6 text-sm text-charcoal/45 text-center">
          Can&apos;t find your answer? Email{" "}
          <a
            href="mailto:Venkatesh@appletpod.com"
            className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors duration-200 cursor-pointer"
          >
            Venkatesh@appletpod.com
          </a>{" "}
          — we respond within 24 hours.
        </p>
      </div>
    </section>
  );
}
