"use client";

import { useState } from "react";
import { MoveRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function StudioFinalCta() {
  const [task, setTask] = useState("");

  const mailto = `mailto:venkatesh@appletpod.com?subject=${encodeURIComponent(
    "One task my team still does by hand"
  )}&body=${encodeURIComponent(task)}`;

  return (
    <section id="call" className="py-16 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
          Bring one task.
        </h2>
        <p className="mt-5 text-lg text-charcoal/65 leading-relaxed">
          Thirty minutes. Tell me the task your team still does by hand. By the
          end of the call you will know which of the three it is, what it
          takes, and what it costs. If you don&apos;t need me, I will tell you.
        </p>

        <label htmlFor="one-task" className="sr-only">
          The one task your team still does by hand
        </label>
        <textarea
          id="one-task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          rows={3}
          placeholder="The one task your team still does by hand"
          className="mt-8 w-full rounded-lg border border-warm-dark bg-white p-4 text-base text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://cal.com/venkatesh.g/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("cta_click", {
                cta_type: "book_call",
                source: "studio_final_cta",
              })
            }
            className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg bg-accent text-white hover:bg-accent-hover cursor-pointer shadow-lg shadow-accent/25 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Book the call <MoveRight className="w-4 h-4" />
          </a>
          <a
            href={mailto}
            onClick={() =>
              trackEvent("cta_click", {
                cta_type: "email_task",
                source: "studio_final_cta",
              })
            }
            className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-medium rounded-lg border border-border bg-background hover:bg-muted cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Email it instead
          </a>
        </div>

        <p className="mt-6 text-sm text-charcoal/50">
          Or write to venkatesh@appletpod.com
        </p>
      </div>
    </section>
  );
}
