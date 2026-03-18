"use client";

import { motion } from "framer-motion";

const principles = [
  {
    num: "01",
    title: "AI builds it. A human checks it teaches.",
    desc: "The AI handles code, layouts, interactions. A 10-year education veteran reviews every module before it ships.",
  },
  {
    num: "02",
    title: "Days, not months.",
    desc: "Same output agencies take 8 weeks to deliver. Different workflow, not cut corners.",
  },
  {
    num: "03",
    title: "You talk to the builder.",
    desc: "No account managers. No project coordinators. The person answering your questions is the person writing the code.",
  },
  {
    num: "04",
    title: "Your content. Not a template.",
    desc: "We don't have a gallery you pick from. Every module starts from your curriculum, your objectives.",
  },
  {
    num: "05",
    title: "You own everything.",
    desc: "Source code, assets, the lot. No lock-in. No proprietary formats. Take it and leave whenever.",
  },
  {
    num: "06",
    title: "Works everywhere. Even offline.",
    desc: "React-based. Any device, any LMS, SCORM-compatible. No app installs. No Storyline exports.",
  },
];

export function WhyAppletPod() {
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
            Why AppletPod
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight max-w-2xl">
            Six things that make this work.
          </h2>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.num}
              className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="font-heading text-3xl font-extrabold text-accent/30">
                {p.num}
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold text-charcoal">
                {p.title}
              </h3>
              <p className="mt-2 text-base text-charcoal/55 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
