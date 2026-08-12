import { NextRequest, NextResponse } from "next/server";
import { services } from "@/lib/data";
import {
  sanitizeText,
  generateRequestId,
  isRateLimited,
  sendOwnerEmail,
  sendWhatsAppTemplateNotification,
  validateFile,
  type EmailAttachment,
} from "@/lib/server/notifications";

export const dynamic = "force-dynamic";

const MAX_FIELD_LEN = 3000;

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`project-request:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes, or contact us on WhatsApp." },
      { status: 429 }
    );
  }

  // multipart/form-data so the optional reference file can travel in the same request
  // — no separate upload step, no temporary disk storage, nothing to clean up.
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return badRequest("Invalid request body.");
  }

  const get = (key: string) => sanitizeText(form.get(key), MAX_FIELD_LEN);

  // Honeypot
  const honeypot = form.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true, requestId: generateRequestId(), notified: false });
  }

  const service = services.find((s) => s.slug === form.get("service"));
  if (!service) return badRequest("Please choose a valid service.");

  const pkgRaw = get("pkg").toLowerCase();
  const pkg = service.packages.find((p) => p.name.toLowerCase() === pkgRaw);
  if (!pkg) return badRequest("Please choose a valid package.");

  const name = sanitizeText(form.get("name"), 120);
  if (!name) return badRequest("Full name is required.");

  const email = sanitizeText(form.get("email"), 200);
  if (!/^\S+@\S+\.\S+$/.test(email)) return badRequest("A valid email is required.");

  const description = sanitizeText(form.get("description"), MAX_FIELD_LEN);
  if (description.length < 15) return badRequest("Project description must be at least 15 characters.");

  const deadline = sanitizeText(form.get("deadline"), 40);
  if (!deadline) return badRequest("A preferred deadline is required.");

  const whatsapp = sanitizeText(form.get("whatsapp"), 40);
  const requirements = sanitizeText(form.get("requirements"), MAX_FIELD_LEN);
  const style = sanitizeText(form.get("style"), 150);
  const notes = sanitizeText(form.get("notes"), MAX_FIELD_LEN);

  // --- optional reference file ---
  let attachments: EmailAttachment[] | undefined;
  const file = form.get("referenceFile");
  if (file instanceof File && file.size > 0) {
    const validation = validateFile(file);
    if (!validation.ok) {
      return badRequest(validation.error);
    }
    // Held in memory only for the lifetime of this request — never written to disk,
    // never given a public URL. If the email can't be sent (no RESEND_API_KEY), the
    // file is simply discarded when this request ends; it is not stored anywhere.
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments = [{ filename: validation.safeName, content: buffer.toString("base64") }];
  }

  const requestId = generateRequestId();
  const submittedAt = new Date().toISOString();

  const emailLines = [
    `Request ID: ${requestId}`,
    `Submitted: ${submittedAt}`,
    ``,
    `Client: ${name}`,
    `Email: ${email}`,
    whatsapp ? `WhatsApp: ${whatsapp}` : null,
    ``,
    `Service: ${service.name}`,
    `Package: ${pkg.name}`,
    `Deadline: ${deadline}`,
    ``,
    `Description: ${description}`,
    style ? `Preferred Style: ${style}` : null,
    requirements ? `Requirements: ${requirements}` : null,
    notes ? `Additional Notes: ${notes}` : null,
    attachments ? `Reference file attached: ${attachments[0].filename}` : `No reference file attached.`,
  ].filter(Boolean);

  const [emailResult, whatsappResult] = await Promise.all([
    sendOwnerEmail({
      subject: `New Project Request - ${requestId}`,
      text: emailLines.join("\n"),
      replyTo: email,
      attachments,
    }),
    sendWhatsAppTemplateNotification([requestId, name, service.name, pkg.name, deadline]),
  ]);

  const notified = emailResult.sent || whatsappResult.sent;
  const emailConfigured = !emailResult.skipped;
  const whatsappConfigured = !whatsappResult.skipped;

  if (notified) {
    console.log("[project-request] received and notified", {
      requestId,
      service: service.slug,
      pkg: pkg.name,
      emailSent: emailResult.sent,
      whatsappSent: whatsappResult.sent,
      hadAttachment: Boolean(attachments),
    });
  } else if (emailConfigured || whatsappConfigured) {
    // At least one channel IS configured but the actual delivery attempt failed —
    // that's a real operational problem worth a loud server-side warning.
    console.error("[project-request] configured notification channel(s) failed to deliver", {
      requestId,
      emailError: emailResult.error,
      whatsappError: whatsappResult.error,
    });
  } else {
    // Nothing is configured at all. This is expected on a fresh deployment before
    // RESEND_API_KEY / WhatsApp credentials are set — not a runtime bug, so it does
    // NOT produce a hard error for the client. It's still logged so it's visible
    // during development.
    console.warn("[project-request] no notification channel is configured yet", { requestId });
  }

  // Validation passed and the request was fully processed — that is the true meaning
  // of "success" here. Whether it was actually delivered to a human is a separate,
  // honestly-reported fact (`notified`), not gated behind a scary error screen. This
  // matters most in exactly the situation you hit: a fresh deployment with no
  // RESEND_API_KEY / WhatsApp credentials set yet — previously that produced a hard
  // 502 on every single submission, which was the actual bug.
  return NextResponse.json({
    ok: true,
    requestId,
    notified,
    storagePersisted: false,
    email: { sent: emailResult.sent, skipped: emailResult.skipped ?? false },
    whatsapp: { sent: whatsappResult.sent, skipped: whatsappResult.skipped ?? false },
  });
}
