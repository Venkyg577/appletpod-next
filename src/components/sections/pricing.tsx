"use client";

import { motion } from "framer-motion";
import { Pricing as PricingTable } from "@/components/ui/pricing-table";

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <PricingTable
          icon={
            <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent">
              Pricing
            </p>
          }
          title="Transparent pricing. No surprises."
          subtitle="See how AppletPod compares to the alternatives."
          tiers={[
            {
              name: "Premium Agency",
              description: "Full-service studios like SweetRush. Enterprise-grade but enterprise-priced.",
              price: "$45K–180K",
              billingPeriod: "/hr of content",
              buttonText: "Not for most teams",
              features: [
                { text: "11–20 weeks delivery" },
                { text: "Custom + Storyline" },
                { text: "Dedicated ID team" },
                { text: "Communication through PM layers" },
              ],
              featuresTitle: "What you get",
            },
            {
              name: "Mid-tier Agency",
              description: "Smaller shops with project managers. Better pricing, still slow.",
              price: "$5K–15K",
              billingPeriod: "/module",
              buttonText: "Compare with us",
              features: [
                { text: "4–8 weeks delivery" },
                { text: "Mostly Storyline" },
                { text: "Pedagogy review sometimes" },
                { text: "Communication through PM layers" },
              ],
              featuresTitle: "What you get",
            },
            {
              name: "AppletPod",
              description: "AI-powered workflow + experienced instructional designer. Fast, custom, direct.",
              price: "$2,500–5,000",
              billingPeriod: "/module",
              buttonText: "Book a Call →",
              buttonHref: "#cta",
              isPrimary: true,
              features: [
                { text: "1–2 weeks delivery" },
                { text: "React (custom code)" },
                { text: "Every module reviewed by ID" },
                { text: "Direct with builder — no layers" },
                { text: "SCORM-compatible, works offline" },
                { text: "Source files included" },
              ],
              featuresTitle: "What you get",
            },
            {
              name: "Freelancer",
              description: "Upwork, Fiverr. Cheap but inconsistent. Templates, not custom.",
              price: "$1,500–3,000",
              billingPeriod: "/module",
              buttonText: "Compare with us",
              features: [
                { text: "2–4 weeks delivery" },
                { text: "Storyline / templates" },
                { text: "Pedagogy review rarely" },
                { text: "Communication variable" },
              ],
              featuresTitle: "What you get",
            },
          ]}
          footerTitle="Not sure which is right?"
          footerDescription="Start with a $1,500 pilot — 3 modules in 5 business days. See the quality before committing."
          footerButtonText="Start a Pilot →"
          footerButtonHref="#pilot"
        />
      </motion.div>
    </section>
  );
}
