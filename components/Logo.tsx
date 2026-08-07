import Image from "next/image";

/**
 * Uses the actual approved Asiya AI Studio logo (an "A" built from a teal-to-purple
 * circuit/node motif), supplied by the client. The source artwork is designed on a light
 * background, so on dark surfaces (navbar, footer, dark cards) it's shown inside a small
 * light "chip" rather than being redrawn — this preserves exact color fidelity to the
 * approved design instead of an approximate recreation.
 */

export function LogoMark({
  size = 32,
  chip = true,
}: {
  size?: number;
  chip?: boolean;
}) {
  const img = (
    <Image
      src="/logo-icon.jpg"
      alt="Asiya AI Studio icon"
      width={size}
      height={Math.round(size * (216 / 241))}
      style={{ height: size, width: "auto" }}
      priority
    />
  );
  if (!chip) return img;
  return (
    <span
      className="inline-flex items-center justify-center rounded-xl bg-[#F8F6F1] shadow-md"
      style={{ padding: Math.max(4, size * 0.14) }}
    >
      {img}
    </span>
  );
}

export default function Logo({
  className = "",
  height = 30,
  withText = true,
  chip = true,
}: {
  className?: string;
  height?: number;
  withText?: boolean;
  chip?: boolean;
}) {
  const img = withText ? (
    <Image
      src="/logo-lockup.jpg"
      alt="Asiya AI Studio"
      width={Math.round(height * (641 / 228))}
      height={height}
      style={{ height, width: "auto" }}
      priority
    />
  ) : (
    <Image
      src="/logo-icon.jpg"
      alt="Asiya AI Studio"
      width={Math.round(height * (241 / 216))}
      height={height}
      style={{ height, width: "auto" }}
      priority
    />
  );

  if (!chip) {
    return <span className={`inline-flex items-center ${className}`}>{img}</span>;
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="inline-flex items-center justify-center rounded-xl bg-[#F8F6F1] px-2.5 py-1.5 shadow-md">
        {img}
      </span>
    </span>
  );
}
