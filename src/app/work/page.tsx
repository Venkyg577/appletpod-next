import { MoveRight } from "lucide-react";
import registry from "../../../content/applets/registry.json";
import { TrackedLink } from "@/components/analytics/tracked-link";

const categoryColors: Record<string, { bg: string; text: string }> = {
  Mathematics: { bg: "bg-blue-50", text: "text-blue-700" },
  Physics: { bg: "bg-purple-50", text: "text-purple-700" },
  Chemistry: { bg: "bg-green-50", text: "text-green-700" },
  Biology: { bg: "bg-emerald-50", text: "text-emerald-700" },
};

function getCategoryStyle(category: string) {
  return categoryColors[category] ?? { bg: "bg-warm", text: "text-charcoal/60" };
}

export const metadata = {
  title: "Our Work — AppletPod",
  description:
    "Interactive learning applets built by AppletPod. Explore our portfolio of hands-on, curriculum-aligned educational tools.",
};

export default function WorkPage() {
  const published = registry.filter((a) => a.status === "published");

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
          {published.map((applet) => {
            const cat = getCategoryStyle(applet.category);
            return (
              <div
                key={applet.slug}
                className="group flex flex-col rounded-2xl border border-warm-dark bg-white overflow-hidden hover:shadow-[0_4px_24px_rgba(26,26,46,0.08)] hover:border-warm-dark/80 transition-all duration-200"
              >
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
          })}
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
