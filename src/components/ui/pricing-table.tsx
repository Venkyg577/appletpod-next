"use client"

import type React from "react"
import { Check, Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface PricingFeature {
  text: string
  hasInfo?: boolean
}

export interface PricingTier {
  name: string
  description: string
  price?: string
  priceLabel?: string
  billingPeriod?: string
  buttonText: string
  buttonHref?: string
  isPrimary?: boolean
  features: PricingFeature[]
  featuresTitle?: string
}

export interface PricingProps {
  icon?: React.ReactNode
  title: string
  subtitle: string
  tiers: PricingTier[]
  footerTitle?: string
  footerDescription?: string
  footerButtonText?: string
  footerButtonHref?: string
  className?: string
}

export function Pricing({
  icon,
  title,
  subtitle,
  tiers,
  footerTitle,
  footerDescription,
  footerButtonText,
  footerButtonHref,
  className,
}: PricingProps) {
  return (
    <div className={cn("w-full py-16 px-4", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {icon && <div className="flex justify-center mb-4">{icon}</div>}
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-balance">{title}</h1>
          <p className="text-muted-foreground text-lg text-balance max-w-xl mx-auto">{subtitle}</p>
        </div>

        {/* Pricing Cards */}
        <div className={cn(
          "grid grid-cols-1 gap-6",
          tiers.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"
        )}>
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={cn(
                "p-6 flex flex-col",
                tier.isPrimary && "ring-2 ring-accent"
              )}
            >
              {/* Tier Header */}
              <div className="mb-6">
                <h2 className="text-xl font-heading font-bold mb-2">{tier.name}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {tier.price ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-heading font-bold">{tier.price}</span>
                    {tier.billingPeriod && (
                      <span className="text-muted-foreground text-sm">{tier.billingPeriod}</span>
                    )}
                  </div>
                ) : (
                  <div className="text-lg font-heading font-semibold">{tier.priceLabel}</div>
                )}
              </div>

              {/* CTA Button */}
              <a
                href={tier.buttonHref || "#cta"}
                className={cn(
                  "w-full mb-6 inline-flex items-center justify-center h-10 px-4 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  tier.isPrimary
                    ? "bg-accent hover:bg-accent-hover text-white"
                    : "bg-warm hover:bg-warm-dark text-charcoal border border-charcoal/10",
                )}
              >
                {tier.buttonText}
              </a>

              {/* Features Title */}
              {tier.featuresTitle && (
                <div className="mb-4 text-xs font-heading font-semibold text-charcoal/50 uppercase tracking-wider">
                  {tier.featuresTitle}
                </div>
              )}

              {/* Features List */}
              <div className="space-y-3 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed flex-1">{feature.text}</span>
                    {feature.hasInfo && <Info className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Banner */}
        {footerTitle && (
          <Card className="mt-8 p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-heading font-bold mb-1">{footerTitle}</h3>
              {footerDescription && <p className="text-muted-foreground text-sm">{footerDescription}</p>}
            </div>
            {footerButtonText && (
              <a
                href={footerButtonHref || "#cta"}
                className="inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-medium border border-charcoal/10 bg-transparent hover:bg-warm text-charcoal transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                {footerButtonText}
              </a>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
