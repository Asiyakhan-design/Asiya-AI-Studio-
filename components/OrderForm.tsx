"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppButton, EmailButton } from "./ContactButtons";
import Icon from "./Icon";

type Values = {
  service: string;
  pkg: string;
  name: string;
  email: string;
  whatsapp: string;
  description: string;
  requirements: string;
  deadline: string;
  style: string;
  notes: string;
  website: string; // honeypot — real users never see or fill this
};

type Errors = Partial<Record<keyof Values, string>>;

type SubmitResult = {
  requestId: string;
  emailSent: boolean;
  whatsappSent: boolean;
  storagePersisted: boolean;
};

export default function OrderForm() {
  const params = useSearchParams();
  const preselectedService = params.get("service") ?? "";
  const preselectedPackage = params.get("package") ?? "";

  const [values, setValues] = useState<Values>({
    service: preselectedService,
    pkg: preselectedPackage,
    name: "",
    email: "",
    whatsapp: "",
    description: "",
    requirements: "",
    deadline: "",
    style: "",
    notes: "",
    website: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [serverError, setServerError] = useState<string>("");

  const selectedService = services.find((s) => s.slug === values.service);

  function update<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function validate() {
    const next: Errors = {};
    if (!values.service) next.service = "Please choose a service.";
    if (!values.pkg) next.pkg = "Please choose a package.";
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.description.trim() || values.description.trim().length < 15) {
      next.description = "Please describe your project (at least 15 characters).";
    }
    if (!values.deadline) next.deadline = "Please select a preferred deadline.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/project-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: values.service,
          pkg: selectedService?.packages.find((p) => p.name.toLowerCase() === values.pkg)?.name ?? values.pkg,
          name: values.name,
          email: values.email,
          whatsapp: values.whatsapp,
          description: values.description,
          requirements: values.requirements,
          deadline: values.deadline,
          style: values.style,
          notes: values.notes,
          website: values.website,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setServerError(
          data.error || "Something went wrong submitting your request. Please try again or reach us directly."
        );
        setStatus("error");
        return;
      }

      // No personal data (name/email/whatsapp/description) is sent to analytics —
      // only the service, package, and a non-identifying request ID.
      trackEvent("project_request_submit", {
        service: values.service,
        pkg: values.pkg,
        requestId: data.requestId,
      });

      setResult({
        requestId: data.requestId,
        emailSent: Boolean(data.email?.sent),
        whatsappSent: Boolean(data.whatsapp?.sent),
        storagePersisted: Boolean(data.storagePersisted),
      });
      setStatus("success");
    } catch {
      setServerError(
        "We couldn't reach the server to submit your request. Please check your connection and try again, or contact us directly."
      );
      setStatus("error");
    }
  }

  if (status === "success" && result) {
    const notified = result.emailSent || result.whatsappSent;
    return (
      <div className="glass-card mx-auto max-w-xl p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Icon name="check" className="h-7 w-7" />
        </div>
        <h2 className="mt-6 font-display text-2xl text-paper">
          Your project request has been received.
        </h2>
        <p className="mt-3 font-mono text-sm text-gold">{result.requestId}</p>
        <p className="mt-4 font-body text-sm leading-relaxed text-muted">
          {notified
            ? "We'll review your requirements and contact you within 24 hours by email or WhatsApp to confirm scope and timeline."
            : "We've recorded your request, but weren't able to confirm delivery of a notification just now. To make sure nothing is missed, please also reach us directly using a button below."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppButton
            message={`Hi Asiya AI Studio, I just submitted a project request. Reference: ${result.requestId}.`}
            label="Continue on WhatsApp"
            context="order_confirmation"
          />
          <EmailButton subject={`Project Request ${result.requestId}`} label="Email Us" />
        </div>
        <div className="mt-6 rounded-xl border border-line bg-white/[0.02] p-4 font-body text-xs text-muted">
          Payment details will be provided after project confirmation.
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="glass-card mx-auto max-w-xl p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-400/15 text-red-400">
          <Icon name="alert" className="h-7 w-7" />
        </div>
        <h2 className="mt-6 font-display text-2xl text-paper">We couldn't submit your request.</h2>
        <p className="mt-4 font-body text-sm leading-relaxed text-muted">{serverError}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppButton
            message="Hi Asiya AI Studio, I tried to submit a project request on the website but it didn't go through."
            label="Message Us on WhatsApp"
          />
          <EmailButton subject="Project Request — Website Error" label="Email Us Instead" />
        </div>
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => setStatus("idle")}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card space-y-8 p-7 md:p-9">
      {/* Honeypot — hidden from real users via CSS, not just visually; bots that fill
          every field will trip this and be silently no-op'd server-side. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>
      {/* SERVICE */}
      <fieldset>
        <legend className="eyebrow mb-4">Step 1 · Choose Service</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <label
              key={s.slug}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 font-body text-sm transition-colors duration-200 ${
                values.service === s.slug
                  ? "border-gold/60 bg-gold/10 text-paper"
                  : "border-line text-muted hover:border-gold/30"
              }`}
            >
              <input
                type="radio"
                name="service"
                value={s.slug}
                checked={values.service === s.slug}
                onChange={() => {
                  update("service", s.slug);
                  update("pkg", "");
                }}
                className="sr-only"
              />
              <Icon name={s.icon} className="h-4 w-4 shrink-0 text-gold" />
              {s.shortName}
            </label>
          ))}
        </div>
        {errors.service && <p className="mt-2 font-body text-xs text-red-400">{errors.service}</p>}
      </fieldset>

      {/* PACKAGE */}
      {selectedService && (
        <fieldset>
          <legend className="eyebrow mb-4">Step 2 · Choose Package</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {selectedService.packages.map((p) => (
              <label
                key={p.name}
                className={`cursor-pointer rounded-xl border px-4 py-3 font-body text-sm transition-colors duration-200 ${
                  values.pkg === p.name.toLowerCase()
                    ? "border-gold/60 bg-gold/10 text-paper"
                    : "border-line text-muted hover:border-gold/30"
                }`}
              >
                <input
                  type="radio"
                  name="pkg"
                  value={p.name.toLowerCase()}
                  checked={values.pkg === p.name.toLowerCase()}
                  onChange={() => update("pkg", p.name.toLowerCase())}
                  className="sr-only"
                />
                <span className="block font-display text-base text-paper">{p.name}</span>
                <span className="mt-1 block text-xs text-muted">{p.pkr}</span>
              </label>
            ))}
          </div>
          {errors.pkg && <p className="mt-2 font-body text-xs text-red-400">{errors.pkg}</p>}
        </fieldset>
      )}

      {/* PROJECT DETAILS */}
      <fieldset className="space-y-5">
        <legend className="eyebrow mb-1">Step 3 · Project Details</legend>

        <TextArea
          label="Project Description"
          value={values.description}
          onChange={(v) => update("description", v)}
          error={errors.description}
          placeholder="What are you looking to get done, and for what business or purpose?"
        />

        <TextArea
          label="Requirements"
          value={values.requirements}
          onChange={(v) => update("requirements", v)}
          placeholder="Any specific requirements, must-haves, or things to avoid?"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="font-mono text-xs uppercase tracking-wide text-muted">
              Deadline
            </label>
            <input
              type="date"
              value={values.deadline}
              onChange={(e) => update("deadline", e.target.value)}
              className={`mt-2 w-full rounded-xl border bg-white/[0.02] px-4 py-3 font-body text-sm text-paper focus:outline-none ${
                errors.deadline ? "border-red-400/60" : "border-line focus:border-gold/50"
              }`}
            />
            {errors.deadline && (
              <p className="mt-1.5 font-body text-xs text-red-400">{errors.deadline}</p>
            )}
          </div>
          <Input
            label="Preferred Style"
            value={values.style}
            onChange={(v) => update("style", v)}
            placeholder="e.g. minimal, bold, playful, corporate"
          />
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-muted">
            Reference Files
          </label>
          <div className="mt-2 rounded-xl border border-dashed border-line px-4 py-6 text-center font-body text-xs text-muted">
            File upload is enabled once this site is connected to a backend.
            For now, please mention reference links in your description, or
            send files by email/WhatsApp after submitting.
          </div>
        </div>

        <TextArea
          label="Additional Notes"
          value={values.notes}
          onChange={(v) => update("notes", v)}
          placeholder="Anything else we should know?"
        />
      </fieldset>

      {/* CONTACT INFO */}
      <fieldset className="space-y-5">
        <legend className="eyebrow mb-1">Step 4 · Your Contact Info</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Full Name"
            value={values.name}
            onChange={(v) => update("name", v)}
            error={errors.name}
            placeholder="Your name"
          />
          <Input
            label="Email"
            type="email"
            value={values.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
            placeholder="you@email.com"
          />
        </div>
        <Input
          label="WhatsApp"
          value={values.whatsapp}
          onChange={(v) => update("whatsapp", v)}
          placeholder="+92 3XX XXXXXXX"
        />
      </fieldset>

      <button type="submit" className="btn-primary w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Project Request"}
      </button>
      <p className="text-center font-body text-xs text-muted">
        Payment details will be provided after your project is confirmed.
      </p>
    </form>
  );
}

function Input({
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
      <label className="font-mono text-xs uppercase tracking-wide text-muted">{label}</label>
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

function TextArea({
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-wide text-muted">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-xl border bg-white/[0.02] px-4 py-3 font-body text-sm text-paper placeholder:text-muted/60 focus:outline-none ${
          error ? "border-red-400/60" : "border-line focus:border-gold/50"
        }`}
      />
      {error && <p className="mt-1.5 font-body text-xs text-red-400">{error}</p>}
    </div>
  );
}
