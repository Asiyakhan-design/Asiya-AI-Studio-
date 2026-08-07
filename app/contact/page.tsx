import type { Metadata } from "next";
import { brand } from "@/lib/data";
import RevealOnScroll from "@/components/RevealOnScroll";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Asiya AI Studio by email, WhatsApp or the contact form before starting your project.",
};

export default function ContactPage() {
  return (
    <section className="container-page py-20 md:py-28">
      <RevealOnScroll>
        <p className="eyebrow">Contact</p>
        <h1 className="section-heading mt-3 max-w-xl md:text-5xl">
          Questions before you order? Let&apos;s talk.
        </h1>
        <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-muted">
          Whether you're not sure which package fits, or you have a custom
          project in mind, send us a message — we reply personally.
        </p>
      </RevealOnScroll>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <RevealOnScroll className="space-y-6">
          <div className="glass-card p-6">
            <p className="eyebrow">Email</p>
            <a href={`mailto:${brand.email}`} className="mt-2 block font-body text-sm text-paper hover:text-gold">
              {brand.email}
            </a>
          </div>

          <a
            href={`https://wa.me/${brand.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
              "Hi Asiya AI Studio, I would like to know more about your AI services."
            )}`}
            target="_blank"
            rel="noreferrer"
            className="glass-card glass-card-hover flex items-center gap-4 p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Icon name="whatsapp" className="h-5 w-5" />
            </div>
            <div>
              <p className="font-body text-sm text-paper">Prefer WhatsApp?</p>
              <p className="font-body text-xs text-muted">Chat with us directly</p>
            </div>
          </a>

          <div className="glass-card p-6">
            <p className="eyebrow">Business Hours</p>
            <p className="mt-2 font-body text-sm text-muted">
              Monday – Saturday, 10:00 AM – 7:00 PM (PKT)
            </p>
            <p className="mt-1 font-body text-xs text-muted">
              Messages outside these hours are answered the next business day.
            </p>
          </div>

          <div className="glass-card p-6">
            <p className="eyebrow">Service Area</p>
            <p className="mt-2 font-body text-sm text-muted">
              Remote — working with clients across Pakistan and
              internationally.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <ContactForm />
        </RevealOnScroll>
      </div>
    </section>
  );
}
