import type { Metadata } from "next";
import Link from "next/link";
import { processSteps } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import RevealOnScroll from "@/components/RevealOnScroll";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The full Asiya AI Studio process, from choosing a service to final delivery — nine clear steps, no surprises.",
};

const extraInfo = [
  {
    title: "What you need to provide",
    text: "Business details, a short description of what you need, your deadline, and any reference files, brand colors or examples you'd like us to follow. The more context you give, the fewer revision rounds you'll need.",
  },
  {
    title: "How communication works",
    text: "Every project has one point of contact — by WhatsApp or email, whichever you prefer. You'll get an update at each key step: confirmation, draft/preview, and final delivery.",
  },
  {
    title: "How revisions work",
    text: "Each package includes a set number of revision rounds. Revisions must stay within the original project scope and be requested within 5 days of delivery. Requests outside scope are quoted separately.",
  },
  {
    title: "How delivery works",
    text: "Final files are delivered digitally — as documents, images, video files or editable design/slide files depending on the service — once the remaining balance is settled.",
  },
  {
    title: "What happens after your order",
    text: "We follow up to make sure everything works for you. You're welcome to return any time for a new project, and repeat clients get priority scheduling.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-20 md:py-28">
          <RevealOnScroll>
            <p className="eyebrow">How It Works</p>
            <h1 className="section-heading mt-3 max-w-2xl md:text-5xl">
              A simple, transparent process from idea to final delivery.
            </h1>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-muted">
              Nine steps. You always know what's happening and what comes
              next — no disappearing acts, no surprise scope changes.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="relative mx-auto max-w-2xl">
          <div className="node-line absolute left-[19px] top-2 h-[calc(100%-2rem)] w-px" />
          <div className="space-y-12">
            {processSteps.map((step, i) => (
              <RevealOnScroll key={step.step} delay={i * 0.04} className="relative flex gap-6">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ink font-mono text-xs text-gold">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-display text-lg text-paper">{step.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                    {step.text}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-elevated">
        <div className="container-page py-20">
          <RevealOnScroll>
            <SectionHeading eyebrow="Good to Know" title="The details behind the process" />
          </RevealOnScroll>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {extraInfo.map((info, i) => (
              <RevealOnScroll key={info.title} delay={i * 0.05}>
                <h3 className="font-display text-lg text-paper">{info.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                  {info.text}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <RevealOnScroll>
          <p className="font-body text-sm text-muted">
            Still have questions before you start?{" "}
            <Link href="/faq" className="text-gold hover:underline">
              Check the FAQ
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-gold hover:underline">
              contact us directly
            </Link>
            .
          </p>
        </RevealOnScroll>
      </section>

      <CTASection />
    </>
  );
}
