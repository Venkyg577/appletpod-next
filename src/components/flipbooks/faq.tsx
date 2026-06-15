"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do you rewrite my content?",
    a: "No. We keep your book as-is and add interactions on top. The text stays yours, exactly as written.",
  },
  {
    q: "What formats do you accept?",
    a: "PDF, print scans, EPUB, slides, Word. If a student can read it, we can probably activate it.",
  },
  {
    q: "Who owns the result?",
    a: "You do — pages, interactions, and source files. No lock-in, no recurring license to keep them alive.",
  },
  {
    q: "Does it work offline / in my LMS?",
    a: "Yes. Built to run on any device, offline-capable, and embeddable in your platform or LMS.",
  },
  {
    q: "How fast is a real project?",
    a: "One live page in about 24 hours. A full chapter or book is scoped on a call once we see the material.",
  },
  {
    q: "What does it cost?",
    a: "Depends on the book and how much of it goes interactive. Book a call and we'll scope it against your actual content.",
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

export function FlipbooksFaq() {
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
            Questions before you book.
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
      </div>
    </section>
  );
}
