import Image from "next/image";
import { Linkedin, MoveRight } from "lucide-react";

const timeline = [
  {
    when: "2013 to 2023.",
    what: "BYJU'S. Principal Director, PMO and Head of Studio. Ran a content studio of about two hundred people.",
  },
  {
    when: "2023.",
    what: "Left to build learning content with AI. Founded AppletPod (VAMIX Technologies, Bengaluru).",
  },
  {
    when: "2025 to now.",
    what: "Applets and flipbooks for publishers and EdTech teams. Then the agents, for founders who saw what the content pipeline could do.",
  },
];

export function StudioAbout() {
  return (
    <section className="bg-warm py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
          Who you work with.
        </h2>

        <div className="mt-10 flex flex-col sm:flex-row gap-8 items-start">
          <Image
            src="/venky.jpg"
            alt="Venkatesh G"
            width={112}
            height={112}
            className="rounded-2xl object-cover shrink-0"
          />
          <div className="flex-1">
            <p className="font-heading text-xl font-bold text-charcoal">
              Venkatesh G (Venky)
            </p>
            <dl className="mt-6 space-y-5">
              {timeline.map((t) => (
                <div key={t.when}>
                  <dt className="font-heading text-sm font-semibold text-accent">
                    {t.when}
                  </dt>
                  <dd className="mt-1 text-charcoal/75 leading-relaxed">
                    {t.what}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href="https://www.linkedin.com/in/venkatesh-golisetti/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-charcoal/60 hover:text-charcoal transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-warm-dark bg-white p-7">
          <p className="font-heading text-lg font-bold text-charcoal">
            Built with thelaunch.space.
          </p>
          <p className="mt-2 text-charcoal/70 leading-relaxed">
            AppletPod partners with thelaunch.space. When a job needs two
            builders, we take it together. Same method, same standard.
          </p>
          <a
            href="https://thelaunch.space"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-hover transition-colors duration-200"
          >
            thelaunch.space <MoveRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
