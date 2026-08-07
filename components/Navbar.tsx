"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-page flex h-20 items-center justify-between">
        <Link href="/" aria-label="Asiya AI Studio home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-body text-sm transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-muted hover:text-paper"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/order" className="btn-primary hidden lg:inline-flex">
          Start Your Project
        </Link>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-paper lg:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[1.5px] w-4 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`overflow-hidden border-b border-line bg-ink transition-[max-height] duration-300 ease-in-out lg:hidden ${
          open ? "max-h-[26rem]" : "max-h-0 border-b-0"
        }`}
      >
        <ul className="container-page flex flex-col gap-1 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-lg px-3 py-3 font-body text-sm ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-paper/90 hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link href="/order" className="btn-primary w-full">
              Start Your Project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
