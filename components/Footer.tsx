import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import { brand, services, legalPages, waLink, mailLink } from "@/lib/data";

export default function Footer() {
  const socials = [
    { label: "Instagram", href: brand.instagram },
    { label: "LinkedIn", href: brand.linkedin },
    { label: "Facebook", href: brand.facebook },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <footer className="border-t border-line bg-ink-elevated">
      <div className="container-page grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-muted">
            AI-powered digital services for businesses, creators and startups
            — built with AI, refined by hand.
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href={waLink("Hi Asiya AI Studio, I would like to know more about your AI services.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-4 py-2 font-body text-xs font-medium text-ink transition-colors hover:bg-gold-soft"
            >
              <Icon name="whatsapp" className="h-3.5 w-3.5" /> Chat on WhatsApp
            </a>
            <a
              href={mailLink()}
              className="inline-flex items-center gap-2 font-body text-xs text-muted hover:text-gold"
            >
              <Icon name="mail" className="h-3.5 w-3.5" /> {brand.email}
            </a>
          </div>
          {socials.length > 0 ? (
            <div className="mt-5 flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-wide text-muted hover:text-gold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-5 font-mono text-[11px] uppercase tracking-wide text-muted">
              Social links coming soon
            </p>
          )}
        </div>

        <div>
          <p className="eyebrow mb-4">Quick Links</p>
          <ul className="space-y-2.5 font-body text-sm text-muted">
            <li><Link href="/about" className="hover:text-paper">About</Link></li>
            <li><Link href="/portfolio" className="hover:text-paper">Portfolio</Link></li>
            <li><Link href="/how-it-works" className="hover:text-paper">How It Works</Link></li>
            <li><Link href="/faq" className="hover:text-paper">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-paper">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Services</p>
          <ul className="space-y-2.5 font-body text-sm text-muted">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-paper">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Start a Project</p>
          <p className="mb-4 font-body text-sm text-muted">
            Have an idea? Let&apos;s turn it into professional work.
          </p>
          <Link href="/order" className="btn-primary">
            Start Your Project
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-wrap gap-x-5 gap-y-2 py-5">
          {legalPages.map((p) => (
            <Link
              key={p.slug}
              href={`/legal/${p.slug}`}
              className="font-body text-[11px] text-muted/70 hover:text-gold"
            >
              {p.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 font-body text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Asiya AI Studio. All rights reserved.</p>
          <p>Ideas, refined by AI and hand.</p>
        </div>
      </div>
    </footer>
  );
}
