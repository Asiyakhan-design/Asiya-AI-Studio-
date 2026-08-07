import type { Metadata } from "next";
import { Suspense } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import OrderForm from "@/components/OrderForm";

export const metadata: Metadata = {
  title: "Start Your Project",
  description:
    "Choose your service and package, submit your requirements, and start your project with Asiya AI Studio.",
};

export default function OrderPage() {
  return (
    <section className="container-page py-20 md:py-28">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <p className="eyebrow justify-center">Start Your Project</p>
        <h1 className="section-heading mt-3 md:text-5xl">
          Let&apos;s turn your idea into professional work.
        </h1>
        <p className="mt-5 font-body text-base leading-relaxed text-muted">
          Fill out the form below with your project details. We'll review it
          and get back to you within 24 hours to confirm scope, timeline and
          price.
        </p>
      </RevealOnScroll>

      <div className="mx-auto mt-14 max-w-2xl">
        <Suspense fallback={null}>
          <OrderForm />
        </Suspense>
      </div>
    </section>
  );
}
