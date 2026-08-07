import type { Metadata } from "next";
import { faqs } from "@/lib/data";
import RevealOnScroll from "@/components/RevealOnScroll";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about ordering, timelines, revisions, payment and working with Asiya AI Studio.",
};

export default function FAQPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-20 md:py-28">
          <RevealOnScroll>
            <p className="eyebrow">FAQ</p>
            <h1 className="section-heading mt-3 max-w-2xl md:text-5xl">
              Answers before you ask.
            </h1>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-muted">
              Can't find what you're looking for? Reach out on the Contact
              page — we reply personally to every message.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl space-y-14">
          {categories.map((cat, i) => (
            <RevealOnScroll key={cat} delay={i * 0.05}>
              <h2 className="font-display text-xl text-gold">{cat}</h2>
              <div className="mt-4">
                <FAQAccordion
                  items={faqs
                    .filter((f) => f.category === cat)
                    .map(({ q, a }) => ({ q, a }))}
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <CTASection
        title="Still not sure which service fits?"
        subtitle="Message us with a quick description of what you need — we'll point you to the right package."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
