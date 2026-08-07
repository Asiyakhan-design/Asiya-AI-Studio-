import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import RevealOnScroll from "@/components/RevealOnScroll";
import CTASection from "@/components/CTASection";
import Icon from "@/components/Icon";
import Logo, { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Asiya AI Studio combines AI speed with human judgment to deliver professional content, visuals and automation for small businesses and creators.",
};

const values = [
  {
    icon: "spark",
    title: "AI does the heavy lifting, not the thinking",
    text: "AI tools speed up research, drafting and production. Every result is still reviewed, edited and finished by hand before it reaches a client.",
  },
  {
    icon: "check",
    title: "Clarity over cleverness",
    text: "Clear pricing, clear packages, clear timelines. No jargon, no vague promises, no fine print designed to confuse.",
  },
  {
    icon: "bot",
    title: "Practical, not experimental",
    text: "Services are chosen because they can realistically be delivered well by one dedicated studio — not because they sound impressive.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page grid items-center gap-14 py-20 md:grid-cols-2 md:py-28">
          <RevealOnScroll>
            <p className="eyebrow">About Asiya AI Studio</p>
            <h1 className="section-heading mt-3 md:text-5xl">
              A studio built around one idea: AI should make good work faster,
              not replace the care behind it.
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="glass-card flex aspect-square items-center justify-center">
              <LogoMark size={96} />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-14 md:grid-cols-2">
          <RevealOnScroll>
            <h2 className="font-display text-2xl text-paper">Who we are</h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              Asiya AI Studio is an independent AI services studio offering
              content, visual, video, presentation and automation work to
              creators, startups and small businesses — in Pakistan and
              internationally.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              We started the studio because most small businesses need
              professional digital work regularly, but can't justify hiring a
              full in-house team for it. AI closes that gap — when it's used
              carefully, not carelessly.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <h2 className="font-display text-2xl text-paper">What problem we solve</h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              Good content and design take time most business owners don't
              have, and traditional agencies are often slow and expensive for
              a single project. We sit in between: faster and more affordable
              than a full agency, more considered and reliable than a raw
              AI-generated result.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              Every service is scoped, packaged and priced clearly upfront,
              so there's no back-and-forth guessing what something will cost
              or how long it will take.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="border-y border-line bg-ink-elevated">
        <div className="container-page py-20">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Brand Identity"
              title="The Asiya AI Studio mark"
              description="A circuit-and-node 'A' rendered in a teal-to-purple gradient — the approved studio mark, shown here in its core forms."
            />
          </RevealOnScroll>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <RevealOnScroll className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-line bg-white/[0.02]">
                <Logo height={30} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted">Primary Horizontal Logo</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.04} className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-line bg-white/[0.02]">
                <LogoMark size={44} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted">Icon / Monogram</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08} className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-line bg-ink">
                <LogoMark size={20} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted">Favicon</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.12} className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-line bg-[#F3F1EC]">
                <LogoMark size={44} chip={false} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted">Natural, on Light Backgrounds</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.16} className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-line bg-ink">
                <LogoMark size={44} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted">In a Chip, on Dark Backgrounds</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2} className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-line bg-white/[0.02]">
                <Logo height={30} withText={false} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted">Compact (Icon Only)</span>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-elevated">
        <div className="container-page py-20">
          <RevealOnScroll>
            <SectionHeading eyebrow="How We Work" title="AI-assisted. Human-approved." />
          </RevealOnScroll>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <RevealOnScroll key={v.title} delay={i * 0.06}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Icon name={v.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg text-paper">{v.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">{v.text}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <RevealOnScroll>
          <SectionHeading eyebrow="Who We Help" title="Built for people who don't have time to do this themselves" />
          <ul className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
            {[
              "Startups launching their first website",
              "Small business owners wearing every hat",
              "Creators and coaches building an audience",
              "Teams that need a presentation or campaign, fast",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 font-body text-sm text-muted">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </section>

      <section className="border-t border-line bg-ink-elevated">
        <div className="container-page py-16">
          <RevealOnScroll className="glass-card p-8 text-center">
            <p className="font-mono text-xs uppercase tracking-wide text-gold">
              A Note on Honesty
            </p>
            <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-muted">
              As a new studio, we don't have a long client history yet — and
              we won't pretend otherwise. Portfolio items marked as
              &ldquo;Sample / Demo&rdquo; are exactly that. Real testimonials
              and case studies will be added here as they happen.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <CTASection />
    </>
  );
}
