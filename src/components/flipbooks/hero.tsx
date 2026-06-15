"use client";

import { useRef, useState } from "react";
import { MoveRight, BookOpen, Volume2, VolumeX } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function FlipbooksHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Plays muted by default (autoplay always works muted). Sound only starts
  // when the visitor unmutes with the button.
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
    trackEvent("video_sound_toggle", {
      muted: next,
      source: "flipbooks_hero",
    });
  };

  return (
    <section className="px-4 md:px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT: square (1:1) launch video */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-warm shadow-[0_8px_40px_rgba(26,26,46,0.12)]">
            <video
              ref={videoRef}
              src="/flipbooks-launch-v2.mp4"
              poster="/flipbooks-hero-poster.png"
              muted={muted}
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              aria-label="A static textbook page becomes an interactive page that talks back"
            />
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Turn sound on" : "Mute video"}
              aria-pressed={!muted}
              className="absolute bottom-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm border border-white/60 text-charcoal/70 hover:text-charcoal hover:bg-white shadow-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {muted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
          <a
            href="https://demos.appletpod.com/cbse-surface-area/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("demo_click", { source: "flipbooks_hero" })
            }
            className="mt-4 inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-hover transition-colors duration-200 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" /> Open a live demo Flipbook
            <MoveRight className="w-4 h-4" />
          </a>
        </div>

        {/* RIGHT: copy */}
        <div>
          <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-4">
            Flipbooks by AppletPod
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.08] text-charcoal">
            Reading creates the illusion of learning.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-charcoal/60 leading-relaxed font-light">
            A textbook explains the concept. The student still gets it wrong in
            the exam. Flipbooks take the book you already have and add an
            interactive layer — an{" "}
            <a
              href="https://demos.appletpod.com/comparing-fractions/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold underline underline-offset-2 hover:text-accent-hover transition-colors duration-200"
            >
              applet
            </a>{" "}
            on the pages that need it, so the same page now talks back, checks
            understanding, and makes students practice. Built with AI, reviewed
            by an instructional designer, your first live page back in 24 hours.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://cal.com/venkatesh.g/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_type: "book_call",
                  source: "flipbooks_hero",
                })
              }
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg bg-accent text-white hover:bg-accent-hover cursor-pointer shadow-lg shadow-accent/25 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Book a Call <MoveRight className="w-4 h-4" />
            </a>
            <a
              href="/free-applet"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_type: "send_chapter",
                  source: "flipbooks_hero",
                })
              }
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg border border-border bg-background hover:bg-muted cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Or send us one chapter
            </a>
          </div>

          <p className="mt-7 text-sm text-charcoal/40 font-medium tracking-wide">
            100+ interactive modules shipped &middot; Built by a 10-year
            BYJU&apos;S veteran who ran a 300-person studio.
          </p>
        </div>
      </div>
    </section>
  );
}
