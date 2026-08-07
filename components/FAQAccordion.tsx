"use client";

import { useState } from "react";

export default function FAQAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-body text-base text-paper">{item.q}</span>
              <span
                className={`relative h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current" />
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              style={{ display: "grid" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl font-body text-sm leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
