import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import Icon from "@/components/Icon";
import PricingCard from "@/components/PricingCard";
import FAQAccordion from "@/components/FAQAccordion";
import SectionHeading from "@/components/SectionHeading";
import RevealOnScroll from "@/components/RevealOnScroll";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.tagline,
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line">
        <div className="container-page grid items-center gap-14 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <RevealOnScroll>
            <Link href="/services" className="font-mono text-xs uppercase tracking-wide text-muted hover:text-gold">
              ← All Services
            </Link>
            <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
              <Icon name={service.icon} className="h-6 w-6" />
            </div>
            <h1 className="section-heading mt-6 md:text-5xl">{service.name}</h1>
            <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-muted">
              {service.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/order?service=${service.slug}`} className="btn-primary">
                Order Now
              </Link>
              <Link href="/pricing" className="btn-secondary">
                Compare All Pricing
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="glass-card p-7">
              <p className="eyebrow">At a Glance</p>
              <dl className="mt-5 space-y-4 font-body text-sm">
                <div className="flex justify-between border-b border-line pb-3">
                  <dt className="text-muted">Starting price (PKR)</dt>
                  <dd className="text-paper">PKR {service.startingPkr}</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <dt className="text-muted">Starting price (USD)</dt>
                  <dd className="text-paper">${service.startingUsd}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Typical delivery</dt>
                  <dd className="text-paper">{service.deliveryEstimate}</dd>
                </div>
              </dl>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* INTRO */}
      <section className="container-page py-20">
        <RevealOnScroll>
          <SectionHeading eyebrow="Overview" title={`What ${service.shortName} means at Asiya AI Studio`} />
          <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-muted">
            {service.intro}
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <RevealOnScroll>
            <h3 className="font-display text-xl text-paper">Who this is for</h3>
            <ul className="mt-5 space-y-3">
              {service.whoFor.map((w) => (
                <li key={w} className="flex items-start gap-3 font-body text-sm text-muted">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {w}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h3 className="font-display text-xl text-paper">Benefits</h3>
            <ul className="mt-5 space-y-3">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 font-body text-sm text-muted">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {b}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="border-y border-line bg-ink-elevated">
        <div className="container-page py-20">
          <RevealOnScroll>
            <SectionHeading eyebrow="What's Included" title="Every order includes" />
          </RevealOnScroll>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {service.whatsIncluded.map((w, i) => (
              <RevealOnScroll key={w} delay={i * 0.05} className="glass-card flex items-start gap-4 p-5">
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-body text-sm text-paper/90">{w}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="container-page py-20">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Packages"
            title="Choose your package"
            description="All prices are shown in PKR for Pakistan-based clients and USD for international clients."
          />
        </RevealOnScroll>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {service.packages.map((tier, i) => (
            <RevealOnScroll key={tier.name} delay={i * 0.06}>
              <PricingCard tier={tier} serviceSlug={service.slug} featured={i === 1} />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-line bg-ink-elevated">
        <div className="container-page py-20">
          <RevealOnScroll>
            <SectionHeading eyebrow="Our Process" title={`How a ${service.shortName.toLowerCase()} project runs`} />
          </RevealOnScroll>
          <ol className="mt-10 space-y-6">
            {service.process.map((p, i) => (
              <RevealOnScroll key={p} delay={i * 0.05} className="flex gap-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 font-mono text-xs text-gold">
                  {i + 1}
                </span>
                <p className="font-body text-sm leading-relaxed text-muted">{p}</p>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>

      {/* SAMPLE WORK */}
      <section className="container-page py-20">
        <RevealOnScroll>
          <SectionHeading eyebrow="Example Work" title="What a finished project looks like" />
          <div className="glass-card mt-8 max-w-3xl p-7">
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-gold">
              Sample / Demo Project
            </span>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              {service.sampleWork}
            </p>
            <Link href="/portfolio" className="mt-5 inline-block font-body text-sm text-gold hover:underline">
              View more in our Portfolio →
            </Link>
          </div>
        </RevealOnScroll>
      </section>

      {/* SERVICE FAQ */}
      <section className="border-t border-line bg-ink-elevated">
        <div className="container-page py-20">
          <RevealOnScroll>
            <SectionHeading eyebrow="FAQ" title={`Questions about ${service.shortName}`} />
          </RevealOnScroll>
          <div className="mt-10 max-w-2xl">
            <FAQAccordion items={service.faqs} />
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="container-page py-20">
        <RevealOnScroll>
          <SectionHeading eyebrow="Explore More" title="Other services you might need" />
        </RevealOnScroll>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {otherServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="glass-card glass-card-hover flex items-center justify-between p-5"
            >
              <span className="font-body text-sm text-paper">{s.shortName}</span>
              <Icon name="arrow" className="h-4 w-4 text-gold" />
            </Link>
          ))}
        </div>
      </section>

      <CTASection
        title={`Ready to start your ${service.shortName.toLowerCase()} project?`}
        primaryLabel="Order Now"
        primaryHref={`/order?service=${service.slug}`}
      />
    </>
  );
}
