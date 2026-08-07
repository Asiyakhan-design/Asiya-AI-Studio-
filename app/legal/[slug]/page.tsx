import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { legalPages, BUSINESS_EMAIL, mailLink } from "@/lib/data";
import RevealOnScroll from "@/components/RevealOnScroll";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = legalPages.find((p) => p.slug === params.slug);
  if (!page) return {};
  return {
    title: page.title,
    description: `${page.title} for Asiya AI Studio.`,
  };
}

export default function LegalPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = legalPages.find((p) => p.slug === params.slug);
  if (!page) notFound();

  const others = legalPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-20 md:py-28">
          <RevealOnScroll>
            <p className="eyebrow">Legal</p>
            <h1 className="section-heading mt-3 max-w-2xl md:text-5xl">{page.title}</h1>
            <p className="mt-4 font-body text-sm text-muted">
              Last updated August 2026 — questions:{" "}
              <a href={mailLink(page.title)} className="text-gold hover:underline">
                {BUSINESS_EMAIL}
              </a>
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="max-w-2xl">
          {page.sections.map((s, i) => (
            <RevealOnScroll key={s.h} delay={i * 0.04} className="mb-8">
              <h3 className="font-display text-lg text-paper">{s.h}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted">{s.b}</p>
            </RevealOnScroll>
          ))}

          <div className="mt-10 flex flex-wrap gap-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/legal/${p.slug}`}
                className="rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted transition-colors duration-200 hover:border-gold/40 hover:text-paper"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
