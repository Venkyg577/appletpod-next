"use client";

import { motion } from "framer-motion";

export function FlipbooksProblem() {
  return (
    <section className="bg-warm py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
          The Problem
        </p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
          Your books aren&apos;t the problem. Reading them is.
        </h2>
        <div className="mt-8 space-y-5 text-lg text-charcoal/70 leading-relaxed">
          <p>
            You have the content. Textbooks, course PDFs, training manuals —
            written by people who know the subject cold.
          </p>
          <p>
            But reading is passive. The page explains fractions; the student
            nods, moves on, and still divides wrong in the exam. Watching a
            video has the same gap. There&apos;s no moment where the learner has
            to <em className="text-charcoal not-italic font-semibold">do</em>{" "}
            the thing and find out if they actually got it.
          </p>
          <p>
            Fixing that usually means commissioning new interactive content —
            agencies, long timelines, four people between you and the output,
            and a rebuild of material you already own.
          </p>
          <p>
            So most books stay static. Not because anyone wants them that way.
            Because turning them interactive has always been slow and expensive.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
