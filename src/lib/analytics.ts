"use client";

export type AnalyticsEventName =
  | "cta_click"
  | "applet_start"
  | "applet_complete"
  | "applet_retry"
  | "lead_submit";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsParams = {}
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
