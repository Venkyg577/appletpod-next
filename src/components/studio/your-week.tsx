"use client";

import { motion } from "framer-motion";

const scenes = [
  "Someone on your team opens ten websites and two newspapers every morning to find the three leads worth calling.",
  "Replies to your outbound sit in an inbox for two days because nobody owns the first draft.",
  "Your sales team has a list of 400 companies and no idea who in each one picks up the phone.",
  "The people who update your system can't type into a form. So the system is always out of date.",
  "You tried ChatGPT on it. It gave you a fine answer for some other company.",
];

export function YourWeek() {
  return (
    <section className="bg-warm py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
          If any of these is your week, keep reading.
        </h2>
        <ol className="mt-10 space-y-6">
          {scenes.map((scene, i) => (
            <li key={i} className="flex gap-5 items-baseline">
              <span className="font-heading text-sm font-semibold text-accent tabular-nums shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lg text-charcoal/75 leading-relaxed">{scene}</p>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
