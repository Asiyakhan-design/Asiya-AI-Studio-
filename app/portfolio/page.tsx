import type { Metadata } from "next";
import { portfolioItems, portfolioCategories } from "@/lib/data";
import RevealOnScroll from "@/components/RevealOnScroll";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Sample and demo projects across content, images, video, social media, presentations, branding and automation.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-20 md:py-28">
          <RevealOnScroll>
            <p className="eyebrow">Portfolio</p>
            <h1 className="section-heading mt-3 max-w-2xl md:text-5xl">
              What a finished project looks like.
            </h1>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-muted">
              We're a new studio, so every project below is a clearly
              labeled sample or demo, built to show the quality and style you
              can expect. Real client work will be added here as projects are
              completed and shared with permission.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="container-page py-20">
        <RevealOnScroll>
          <PortfolioGrid items={portfolioItems} categories={portfolioCategories} />
        </RevealOnScroll>
      </section>

      <CTASection
        title="Want your project featured here next?"
        subtitle="Start a project with us and be one of our first real case studies."
      />
    </>
  );
}
