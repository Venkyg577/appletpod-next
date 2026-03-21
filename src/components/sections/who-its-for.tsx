"use client";

import { motion } from "framer-motion";
import { GraduationCap, Zap, Heart, Building2, TrendingUp, User } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Universities & Colleges",
    desc: "STEM, nursing, science programs that need to digitize curriculum. Your faculty knows the subject. We build the applets they can't.",
  },
  {
    icon: Zap,
    title: "EdTech Startups",
    desc: "Content is your product. You need production-quality interactive applets, not slide decks. Fast iterations as your curriculum evolves.",
  },
  {
    icon: Heart,
    title: "Healthcare Training",
    desc: "Clinical simulations, compliance scenarios, procedure walkthroughs. Where training isn't optional and quality can't be compromised.",
  },
  {
    icon: Building2,
    title: "Corporate L&D Teams",
    desc: "Your employees need engaging training. We build what your LMS should have had from the start.",
  },
  {
    icon: TrendingUp,
    title: "Career & Upskilling",
    desc: "Interactive content that helps learners practice, not just watch. The kind that improves completion rates and outcomes.",
  },
  {
    icon: User,
    title: "Training Providers",
    desc: "You deliver the expertise, we make it interactive. Scale your training catalog without scaling your tech team.",
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
            You have the expertise. We have the tech.
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
          If your team has the domain knowledge and the budget, but not the tech
          team to build interactive content — that&apos;s exactly what AppletPod
          exists for.
        </motion.p>
      </div>
    </section>
  );
}
