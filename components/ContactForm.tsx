"use client";

import { FormEvent, useState } from "react";
import Icon from "./Icon";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Icon name="check" className="h-6 w-6" />
        </div>
        <h3 className="mt-5 font-display text-xl text-paper">Message sent.</h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-muted">
          Thanks for reaching out to Asiya AI Studio. We reply personally to
          every message, usually within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card space-y-5 p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full Name"
          value={values.name}
          onChange={(v) => handleChange("name", v)}
          error={errors.name}
          placeholder="Your name"
        />
        <Field
          label="Email"
          type="email"
          value={values.email}
          onChange={(v) => handleChange("email", v)}
          error={errors.email}
          placeholder="you@email.com"
        />
      </div>

      <Field
        label="WhatsApp (optional)"
        value={values.whatsapp}
        onChange={(v) => handleChange("whatsapp", v)}
        placeholder="+92 3XX XXXXXXX"
      />

      <Field
        label="Subject"
        value={values.subject}
        onChange={(v) => handleChange("subject", v)}
        error={errors.subject}
        placeholder="What's this about?"
      />

      <div>
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Message
        </label>
        <textarea
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={5}
          placeholder="Tell us a bit about what you need..."
          className={`mt-2 w-full rounded-xl border bg-white/[0.02] px-4 py-3 font-body text-sm text-paper placeholder:text-muted/60 focus:outline-none ${
            errors.message ? "border-red-400/60" : "border-line focus:border-gold/50"
          }`}
        />
        {errors.message && (
          <p className="mt-1.5 font-body text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Send Message
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-wide text-muted">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-xl border bg-white/[0.02] px-4 py-3 font-body text-sm text-paper placeholder:text-muted/60 focus:outline-none ${
          error ? "border-red-400/60" : "border-line focus:border-gold/50"
        }`}
      />
      {error && <p className="mt-1.5 font-body text-xs text-red-400">{error}</p>}
    </div>
  );
}
