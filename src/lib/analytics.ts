"use client";

export type AnalyticsEventName =
  | "cta_click"
  | "applet_start"
  | "applet_complete"
  | "applet_retry"
  | "lead_submit";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;
const GA_MEASUREMENT_ID = "G-JCFPPPL4S4";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsParams = {}
) {
  if (typeof window === "undefined") return;

  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, cleanedParams);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", eventName, cleanedParams]);
  }

  if (window.location.search.includes("ga_debug=1")) {
    console.info("[GA] event sent", eventName, cleanedParams);
  }
}
