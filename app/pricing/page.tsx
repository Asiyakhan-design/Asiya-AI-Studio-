import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data";
import PricingCard from "@/components/PricingCard";
import SectionHeading from "@/components/SectionHeading";
import RevealOnScroll from "@/components/RevealOnScroll";
import CTASection from "@/components/CTASection";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "AI Service Packages & Pricing",
  description:
    "Transparent Starter, Standard and Premium pricing for every Asiya AI Studio service, shown in PKR and USD.",
};

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-20 md:py-28">
          <RevealOnScroll>
            <p className="eyebrow">Pricing</p>
            <h1 className="section-heading mt-3 max-w-2xl md:text-5xl">
              Clear packages. No hidden pricing.
            </h1>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-muted">
              Every service has three fixed tiers — Starter, Standard and
              Premium. Prices are shown in PKR for Pakistan-based clients and
              USD for international clients.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {services.map((service, si) => (
        <section
          key={service.slug}
          className={`container-page py-16 ${si !== services.length - 1 ? "border-b border-line" : ""}`}
        >
          <RevealOnScroll className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Icon name={service.icon} className="h-4 w-4" />
                </div>
                <h2 className="font-display text-2xl text-paper">{service.name}</h2>
              </div>
              <p className="mt-2 max-w-lg font-body text-sm text-muted">{service.tagline}</p>
            </div>
            <Link
              href={`/services/${service.slug}`}
              className="font-body text-sm text-gold hover:underline"
            >
              Full service details →
            </Link>
          </RevealOnScroll>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {service.packages.map((tier, i) => (
              <RevealOnScroll key={tier.name} delay={i * 0.05}>
                <PricingCard tier={tier} serviceSlug={service.slug} featured={i === 1} />
              </RevealOnScroll>
            ))}
          </div>
        </section>
      ))}

      {/* CUSTOM PROJECT */}
      <section className="border-t border-line bg-ink-elevated">
        <div className="container-page py-20 text-center">
          <RevealOnScroll>
            <p className="eyebrow justify-center">Something Different?</p>
            <h2 className="section-heading mx-auto mt-3 max-w-xl">
              Need a custom project outside these packages?
            </h2>
            <p className="mx-auto mt-4 max-w-md font-body text-sm text-muted">
              Combine services, request a larger scope, or describe something
              unique — we'll review it and send back a tailored quote.
            </p>
            <Link href="/order" className="btn-primary mt-8 inline-flex">
              Request a Custom Quote
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      <CTASection />
    </>
  );
}
