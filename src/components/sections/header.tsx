"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#how", label: "How it works" },
  { href: "#proof", label: "Demos" },
  { href: "#pricing", label: "Pricing" },
  { href: "#pilot", label: "Get Started" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_12px_rgba(26,26,46,0.06)]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href={isHome ? "#" : "/"}
          className="flex items-center gap-2 font-heading text-xl font-bold text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="12" fill="#E87B35" />
            <circle cx="14" cy="14" r="5" fill="#FFF" />
          </svg>
          AppletPod
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal/60">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              className="hover:text-charcoal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://cal.com/venkatesh.g/30min"
            className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        className={`md:hidden bg-white border-t border-warm-dark overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 py-5 px-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 text-charcoal/70 hover:text-charcoal font-medium transition-colors rounded-lg cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://cal.com/venkatesh.g/30min"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors cursor-pointer mt-1"
          >
            Book a Call
          </a>
        </div>
      </nav>
    </header>
  );
}
