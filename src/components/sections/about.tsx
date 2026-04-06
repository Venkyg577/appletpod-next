"use client";

import { motion } from "framer-motion";
import { Check, Linkedin } from "lucide-react";
import Image from "next/image";

const credentials = ["10+ Years EdTech", "300+ Team Led", "100+ Applets Shipped"];

export function About() {
  return (
    <section className="py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
            The Builder
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
            Who&apos;s behind this?
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col md:flex-row gap-8 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-accent/20">
              <Image
                src="/ProfilePhoto.jpg"
                alt="Venkatesh G — AppletPod"
                width={144}
                height={144}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          <div className="flex-1">
            <blockquote className="text-xl md:text-2xl font-heading font-semibold text-charcoal/80 italic leading-snug border-l-4 border-accent pl-5 mb-6">
              &ldquo;I spent a decade at BYJU&apos;S understanding how people actually
              learn. Now I build the same quality — independently, faster, with
              AI.&rdquo;
            </blockquote>

            <div className="space-y-4 text-charcoal/65 text-[1.0625rem] leading-[1.75]">
              <p>
                I&apos;m <strong className="text-charcoal font-semibold">Venkatesh G</strong>. I
                led studio operations for 300+ people at BYJU&apos;S and helped build
                the interactive content engine behind one of the world&apos;s largest
                EdTech platforms.
              </p>
              <p>
                I&apos;ve lived at the intersection of pedagogy, technology, and scale
                for over a decade — not as a developer guessing at instructional
                design, but as someone who understands both deeply.
              </p>
              <p className="font-semibold text-charcoal">
                AppletPod isn&apos;t an agency. It&apos;s a studio. One senior builder with
                AI leverage, direct communication, and a decade of knowing what
                works in education.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {credentials.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal/50 bg-warm px-3 py-1.5 rounded-full"
                >
                  <Check className="w-3.5 h-3.5 text-accent" />
                  {c}
                </span>
              ))}
              <a
                href="https://www.linkedin.com/in/venkatesh-golisetti/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0A66C2] px-3 py-1.5 rounded-full hover:bg-[#004182] transition-colors duration-200"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
