import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";

export default function CTASection({
  title = "Ready to turn your idea into professional work?",
  subtitle = "Tell us what you need — we'll confirm scope and timeline within 24 hours.",
  primaryLabel = "Start Your Project",
  primaryHref = "/order",
  secondaryLabel = "Explore Our Services",
  secondaryHref = "/services",
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="border-t border-line bg-gold-glow">
      <div className="container-page py-20 text-center md:py-28">
        <RevealOnScroll>
          <p className="eyebrow justify-center">Let&apos;s Get Started</p>
          <h2 className="section-heading mx-auto mt-3 max-w-2xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base text-muted">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href={primaryHref} className="btn-primary">
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className="btn-secondary">
              {secondaryLabel}
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
