"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { captureUtm, trackEvent } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    captureUtm();
  }, []);

  useEffect(() => {
    trackEvent("page_view", { path: pathname });
  }, [pathname]);

  // REQUIRES EXTERNAL CONFIGURATION: only loads if NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
  // Without it, this component renders nothing extra — no external requests are made.
  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
