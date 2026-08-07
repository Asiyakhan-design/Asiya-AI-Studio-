"use client";

import { useState } from "react";
import { PortfolioItem } from "@/lib/types";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioGrid({
  items,
  categories,
}: {
  items: PortfolioItem[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors duration-200 ${
              active === cat
                ? "border-gold bg-gold/15 text-gold"
                : "border-line text-muted hover:border-gold/40 hover:text-paper"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <PortfolioCard key={item.slug} item={item} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full font-body text-sm text-muted">
            No projects in this category yet — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
