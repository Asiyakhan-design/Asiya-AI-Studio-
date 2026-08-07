"use client";

import Icon from "./Icon";
import { waLink, mailLink } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  context,
  variant = "primary",
  className = "",
}: {
  message: string;
  label?: string;
  context?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}) {
  const cls =
    variant === "primary" ? "btn-primary" : variant === "outline" ? "btn-outline" : "btn-secondary";
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noreferrer"
      className={`${cls} ${className}`}
      onClick={() => trackEvent("whatsapp_click", { context: context || label })}
    >
      <Icon name="whatsapp" className="h-4 w-4" /> {label}
    </a>
  );
}

export function EmailButton({
  subject,
  label = "Email Us",
  variant = "secondary",
  className = "",
}: {
  subject?: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}) {
  const cls =
    variant === "primary" ? "btn-primary" : variant === "outline" ? "btn-outline" : "btn-secondary";
  return (
    <a
      href={mailLink(subject)}
      className={`${cls} ${className}`}
      onClick={() => trackEvent("email_click", { subject })}
    >
      <Icon name="mail" className="h-4 w-4" /> {label}
    </a>
  );
}
