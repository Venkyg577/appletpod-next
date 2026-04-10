import { notFound } from "next/navigation";
import { MoveRight, Maximize2 } from "lucide-react";
import registry from "../../../../content/applets/registry.json";

type Applet = (typeof registry)[number];

export function generateStaticParams() {
  return registry
    .filter((a) => a.status === "published")
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const applet = registry.find((a) => a.slug === slug);
  if (!applet) return {};
  return {
    title: `${applet.title} — AppletPod`,
    description: applet.description,
  };
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Mathematics: { bg: "bg-blue-50", text: "text-blue-700" },
  Physics: { bg: "bg-purple-50", text: "text-purple-700" },
  Chemistry: { bg: "bg-green-50", text: "text-green-700" },
  Biology: { bg: "bg-emerald-50", text: "text-emerald-700" },
};

function getCategoryStyle(category: string) {
  return categoryColors[category] ?? { bg: "bg-warm", text: "text-charcoal/60" };
}

export default async function AppletPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const applet: Applet | undefined = registry.find((a) => a.slug === slug);

  if (!applet || applet.status !== "published") notFound();

  const related = registry.filter(
    (a) => a.slug !== slug && a.status === "published"
  );
  const cat = getCategoryStyle(applet.category);

  return (
    <main className="pt-28 pb-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/50">
          <a href="/work" className="hover:text-charcoal transition-colors">
            Our Work
          </a>
          <span>/</span>
          <span className="text-charcoal/80">{applet.title}</span>
        </nav>

        {/* Title area */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-md ${cat.bg} ${cat.text}`}
            >
              {applet.category}
            </span>
            <span className="text-xs font-medium text-charcoal/40 bg-warm px-2.5 py-1 rounded-md">
              {applet.grade}
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
            {applet.title}
          </h1>
          <p className="text-lg text-charcoal/60 max-w-2xl">{applet.description}</p>
        </div>

        {/* Iframe */}
        <div className="group/iframe rounded-2xl border border-warm-dark overflow-hidden shadow-[0_4px_24px_rgba(26,26,46,0.06)] mb-12 relative">
          <a
            href={`https://demos.appletpod.com${applet.demoUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-white/70 backdrop-blur-sm border border-warm-dark/40 text-charcoal/50 hover:text-charcoal hover:bg-white transition-all duration-200 opacity-0 group-hover/iframe:opacity-100"
            title="Open in fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </a>
          <div className="relative w-full" style={{ paddingBottom: "62.5%" }}>
            <iframe
              src={`https://demos.appletpod.com${applet.demoUrl}`}
              title={applet.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="fullscreen"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-charcoal px-8 py-10 text-center mb-16">
          <p className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
            Want one like this?
          </p>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Tell us your topic and grade level — we&apos;ll build you a free applet, no commitment needed.
          </p>
          <a
            href="/free-applet"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors duration-200"
          >
            Request a free applet
            <MoveRight className="w-4 h-4" />
          </a>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-heading text-xl font-semibold text-charcoal mb-6">
              More applets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((rel) => {
                const relCat = getCategoryStyle(rel.category);
                return (
                  <a
                    key={rel.slug}
                    href={`/work/${rel.slug}`}
                    className="group flex flex-col rounded-2xl border border-warm-dark bg-white p-6 hover:shadow-[0_4px_24px_rgba(26,26,46,0.08)] hover:border-warm-dark/80 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md ${relCat.bg} ${relCat.text}`}
                      >
                        {rel.category}
                      </span>
                      <span className="text-xs font-medium text-charcoal/40 bg-warm px-2.5 py-1 rounded-md">
                        {rel.grade}
                      </span>
                    </div>
                    <h3 className="font-heading text-base font-semibold text-charcoal mb-1 leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed mb-4 flex-1">
                      {rel.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:text-accent-hover transition-colors duration-200">
                      View applet
                      <MoveRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
