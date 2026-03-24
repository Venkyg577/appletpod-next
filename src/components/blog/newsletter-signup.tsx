"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email service (ConvertKit, Buttondown, etc.)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
        <p className="font-heading text-lg font-semibold text-charcoal mb-1">
          You&apos;re in.
        </p>
        <p className="text-charcoal/55 text-sm">
          New posts land in your inbox. No spam, unsubscribe anytime.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-warm-dark/60 bg-warm p-6 md:p-8">
      <h3 className="font-heading text-base md:text-lg font-semibold text-charcoal mb-1.5">
        Get new posts by email
      </h3>
      <p className="text-charcoal/55 text-[13px] mb-5 leading-relaxed">
        Practitioner insights on interactive learning, AI in education, and building EdTech products. No fluff.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="flex-1 h-10 px-4 rounded-lg border border-warm-dark bg-white text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-accent text-white text-[13px] font-medium hover:bg-accent-hover transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          Subscribe
        </button>
      </form>
    </div>
  );
}
