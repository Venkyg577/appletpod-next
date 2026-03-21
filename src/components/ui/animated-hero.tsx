"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, ArrowDown } from "lucide-react";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["simulations", "scenarios", "exercises", "assessments", "applets"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <div className="flex gap-8 pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 items-center justify-center flex-col">
          <div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-warm px-3 py-1.5 text-sm text-charcoal/60 font-medium">
              100+ interactive applets shipped
              <span className="text-accent font-semibold">&middot;</span>
              Built by a 10-year BYJU&apos;S veteran
            </span>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl tracking-tighter text-center font-heading font-extrabold leading-[1.08]">
              <span className="text-charcoal">Your curriculum turned into interactive</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-extrabold text-accent"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-charcoal/60 max-w-2xl text-center font-light">
              You bring the subject matter. We build the interactive content.
              AI does the heavy lifting. A human makes sure it actually teaches.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#proof"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg bg-accent text-white hover:bg-accent-hover cursor-pointer shadow-lg shadow-accent/25 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              See it in action <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="https://cal.com/venkatesh.g/30min"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg border border-border bg-background hover:bg-muted cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Book a Call <MoveRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-sm text-charcoal/40 font-medium tracking-wide">
            5 days. Any LMS. You own the code.
          </p>
        </div>
      </div>
    </div>
  );
}

export { Hero };
