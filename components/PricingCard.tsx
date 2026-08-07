import Link from "next/link";
import { PackageTier } from "@/lib/types";
import Icon from "./Icon";

export default function PricingCard({
  tier,
  serviceSlug,
  featured = false,
}: {
  tier: PackageTier;
  serviceSlug?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-xl2 border p-7 transition-all duration-300 ${
        featured
          ? "border-gold/50 bg-white/[0.05] shadow-glow"
          : "border-line bg-white/[0.02] hover:border-gold/30"
      }`}
    >
      {featured && (
        <span className="mb-4 inline-block w-fit rounded-full bg-gold/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold">
          Most Chosen
        </span>
      )}
      <h3 className="font-display text-2xl text-paper">{tier.name}</h3>
      <p className="mt-1 font-body text-sm text-muted">{tier.bestFor}</p>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">
          {tier.priceLabel}
        </p>
        <p className="mt-1 font-display text-2xl text-gold">{tier.pkr}</p>
        <p className="font-body text-sm text-muted">{tier.usd}</p>
      </div>

      <div className="mt-5 flex gap-4 border-y border-line py-4 font-body text-xs text-muted">
        <span>Delivery: {tier.delivery}</span>
        <span>·</span>
        <span>{tier.revisions}</span>
      </div>

      <ul className="mt-5 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 font-body text-sm text-paper/90">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={
          serviceSlug
            ? `/order?service=${serviceSlug}&package=${tier.name.toLowerCase()}`
            : "/order"
        }
        className={featured ? "btn-primary mt-7 w-full" : "btn-secondary mt-7 w-full"}
      >
        Choose {tier.name}
      </Link>
    </div>
  );
}
