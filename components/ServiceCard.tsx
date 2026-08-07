import Link from "next/link";
import { Service } from "@/lib/types";
import Icon from "./Icon";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <div className="glass-card glass-card-hover group flex h-full flex-col p-7">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
          <Icon name={service.icon} className="h-5 w-5" />
        </div>
        <span className="font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-6 font-display text-xl text-paper">{service.name}</h3>
      <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted">
        {service.tagline}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-5 font-mono text-xs text-muted">
        <span>From PKR {service.startingPkr} / ${service.startingUsd}</span>
        <span>{service.deliveryEstimate}</span>
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          href={`/services/${service.slug}`}
          className="flex-1 rounded-full border border-line py-2.5 text-center font-body text-sm text-paper transition-colors duration-200 group-hover:border-gold/40 hover:text-gold"
        >
          View Details
        </Link>
        <Link
          href={`/order?service=${service.slug}`}
          className="flex-1 rounded-full bg-gold py-2.5 text-center font-body text-sm font-medium text-ink transition-colors duration-200 hover:bg-gold-soft"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
}
