"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-3">
      <div
        className={`max-w-5xl mx-auto h-14 flex items-center justify-between px-5 md:px-6 rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-warm-dark/50 shadow-[0_2px_20px_rgba(26,26,46,0.08)]"
            : "bg-white/80 backdrop-blur-sm border-warm-dark/30"
        }`}
      >
        <a
          href={isHome ? "#" : "/"}
          className="flex items-center gap-2 font-wordmark text-xl font-bold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
        >
          <Image src="/logo.png" alt="AppletPod" width={26} height={26} priority />
          AppletPod
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-base font-medium text-charcoal/60">
          {navLinks.map((link) => {
            const href = link.href.startsWith("/")
              ? link.href
              : isHome
                ? link.href
                : `/${link.href}`;
            return (
              <a
                key={link.href}
                href={href}
                className="hover:text-charcoal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1"
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="https://cal.com/venkatesh.g/30min"
            className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-accent text-white text-base font-medium hover:bg-accent-hover cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden max-w-5xl mx-auto overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 mt-2" : "max-h-0"
        }`}
      >
        <nav className="bg-white/95 backdrop-blur-md rounded-2xl border border-warm-dark/40 shadow-[0_4px_24px_rgba(26,26,46,0.08)]">
          <div className="flex flex-col items-center gap-1 py-4 px-4">
            {navLinks.map((link) => {
              const href = link.href.startsWith("/")
                ? link.href
                : isHome
                  ? link.href
                  : `/${link.href}`;
              return (
                <a
                  key={link.href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 text-charcoal/70 hover:text-charcoal text-base font-medium transition-colors rounded-lg cursor-pointer"
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="https://cal.com/venkatesh.g/30min"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors cursor-pointer mt-1"
            >
              Book a Call
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
