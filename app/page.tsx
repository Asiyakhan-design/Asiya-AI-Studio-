import Link from "next/link";
import { services, processSteps, portfolioItems, faqs, brand } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";
import PortfolioCard from "@/components/PortfolioCard";
import PricingCard from "@/components/PricingCard";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import RevealOnScroll from "@/components/RevealOnScroll";
import FAQAccordion from "@/components/FAQAccordion";
import Icon from "@/components/Icon";
import HeroVisual from "@/components/HeroVisual";
import { WhatsAppButton } from "@/components/ContactButtons";

export default function HomePage() {
  const featuredServices = services.slice(0, 6);
  const featuredPortfolio = portfolioItems.slice(0, 3);
  const popularPackages = [
    { service: services[3], tier: services[3].packages[1] }, // social media / standard
    { service: services[4], tier: services[4].packages[1] }, // presentations / standard
    { service: services[0], tier: services[0].packages[1] }, // content / standard
  ];
  const previewFaqs = faqs.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="container-page grid items-center gap-16 py-24 md:grid-cols-2 md:py-32">
          <div>
            <RevealOnScroll>
              <p className="eyebrow">Asiya AI Studio</p>
              <h1 className="mt-4 font-display text-4xl leading-[1.08] text-paper md:text-[3.4rem]">
                Turn Your Ideas Into{" "}
                <span className="italic text-gold">Professional</span> Digital
                Work With AI.
              </h1>
              <p className="mt-6 max-w-md font-body text-base leading-relaxed text-muted">
                {brand.subtext}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/services" className="btn-primary">
                  Explore Our Services
                </Link>
                <Link href="/order" className="btn-secondary">
                  Start Your Project
                </Link>
                <WhatsAppButton
                  variant="outline"
                  message="Hi Asiya AI Studio, I would like to know more about your AI services."
                  context="home_hero"
                />
              </div>
              <div className="mt-10 flex items-center gap-6 font-mono text-xs text-muted">
                <span>7 core AI services</span>
                <span className="h-1 w-1 rounded-full bg-gold" />
                <span>PKR &amp; USD pricing</span>
                <span className="h-1 w-1 rounded-full bg-gold" />
                <span>2–12 day delivery</span>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.15}>
            <HeroVisual />
          </RevealOnScroll>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="container-page py-24">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="What We Do"
            title="Seven AI-powered services, one studio."
            description="From the first word on your homepage to an automated customer chat, every service is built to be ordered, tracked and delivered without friction."
          />
        </RevealOnScroll>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s, i) => (
            <RevealOnScroll key={s.slug} delay={i * 0.05}>
              <ServiceCard service={s} index={i} />
            </RevealOnScroll>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-secondary">
            View All Services
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="border-y border-line bg-ink-elevated">
        <div className="container-page py-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Why Choose Asiya AI Studio"
              title="Fast like AI. Considered like a studio."
            />
          </RevealOnScroll>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              {
                icon: "spark",
                title: "AI + Human Review",
                text: "Every deliverable is drafted with AI and refined by hand before it reaches you.",
              },
              {
                icon: "check",
                title: "Clear Packages",
                text: "Fixed Starter, Standard and Premium tiers — no guessing what you'll pay.",
              },
              {
                icon: "arrow",
                title: "Fast Turnaround",
                text: "Most projects delivered within 2–8 days, without cutting corners.",
              },
              {
                icon: "bot",
                title: "Built to Scale With You",
                text: "Start with one project, come back for ongoing content, automation or campaigns.",
              },
            ].map((item, i) => (
              <RevealOnScroll key={item.title} delay={i * 0.06}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg text-paper">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="container-page py-24">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="The Process"
            title="From idea to delivery in a few clear steps."
            description="A simple, transparent workflow — you always know what happens next."
          />
        </RevealOnScroll>
        <div className="relative mt-14 grid gap-10 md:grid-cols-4">
          <div className="node-line absolute left-0 right-0 top-[22px] hidden h-px md:block" />
          {processSteps.slice(0, 4).map((step, i) => (
            <RevealOnScroll key={step.step} delay={i * 0.08} className="relative">
              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ink font-mono text-sm text-gold">
                {step.step}
              </span>
              <h3 className="mt-5 font-display text-lg text-paper">{step.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </RevealOnScroll>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/how-it-works" className="btn-secondary">
            See the Full Process
          </Link>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="border-y border-line bg-ink-elevated">
        <div className="container-page py-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Featured Work"
              title="Sample projects across our core services."
              description="Real client work is added as it's completed. Until then, these labeled sample projects show what a finished deliverable looks like."
            />
          </RevealOnScroll>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredPortfolio.map((item, i) => (
              <RevealOnScroll key={item.slug} delay={i * 0.06}>
                <PortfolioCard item={item} />
              </RevealOnScroll>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/portfolio" className="btn-secondary">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR PACKAGES */}
      <section className="container-page py-24">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Popular Packages"
            title="Our most-requested starting points."
            description="Every service has three tiers. These are the ones clients choose most often."
          />
        </RevealOnScroll>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {popularPackages.map(({ service, tier }, i) => (
            <RevealOnScroll key={service.slug} delay={i * 0.06}>
              <PricingCard tier={tier} serviceSlug={service.slug} featured={i === 1} />
            </RevealOnScroll>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/pricing" className="btn-secondary">
            See Full Pricing
          </Link>
        </div>
      </section>

      {/* AI SOLUTIONS PREVIEW */}
      <section className="border-y border-line bg-gold-glow">
        <div className="container-page grid items-center gap-12 py-24 md:grid-cols-2">
          <RevealOnScroll>
            <p className="eyebrow">AI Solutions</p>
            <h2 className="section-heading mt-3">
              Beyond content — automation that saves you hours.
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-muted">
              Our AI Chatbot &amp; Automation service sets up a trained chatbot
              on your website or WhatsApp, so customer questions get answered
              instantly and leads get captured automatically — no code required
              from you.
            </p>
            <Link href="/services/ai-automation" className="btn-primary mt-8 inline-flex">
              Explore Automation
            </Link>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="glass-card space-y-3 p-6">
              {[
                "Customer: What are your delivery times?",
                "Asiya Assistant: Most projects deliver in 2–8 days depending on the package. Want me to check a specific service?",
              ].map((line, i) => (
                <div
                  key={line}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 font-body text-sm ${
                    i % 2 === 0
                      ? "bg-white/[0.06] text-paper"
                      : "ml-auto bg-gold/15 text-paper"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CLIENT EXPERIENCE */}
      <section className="container-page py-24">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Client Experience"
            title="Built around clarity, not guesswork."
            align="center"
          />
        </RevealOnScroll>
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-3">
          {[
            "Fixed packages so you know the price before you order",
            "Direct WhatsApp/email updates at every key step",
            "Revisions included, within a clear, fair scope",
          ].map((text, i) => (
            <RevealOnScroll key={text} delay={i * 0.06} className="glass-card p-6 text-center">
              <span className="font-mono text-xs text-gold">0{i + 1}</span>
              <p className="mt-3 font-body text-sm leading-relaxed text-paper/90">{text}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="border-t border-line bg-ink-elevated">
        <div className="container-page py-24">
          <RevealOnScroll>
            <SectionHeading eyebrow="Common Questions" title="Before you get started" />
          </RevealOnScroll>
          <div className="mt-10 max-w-2xl">
            <FAQAccordion items={previewFaqs.map(({ q, a }) => ({ q, a }))} />
          </div>
          <div className="mt-8">
            <Link href="/faq" className="btn-secondary">
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
