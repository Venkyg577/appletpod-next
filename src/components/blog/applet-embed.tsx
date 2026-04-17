'use client';

import { Maximize2 } from 'lucide-react';
import { TrackedLink } from '@/components/analytics/tracked-link';

interface AppletEmbedProps {
  slug: string;
  title: string;
  demoUrl: string;
}

export function AppletEmbed({ slug, title, demoUrl }: AppletEmbedProps) {
  return (
    <div className="my-12">
      <div className="group/iframe rounded-2xl border border-warm-dark overflow-hidden shadow-[0_4px_24px_rgba(26,26,46,0.06)] relative">
        <TrackedLink
          href={`https://demos.appletpod.com${demoUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          eventName="applet_start"
          eventParams={{
            applet_slug: slug,
            source: "blog_embed",
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-white/70 backdrop-blur-sm border border-warm-dark/40 text-charcoal/50 hover:text-charcoal hover:bg-white transition-all duration-200 opacity-0 group-hover/iframe:opacity-100"
          title="Open in fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </TrackedLink>
        <div className="relative w-full" style={{ paddingBottom: "62.5%" }}>
          <iframe
            src={`https://demos.appletpod.com${demoUrl}`}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="fullscreen"
          />
        </div>
      </div>
      <p className="text-sm text-charcoal/50 text-center mt-2">Try the interactive applet above</p>
    </div>
  );
}
