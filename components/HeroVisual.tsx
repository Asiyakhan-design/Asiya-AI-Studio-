"use client";

import { useState } from "react";
import Icon from "./Icon";
import { LogoMark } from "./Logo";
import { services, nodeExplanations, brand } from "@/lib/data";

export default function HeroVisual() {
  const [hovered, setHovered] = useState<string | null>(null);
  const radius = 128;
  const positioned = services.map((s, i) => {
    const angle = (i / services.length) * 2 * Math.PI - Math.PI / 2;
    return {
      ...s,
      x: 160 + radius * Math.cos(angle),
      y: 160 + radius * Math.sin(angle),
      delay: i * 0.28,
    };
  });
  const frozen = hovered !== null;
  const hoveredService = services.find((s) => s.slug === hovered);

  return (
    <div className="glass-card relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden p-5">
      <div className={`otr-scene relative w-full max-w-[320px] ${frozen ? "otr-frozen" : ""}`} style={{ aspectRatio: "1 / 1" }}>
        {/* rotating caption */}
        <div className="pointer-events-none absolute left-1/2 top-[6%] h-[34px] w-[88%] -translate-x-1/2 text-center">
          <span className="otr-cap otr-cap-1 font-mono text-[11px] uppercase tracking-wide text-paper">Your Idea</span>
          <span className="otr-cap otr-cap-2 font-mono text-[11px] uppercase tracking-wide text-paper">Asiya AI Studio</span>
          <span className="otr-cap otr-cap-3 font-mono text-[11px] uppercase tracking-wide text-paper">Idea → Creation → Result</span>
          <span className="otr-cap otr-cap-4 font-display text-[13px] italic text-gold">{brand.tagline}</span>
        </div>

        <svg viewBox="0 0 320 320" width="100%" height="100%" className="absolute inset-0">
          {positioned.map((n) => (
            <line
              key={n.slug}
              x1="160"
              y1="160"
              x2={n.x}
              y2={n.y}
              className="otr-line"
              stroke="rgba(201,161,92,0.35)"
              strokeWidth="1.2"
              style={{ animationDelay: `${1.4 + n.delay}s` }}
            />
          ))}
          <circle r="4" fill="#C9A15C" className="otr-spark">
            <animateMotion dur="10s" repeatCount="indefinite" path="M20,160 L160,160" />
          </circle>
        </svg>

        {/* hub */}
        <div className="otr-hub absolute left-1/2 top-1/2 z-[2] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
          <LogoMark size={18} />
        </div>

        {/* result badge */}
        <div className="otr-result absolute bottom-[6%] left-1/2 z-[2] flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-xl border border-gold/40 bg-gold/10">
          <Icon name="spark" className="h-3.5 w-3.5 text-gold" />
        </div>

        {/* service nodes */}
        {positioned.map((n) => {
          const isHovered = hovered === n.slug;
          return (
            <button
              key={n.slug}
              type="button"
              aria-label={n.shortName}
              className={`otr-node absolute z-[3] flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-elevated text-muted transition-colors ${
                isHovered ? "otr-node-active" : ""
              }`}
              style={{
                left: `${(n.x / 320) * 100}%`,
                top: `${(n.y / 320) * 100}%`,
                animationDelay: isHovered ? undefined : `${1.6 + n.delay}s`,
              }}
              onMouseEnter={() => setHovered(n.slug)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.slug)}
              onBlur={() => setHovered(null)}
            >
              <Icon name={n.icon} className="h-3.5 w-3.5" />
            </button>
          );
        })}
      </div>

      <div className="min-h-[38px] max-w-[280px] text-center">
        {hoveredService ? (
          <>
            <span className="font-mono text-[11px] uppercase text-gold">{hoveredService.shortName}</span>
            <p className="mt-1 font-body text-xs text-muted">{nodeExplanations[hoveredService.slug]}</p>
          </>
        ) : (
          <p className="font-mono text-[11px] text-muted">Hover a service node to learn more</p>
        )}
      </div>
    </div>
  );
}
