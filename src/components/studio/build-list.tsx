import { MoveRight } from "lucide-react";
import { buildGroups, type BuildStatus } from "./builds";

const statusStyle: Record<BuildStatus, string> = {
  LIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  OWN: "bg-accent-light text-accent border-accent/20",
  CLIENT: "bg-sky-50 text-sky-700 border-sky-200",
  "IN BUILD": "bg-amber-50 text-amber-700 border-amber-200",
  PROTOTYPE: "bg-violet-50 text-violet-700 border-violet-200",
  KILLED: "bg-charcoal/5 text-charcoal/50 border-charcoal/10 line-through",
};

// Running number across all groups: 001, 002, ...
const numbered = buildGroups.map((group, gi) => {
  const offset = buildGroups
    .slice(0, gi)
    .reduce((sum, g) => sum + g.builds.length, 0);
  return {
    ...group,
    builds: group.builds.map((b, i) => ({
      ...b,
      num: String(offset + i + 1).padStart(3, "0"),
    })),
  };
});

export function BuildList() {
  return (
    <section
      id="builds"
      className="bg-warm py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
          What I have built.
        </h2>
        <p className="mt-4 text-lg text-charcoal/60 max-w-2xl">
          Numbered. Client names held back until they say yes. The dead ones
          stay in.
        </p>

        <div className="mt-12 space-y-12">
          {numbered.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-4">
                {group.label} ({group.builds.length})
              </p>
              <ul className="divide-y divide-warm-dark border-y border-warm-dark">
                {group.builds.map((b) => {
                  const external = b.href?.startsWith("http");
                  const title = b.href ? (
                    <a
                      href={b.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex items-center gap-1.5 hover:text-accent transition-colors duration-200"
                    >
                      {b.title} <MoveRight className="w-4 h-4" />
                    </a>
                  ) : (
                    b.title
                  );
                  return (
                    <li
                      key={b.title}
                      className="py-5 grid grid-cols-[3rem_1fr] sm:grid-cols-[3rem_1fr_auto] gap-x-4 gap-y-2 items-baseline"
                    >
                      <span className="font-heading text-sm text-charcoal/40 tabular-nums">
                        {b.num}
                      </span>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-charcoal">
                          {title}
                        </h3>
                        <p className="mt-1 text-charcoal/65 leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                      <span
                        className={`col-start-2 sm:col-start-3 justify-self-start sm:justify-self-end text-[11px] font-semibold tracking-wider px-2 py-1 rounded-md border ${statusStyle[b.status]}`}
                      >
                        {b.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
