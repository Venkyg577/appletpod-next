"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Calculator } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

interface Applet {
  slug: string;
  title: string;
  description: string;
  demoUrl: string;
}

const tabConfig = [
  { id: "circuits", slug: "parallel-series-circuits", icon: Zap },
  { id: "decimals", slug: "comparing-decimals", icon: Calculator },
];

async function loadRegistry(): Promise<Applet[]> {
  const response = await fetch("/content/applets/registry.json");
  if (!response.ok) {
    throw new Error(`Failed to load registry: ${response.status}`);
  }
  return response.json();
}

function buildTabs(applets: Applet[]) {
  const registry = applets.reduce(
    (acc, applet) => {
      acc[applet.slug] = applet;
      return acc;
    },
    {} as Record<string, Applet>
  );

  return tabConfig
    .map(({ id, slug, icon }) => {
      const applet = registry[slug];
      if (!applet) return null;
      return {
        id,
        label: applet.title.split("&")[0].trim(),
        title: applet.title,
        desc: applet.description,
        icon,
        src: "/demos" + (applet.demoUrl.endsWith("/") ? applet.demoUrl + "index.html" : applet.demoUrl),
      };
    })
    .filter(Boolean) as Array<{
      id: string;
      label: string;
      title: string;
      desc: string;
      icon: typeof Zap;
      src: string;
    }>;
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;
          if (prefersReducedMotion) {
            setCount(target);
          } else {
            requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <p ref={ref} className="font-heading text-4xl md:text-5xl font-extrabold text-accent tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </p>
  );
}

function TabbedDemos() {
  const [activeTab, setActiveTab] = useState("circuits");
  const [visible, setVisible] = useState(false);
  const [tabs, setTabs] = useState<Array<{ id: string; label: string; title: string; desc: string; icon: typeof Zap; src: string }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadRegistry().then(buildTabs).then(setTabs).catch(console.error);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full flex flex-col bg-gray-100 dark:bg-zinc-900">
      {/* Tab bar — flush with container, no separate bg */}
      <div className="flex items-center gap-1 border-b border-black/5 px-3 md:px-4 pt-2 shrink-0" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2.5 text-xs font-semibold font-heading transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-t-md ${
              activeTab === tab.id ? "text-accent" : "text-charcoal/35 hover:text-charcoal/60"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="proofTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab panels — iframe loads only after section is visible */}
      <div className="flex-1 relative">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            className={`absolute inset-0 flex flex-col ${
              activeTab === tab.id ? "flex" : "hidden"
            }`}
          >
            <div className="flex-1 relative">
              {visible && activeTab === tab.id && (
                <iframe
                  className="w-full h-full absolute inset-0"
                  src={tab.src}
                  title={tab.title}
                  loading="lazy"
                  style={{ border: "none" }}
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </div>
            {/* Info bar */}
            <div className="px-3 md:px-4 py-2.5 border-t border-black/5 shrink-0 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="font-heading font-bold text-charcoal/70 text-sm">{tab.title}</p>
                <span className="inline-flex items-center gap-1 text-[0.625rem] font-semibold tracking-[0.05em] uppercase px-1.5 py-0.5 rounded bg-emerald-100/60 text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-xs text-charcoal/35 hidden sm:block">{tab.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Proof() {
  return (
    <section id="proof" className="px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <ContainerScroll
          titleComponent={
            <div className="mb-8">
              <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
                Proof
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal">
                Don&apos;t take our word for it. Try it.
              </h2>
              <p className="mt-4 text-charcoal/45 text-sm max-w-lg mx-auto">
                Not a demo. These are real applets built from static curriculum documents. Each took under 24 hours.
              </p>
            </div>
          }
        >
          <TabbedDemos />
        </ContainerScroll>

        {/* Stats — well below the scroll container */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center -mt-44 md:-mt-64 pt-8 pb-16 md:pb-24 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <AnimatedCounter target={100} suffix="+" />
            <p className="mt-3 text-sm text-charcoal/50 font-medium">Interactive applets shipped</p>
          </div>
          <div className="p-6 border-y sm:border-y-0 sm:border-x border-warm-dark">
            <AnimatedCounter target={10} suffix=" yrs" />
            <p className="mt-3 text-sm text-charcoal/50 font-medium">At BYJU&apos;S — led studio ops for 300+ people</p>
          </div>
          <div className="p-6">
            <AnimatedCounter target={716} suffix=" hrs" />
            <p className="mt-3 text-sm text-charcoal/50 font-medium leading-snug">
              Industry standard per hour of content. We deliver in a fraction.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
