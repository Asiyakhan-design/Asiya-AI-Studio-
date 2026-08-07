import type { Metadata } from "next";
import Link from "next/link";
import { services, futureServices } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";
import RevealOnScroll from "@/components/RevealOnScroll";
import CTASection from "@/components/CTASection";
import { WhatsAppButton } from "@/components/ContactButtons";

export const metadata: Metadata = {
  title: "AI Services",
  description:
    "Explore all AI-powered services from Asiya AI Studio — content, images, video, social media, presentations, automation and SEO.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-20 md:py-28">
          <RevealOnScroll>
            <p className="eyebrow">Our Services</p>
            <h1 className="section-heading mt-3 max-w-2xl md:text-5xl">
              Seven AI-powered services built to be ordered with confidence.
            </h1>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-muted">
              Every service below has three fixed packages, a clear delivery
              window and a dedicated page explaining exactly what you get.
              Pick one, or combine a few for a complete launch.
            </p>
            <div className="mt-6">
              <WhatsAppButton
                variant="outline"
                message="Hi Asiya AI Studio, I would like to know more about your AI services."
                context="services_page"
                label="Ask About a Service"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <RevealOnScroll key={s.slug} delay={i * 0.05}>
              <ServiceCard service={s} index={i} />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink-elevated">
        <div className="container-page py-20">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Coming Soon"
              title="Planned for future phases"
              description="These are on our roadmap as the studio grows. Interested in one now? Send us a message and we'll let you know when it's ready."
            />
          </RevealOnScroll>
          <div className="mt-8 flex flex-wrap gap-3">
            {futureServices.map((f) => (
              <span
                key={f}
                className="rounded-full border border-line px-4 py-2 font-body text-sm text-muted"
              >
                {f}
              </span>
            ))}
          </div>
          <Link href="/contact" className="btn-secondary mt-8 inline-flex">
            Ask About a Future Service
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
