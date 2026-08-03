import { readFileSync } from "fs";
import { join } from "path";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { AppletCard, type WorkApplet } from "@/components/work/applet-card";

export const dynamic = "force-dynamic";

function isVisibleApplet(status: string) {
  return status === "published" || status === "live";
}

export const metadata = {
  title: "Our Work — AppletPod",
  description:
    "Interactive learning applets built by AppletPod. Explore our portfolio of hands-on, curriculum-aligned educational tools.",
  openGraph: {
    title: "Our Work — AppletPod",
    description:
      "Interactive learning applets built by AppletPod. Explore our portfolio.",
    url: "https://appletpod.com/work",
    siteName: "AppletPod",
    type: "website",
  },
  alternates: {
    canonical: "https://appletpod.com/work",
  },
};

export default function WorkPage() {
  const registry = JSON.parse(
    readFileSync(join(process.cwd(), "public/content/applets/registry.json"), "utf-8")
  );
  console.log('[WorkPage] Registry entries:', registry.length, registry.map((a: { slug: string }) => a.slug));
  const published = registry.filter((a: { status: string }) =>
    isVisibleApplet(a.status)
  );

  return (
    <main className="pt-28 pb-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-lg bg-accent-light text-accent px-3 py-1.5 text-sm font-medium mb-4">
            Portfolio
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-4">
            Our Work
          </h1>
          <p className="text-lg text-charcoal/60 max-w-xl mx-auto">
            Interactive applets that make learning click.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {published.map((applet: WorkApplet) => (
            <AppletCard key={applet.slug} applet={applet} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center rounded-2xl bg-warm border border-warm-dark p-10">
          <p className="font-heading text-xl font-semibold text-charcoal mb-2">
            Want an applet built for your content?
          </p>
          <p className="text-charcoal/60 mb-6">
            We&apos;ll design, storyboard, and build it — ready to embed anywhere.
          </p>
          <TrackedLink
            href="/free-applet"
            eventName="cta_click"
            eventParams={{
              cta_type: "free_applet",
              source: "work_bottom_cta",
            }}
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors duration-200"
          >
            Request a free applet
          </TrackedLink>
        </div>
      </div>
    </main>
  );
}
