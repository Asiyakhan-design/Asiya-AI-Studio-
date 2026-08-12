"use client";

import { FormEvent, useState } from "react";
import Icon from "./Icon";
import { WhatsAppButton, EmailButton } from "./ContactButtons";
import { trackEvent } from "@/lib/analytics";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [notified, setNotified] = useState(true);
  const [serverError, setServerError] = useState("");

  function validate() {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.subject.trim()) next.subject = "Please add a subject.";
    if (!values.message.trim() || values.message.trim().length < 10) {
      next.message = "Please write a message of at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setServerError(data.error || "Something went wrong sending your message. Please try again.");
        setStatus("error");
        return;
      }

      trackEvent("contact_form_submit", { notified: Boolean(data.notified) });
      setNotified(Boolean(data.notified));
      setStatus("success");
    } catch {
      setServerError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Icon name="check" className="h-6 w-6" />
        </div>
        <h3 className="mt-5 font-display text-xl text-paper">
          {notified ? "Message sent." : "Message received."}
        </h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-muted">
          {notified
            ? "Thanks for reaching out to Asiya AI Studio. We reply personally to every message, usually within 24 hours."
            : "Your message was validated and processed, but we couldn't confirm it reached a live notification channel just now. To be safe, please also message us directly:"}
        </p>
        {!notified && (
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              message="Hi Asiya AI Studio, I just tried to send a message through your Contact page."
              label="Message on WhatsApp"
              context="contact_fallback"
            />
            <EmailButton subject="Website Contact — Follow Up" label="Email Us" />
          </div>
        )}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="glass-card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-400/15 text-red-400">
          <Icon name="alert" className="h-6 w-6" />
        </div>
        <h3 className="mt-5 font-display text-xl text-paper">We couldn't send your message.</h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-muted">{serverError}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <WhatsAppButton
            message="Hi Asiya AI Studio, I tried to message you through your website but it didn't go through."
            label="Message on WhatsApp"
          />
          <EmailButton subject="Website Contact — Error" label="Email Us Instead" />
        </div>
        <button type="button" className="btn-secondary mt-5" onClick={() => setStatus("idle")}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card space-y-5 p-7">
      {/* Honeypot — visually and programmatically hidden from real users */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          type="text"
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full Name"
          required
          value={values.name}
          onChange={(v) => handleChange("name", v)}
          error={errors.name}
          placeholder="Your name"
        />
        <Field
          label="Email"
          required
          type="email"
          value={values.email}
          onChange={(v) => handleChange("email", v)}
          error={errors.email}
          placeholder="you@email.com"
        />
      </div>

      <Field
        label="WhatsApp"
        optional
        value={values.whatsapp}
        onChange={(v) => handleChange("whatsapp", v)}
        placeholder="+92 3XX XXXXXXX"
      />

      <Field
        label="Subject"
        required
        value={values.subject}
        onChange={(v) => handleChange("subject", v)}
        error={errors.subject}
        placeholder="What's this about?"
      />

      <div>
        <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-wide text-muted">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="contact-message"
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={5}
          placeholder="Tell us a bit about what you need..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`mt-2 w-full rounded-xl border bg-white/[0.02] px-4 py-3 font-body text-sm text-paper placeholder:text-muted/60 focus:outline-none ${
            errors.message ? "border-red-400/60" : "border-line focus:border-gold/50"
          }`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 font-body text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
}) {
  const id = `contact-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-wide text-muted">
        {label} {required && <span className="text-gold">*</span>}
        {optional && <span className="normal-case text-muted/70">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full rounded-xl border bg-white/[0.02] px-4 py-3 font-body text-sm text-paper placeholder:text-muted/60 focus:outline-none ${
          error ? "border-red-400/60" : "border-line focus:border-gold/50"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-body text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
