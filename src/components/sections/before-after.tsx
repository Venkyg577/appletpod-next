"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type PizzaSliceProps = {
  index: number;
  totalSlices: number;
  explode: number;
};

function PizzaSlice({ index, totalSlices, explode }: PizzaSliceProps) {
  const angle = 360 / totalSlices;
  const startAngle = index * angle;
  const endAngle = (index + 1) * angle;
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);
  const midRad = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
  const radius = 78;
  const center = 100;
  const largeArc = angle > 180 ? 1 : 0;

  const x1 = center + radius * Math.cos(startRad);
  const y1 = center + radius * Math.sin(startRad);
  const x2 = center + radius * Math.cos(endRad);
  const y2 = center + radius * Math.sin(endRad);

  const offsetX = Math.cos(midRad) * explode;
  const offsetY = Math.sin(midRad) * explode;

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      <path
        d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
        fill={index % 2 === 0 ? "#FF9C6A" : "#FF7F3F"}
        stroke="#E56529"
        strokeWidth="1.6"
      />
      {[0.22, 0.45, 0.68].map((p) => {
        const pepperoniRad = startRad + (endRad - startRad) * p;
        const pepperoniDistance = 28 + p * 16;
        const cx = center + Math.cos(pepperoniRad) * pepperoniDistance;
        const cy = center + Math.sin(pepperoniRad) * pepperoniDistance;
        return <circle key={`${index}-${p}`} cx={cx} cy={cy} r="3.8" fill="#D4574C" />;
      })}
    </g>
  );
}

// Static Word-style screenshot mock
function BeforePlaceholder() {
  return (
    <div className="w-full aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200">
      <div className="absolute inset-0 flex flex-col">
        <div className="h-7 bg-[#2B579A] flex items-center px-2 gap-2 shrink-0">
          <div className="w-4 h-4 rounded-sm bg-white/90 text-[#2B579A] text-[8px] font-bold grid place-items-center">
            W
          </div>
          <div className="h-2 w-24 rounded bg-white/40" />
          <div className="ml-auto flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
          </div>
        </div>
        <div className="h-6 bg-gray-200 border-y border-gray-300 flex items-center px-2 gap-1.5 text-[8px] text-gray-500">
          <span>File</span>
          <span>Home</span>
          <span>Insert</span>
          <span className="ml-2 px-1 py-0.5 rounded bg-gray-300">Math Worksheet.docx</span>
        </div>
        <div className="flex-1 bg-[#ECECEC] p-2">
          <div className="bg-white h-full rounded-sm border border-gray-300 p-3 flex flex-col gap-2">
            <div className="h-2.5 w-2/3 rounded bg-gray-300" />
            <div className="space-y-1.5">
              {[95, 100, 88, 92, 84, 90].map((w) => (
                <div key={w} className="h-1.5 rounded bg-gray-200" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-5 rounded bg-gray-100 border border-gray-200" />
              ))}
            </div>
            <div className="mt-auto h-5 rounded bg-gray-100 border border-gray-200 px-2 flex items-center text-[8px] text-gray-400">
              Question: What is 3/4 of 12? ______
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated applet preview: slider controls pizza slicing
function AfterPlaceholder() {
  const [progress, setProgress] = useState(0.15);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const loop = (time: number) => {
      const t = (time - start) / 1000;
      const wave = (Math.sin(t * 1.6) + 1) / 2;
      const eased = 0.12 + wave * 0.76;
      setProgress(eased);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const totalSlices = Math.max(2, Math.min(12, Math.round(2 + progress * 10)));
  const explodeAmount = Math.max(0, (totalSlices - 2) * 1.2);

  return (
    <div className="w-full aspect-[16/10] min-h-[230px] sm:min-h-[280px] bg-[#FFF3EB] rounded-lg overflow-hidden relative border border-[#E87B35]/30">
      <div className="absolute inset-0 flex flex-col p-3 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#E87B35]" />
          <div className="h-2 w-24 bg-[#E87B35]/40 rounded" />
          <span className="text-[9px] font-semibold text-[#1A1A2E]/70 ml-auto">Slice Explorer</span>
        </div>

        <div className="flex-1 flex flex-col items-center w-full min-h-0">
          <div className="w-full flex-1 flex flex-col items-center justify-center gap-2 min-h-0">
            <svg viewBox="0 0 200 200" className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-sm shrink-0">
              <circle cx="100" cy="100" r="82" fill="#F5D54D" stroke="#F1C40F" strokeWidth="4" />
              {Array.from({ length: totalSlices }).map((_, i) => (
                <PizzaSlice key={i} index={i} totalSlices={totalSlices} explode={explodeAmount} />
              ))}
              <circle cx="100" cy="100" r="8" fill="#BFA70B" />
            </svg>

            <motion.div
              className="px-3 py-1.5 bg-emerald-500 rounded-full text-[9px] text-white font-semibold shadow shrink-0"
              animate={{ scale: [0.95, 1, 0.95] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {totalSlices} slices made
            </motion.div>
          </div>

          <div className="w-full bg-white rounded-lg p-2 border border-[#E87B35]/20 shadow-sm mt-2 shrink-0">
            <div className="text-[9px] text-[#1A1A2E]/60 mb-1.5">Move slider to cut the pizza</div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-[#E87B35] rounded-full"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#E87B35] rounded-full border-2 border-white shadow"
                style={{ left: `calc(${Math.round(progress * 100)}% - 8px)` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section label */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E87B35]">
            The Transformation
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A2E] font-heading">
            From forgotten to felt.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">

          {/* Before */}
          <motion.div
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl md:rounded-l-2xl md:rounded-r-none p-4 sm:p-6 flex flex-col gap-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-widest text-red-400">
                Before
              </span>
            </div>
            <BeforePlaceholder />
            <ul className="space-y-1.5">
              {["Static slides, zero interaction", "Copy-pasted templates", "Forgotten in 48 hours"].map((t) => (
                <li key={t} className="flex items-start gap-2 text-xs sm:text-sm text-gray-500">
                  <span className="mt-0.5 text-red-400 shrink-0">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Divider */}
          <div className="hidden md:flex flex-col items-center justify-center w-px shrink-0 relative">
            <div className="absolute inset-0 flex flex-col items-center">
              <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gray-300 to-gray-300" />
              <div className="flex-1 w-px bg-gradient-to-b from-gray-300 via-gray-300 to-transparent" />
            </div>
          </div>

          {/* After */}
          <motion.div
            className="flex-1 bg-[#FFF3EB] border border-[#E87B35]/25 rounded-2xl md:rounded-r-2xl md:rounded-l-none p-4 sm:p-6 flex flex-col gap-4"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                After AppletPod
              </span>
            </div>
            <AfterPlaceholder />
            <ul className="space-y-1.5">
              {["Interactive & hands-on", "Built from your content, in 5 days", "Students actually engage"].map((t) => (
                <li key={t} className="flex items-start gap-2 text-xs sm:text-sm text-[#1A1A2E]/80">
                  <span className="mt-0.5 text-emerald-500 shrink-0">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
