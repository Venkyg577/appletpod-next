"use client";

import { motion } from "framer-motion";
import { GraduationCap, Zap, Building2 } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "University and college faculty",
    desc: "You spent the semester building slides. Attendance is fine. Attention isn't. We turn your lectures into modules learners manipulate, make decisions in, and get instant feedback from, so the concept sticks before the exam, not the night before it.",
  },
  {
    icon: Zap,
    title: "EdTech startups",
    desc: "Your content team writes it. Learners click next and forget it. We build the interactive version they actually work through, and we ship it as fast as your curriculum changes.",
  },
  {
    icon: Building2,
    title: "Corporate and L&D teams",
    desc: "You spent lakhs on Storyline and people still skip the training. We rebuild it as scenarios your team finishes because they're useful, not because they're mandatory.",
  },
];

export function WhoItsFor() {
  return (
    <section className="bg-warm py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
            Three teams we build for
          </h2>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="w-11 h-11 rounded-lg bg-accent-light flex items-center justify-center">
                <a.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="mt-4 font-heading font-bold text-charcoal">{a.title}</h3>
              <p className="mt-2 text-base text-charcoal/55 leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 text-charcoal/50 text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          If you need slides, talking-head videos, or a quiz bolted onto a PDF, a cheaper tool will do it. AppletPod is for teams whose learners need to practice, decide, and get feedback. If you have the subject knowledge and the budget but not the team to build that, that is exactly what we do.
        </motion.p>
      </div>
    </section>
  );
}
