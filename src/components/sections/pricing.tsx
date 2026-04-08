"use client";

import { motion } from "framer-motion";
import { Check, MoveRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCurrency } from "@/hooks/useCurrency";

const enterpriseTier = {
  name: "Enterprise / Bulk",
  description:
    "Ordering 10+ applets or need a custom SLA, NDA, or dedicated support? Let's talk.",
  features: [
    "Volume pricing on bulk orders",
    "Priority delivery slots",
    "NDA available on request",
    "Dedicated point of contact",
    "Custom integration & LMS support",
    "Flexible payment terms",
  ],
};

const tiers = [
  {
    name: "Bring your storyboard",
    description:
      "You've already planned the content and interactions. We build the applet from your storyboard.",
    priceINR: "₹15,000",
    priceUSD: "~$175",
    features: [
      "1 production-ready interactive applet",
      "Built from your storyboard or script",
      "Offline-ready, works standalone",
      "Can be configured for LMS integration",
      "Source files included",
      "One round of revisions",
    ],
  },
  {
    name: "We handle everything",
    description:
      "You share your curriculum or raw content. We do the instructional design, storyboarding, and build.",
    priceINR: "₹30,000",
    priceUSD: "~$350",
    isPrimary: true,
    features: [
      "Everything in the storyboard tier",
      "Instructional design included",
      "We write the storyboard for you",
      "Reviewed by a 10-year EdTech veteran",
      "Direct communication — no layers",
      "Delivered in 5 business days",
    ],
  },
];

export function Pricing() {
  const { isIndia } = useCurrency();

  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
            Pricing
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight text-balance">
            Simple pricing. Per applet.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto text-balance">
            No retainers. No packages. Order one, see what you get.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`p-7 flex flex-col relative overflow-visible ${tier.isPrimary ? "border-2 border-accent" : ""}`}
            >
              {tier.isPrimary && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-block text-[0.6875rem] font-semibold tracking-[0.05em] uppercase px-2 py-1 rounded bg-accent-light text-accent whitespace-nowrap">
                  Most popular
                </span>
              )}

              <h3 className="text-xl font-heading font-bold text-charcoal mb-2">{tier.name}</h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-heading font-bold text-charcoal">
                    {isIndia ? tier.priceINR : tier.priceUSD}
                  </span>
                  <span className="text-sm text-muted-foreground">/ applet</span>
                </div>
                {isIndia && (
                  <p className="text-xs text-charcoal/40 mt-1">{tier.priceUSD} USD</p>
                )}
                {!isIndia && (
                  <p className="text-xs text-charcoal/40 mt-1">{tier.priceINR} INR</p>
                )}
              </div>

              {/* CTA */}
              <a
                href="https://cal.com/venkatesh.g/30min"
                className={`w-full mb-6 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg text-base font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  tier.isPrimary
                    ? "bg-accent hover:bg-accent-hover text-white"
                    : "bg-warm hover:bg-warm-dark text-charcoal border border-charcoal/10"
                }`}
              >
                Start with one applet <MoveRight className="w-4 h-4" />
              </a>

              {/* Features */}
              <div className="text-xs font-heading font-semibold text-charcoal/40 uppercase tracking-wider mb-4">
                What&apos;s included
              </div>
              <ul className="space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-base text-muted-foreground leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}

          {/* Enterprise card */}
          <Card className="p-7 flex flex-col border-dashed">
            <h3 className="text-xl font-heading font-bold text-charcoal mb-2">{enterpriseTier.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{enterpriseTier.description}</p>

            <div className="mb-6">
              <span className="text-4xl font-heading font-bold text-charcoal">Custom</span>
            </div>

            <a
              href="https://cal.com/venkatesh.g/30min"
              className="w-full mb-6 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg text-sm font-medium bg-warm hover:bg-warm-dark text-charcoal border border-charcoal/10 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Talk to us <MoveRight className="w-4 h-4" />
            </a>

            <div className="text-xs font-heading font-semibold text-charcoal/40 uppercase tracking-wider mb-4">
              What&apos;s included
            </div>
            <ul className="space-y-3 flex-1">
              {enterpriseTier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Competitor contrast */}
        <div className="mt-8 text-center">
          <p className="text-sm text-charcoal/45">
            Agencies charge $1,500+ per applet. We start at $175.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
