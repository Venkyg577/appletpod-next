"use client";

import { useState } from "react";
import { MoveRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";

const categoryColors: Record<string, { bg: string; text: string }> = {
  Mathematics: { bg: "bg-blue-50", text: "text-blue-700" },
  Physics: { bg: "bg-purple-50", text: "text-purple-700" },
  Chemistry: { bg: "bg-green-50", text: "text-green-700" },
  Biology: { bg: "bg-emerald-50", text: "text-emerald-700" },
  English: { bg: "bg-amber-50", text: "text-amber-700" },
};

function getCategoryStyle(category: string) {
  return categoryColors[category] ?? { bg: "bg-warm", text: "text-charcoal/60" };
}

export interface WorkApplet {
  slug: string;
  title: string;
  description: string;
  category: string;
  grade: string;
  demoUrl: string;
  thumbnail: string | null;
}

// A static thumbnail by default; on hover it swaps in a live, non-interactive
// preview of the actual running applet — so the card shows "what it's doing
// right now" without leaving the grid. Falls back to a plain gradient block
// (no image, no iframe) for entries that don't have a thumbnail yet, so the
// other applets in the registry don't break while their thumbnails are added
// over time.
export function AppletCard({ applet }: { applet: WorkApplet }) {
  const [hovering, setHovering] = useState(false);
  const cat = getCategoryStyle(applet.category);
  const demoSrc = `https://demos.appletpod.com${applet.demoUrl}`;
  // registry.json's thumbnail is root-relative ("/thumbs/x.png"), which
  // resolves against appletpod.com — the file actually lives on the gallery's
  // own domain, so it needs the same host prefix as the demo iframe does.
  const thumbSrc = applet.thumbnail ? `https://demos.appletpod.com${applet.thumbnail}` : null;

  return (
    <div
      className="group flex flex-col rounded-2xl border border-warm-dark bg-white overflow-hidden hover:shadow-[0_4px_24px_rgba(26,26,46,0.08)] hover:border-warm-dark/80 transition-all duration-200"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Preview */}
      <div className="relative w-full bg-warm" style={{ paddingBottom: "56.25%" }}>
        {thumbSrc ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- external asset on demos.appletpod.com, not worth configuring next/image remotePatterns for a card thumbnail */}
            <img
              src={thumbSrc}
              alt={applet.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                hovering ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
            />
            {/* Only mount the iframe once hovered — avoids loading N live
                applets on page load for a grid of cards. */}
            {hovering && (
              <iframe
                src={demoSrc}
                title={applet.title}
                tabIndex={-1}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full border-0 pointer-events-none"
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-warm to-warm-dark/40" />
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md ${cat.bg} ${cat.text}`}
          >
            {applet.category}
          </span>
          <span className="text-xs font-medium text-charcoal/40 bg-warm px-2.5 py-1 rounded-md">
            {applet.grade}
          </span>
        </div>

        <h2 className="font-heading text-lg font-semibold text-charcoal mb-2 leading-snug">
          {applet.title}
        </h2>

        <p className="text-sm text-charcoal/60 leading-relaxed flex-1">
          {applet.description}
        </p>
      </div>

      {/* Footer link */}
      <div className="px-6 pb-5">
        <TrackedLink
          href={`/work/${applet.slug}`}
          eventName="applet_start"
          eventParams={{
            applet_slug: applet.slug,
            source: "work_grid",
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-200"
        >
          View applet
          <MoveRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </TrackedLink>
      </div>
    </div>
  );
}
