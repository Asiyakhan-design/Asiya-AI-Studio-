import { PortfolioItem } from "@/lib/types";

const gradients: Record<string, string> = {
  "AI Content": "from-[#8A703F]/25 via-transparent to-transparent",
  "AI Images": "from-[#6C5CE0]/25 via-transparent to-transparent",
  "AI Videos": "from-[#C9A15C]/25 via-transparent to-transparent",
  "Social Media": "from-[#E8CD97]/20 via-transparent to-transparent",
  Presentations: "from-[#6C5CE0]/20 via-transparent to-transparent",
  Branding: "from-[#C9A15C]/20 via-transparent to-transparent",
  "AI Automation": "from-[#6C5CE0]/25 via-transparent to-transparent",
  "SEO & Blog Content": "from-[#8A703F]/20 via-transparent to-transparent",
};

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="glass-card glass-card-hover group overflow-hidden">
      <div
        className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${
          gradients[item.category] ?? "from-gold/20 via-transparent to-transparent"
        } bg-ink-elevated`}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {item.category}
        </span>
        <span className="absolute right-3 top-3 rounded-full border border-line bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-gold">
          Sample Project
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg text-paper">{item.title}</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted">
          {item.objective}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.deliverables.slice(0, 2).map((d) => (
            <span
              key={d}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
