"use client";

/**
 * Analytics integration point.
 *
 * ACTIVE (works right now): every call below logs to the browser console so you can see the
 * exact event stream while testing. Nothing is sent to any external service yet.
 *
 * REQUIRES EXTERNAL CONFIGURATION: to send these events to Google Analytics 4, set
 * NEXT_PUBLIC_GA_MEASUREMENT_ID in your environment (see .env.example) and wire the
 * `gtag` call marked below — or swap this file for your analytics provider's SDK.
 *
 * RULE: never pass name, email, WhatsApp number, file contents, or payment details into
 * trackEvent. Only pass non-identifying context (service slug, package tier, page name).
 *
 * Recommended GA4 event mapping (configure as Key Events in GA4 once connected):
 *   project_request_submit -> generate_lead
 *   service_detail_view    -> select_content
 *   project_completed      -> purchase (only fire this server-side once a project is
 *                              actually delivered & paid — never fire it from the client)
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

let utmParams: Record<string, string> = {}; // in-memory only, captured once per session

export function captureUtm() {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach((k) => {
    const v = p.get(k);
    if (v) utmParams[k] = v;
  });
}

export function trackEvent(name: string, data?: Record<string, unknown>) {
  const payload = { ...utmParams, ...(data || {}) };
  if (typeof window !== "undefined" && window.console) {
    console.log("[analytics]", name, payload);
  }
  // REQUIRES EXTERNAL CONFIGURATION — uncomment once NEXT_PUBLIC_GA_MEASUREMENT_ID is set
  // and the GA4 script (components/Analytics.tsx) is loading successfully:
  // if (typeof window !== "undefined" && window.gtag) {
  //   window.gtag("event", name, payload);
  // }
}

// Page-level event names aligned with the funnel in the requirements doc.
export const pageEventNames: Record<string, string> = {
  services: "service_view",
  "service-detail": "service_detail_view",
  pricing: "pricing_view",
  portfolio: "portfolio_view",
  "portfolio-detail": "portfolio_project_open",
  order: "start_project_click",
  contact: "contact_page_view",
};
