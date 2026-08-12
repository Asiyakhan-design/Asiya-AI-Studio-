import { NextRequest, NextResponse } from "next/server";
import {
  sanitizeText,
  isRateLimited,
  sendOwnerEmail,
  sendWhatsAppTemplateNotification,
} from "@/lib/server/notifications";

export const dynamic = "force-dynamic";

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly, or contact us on WhatsApp." },
      { status: 429 }
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return badRequest("Invalid request body.");
  }
  if (!raw || typeof raw !== "object") return badRequest("Invalid request body.");
  const body = raw as Record<string, unknown>;

  // Honeypot: real users never fill this hidden field in.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, notified: false });
  }

  const name = sanitizeText(body.name, 120);
  if (!name) return badRequest("Full name is required.");

  const email = sanitizeText(body.email, 200);
  if (!/^\S+@\S+\.\S+$/.test(email)) return badRequest("A valid email is required.");

  const whatsapp = sanitizeText(body.whatsapp, 40);
  const subject = sanitizeText(body.subject, 200);
  if (!subject) return badRequest("Subject is required.");

  const message = sanitizeText(body.message, 4000);
  if (message.length < 10) return badRequest("Message must be at least 10 characters.");

  const submittedAt = new Date().toISOString();

  const emailText = [
    `New contact form message — Asiya AI Studio`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    whatsapp ? `WhatsApp: ${whatsapp}` : null,
    `Subject: ${subject}`,
    `Submitted: ${submittedAt}`,
    ``,
    `Message:`,
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const [emailResult, whatsappResult] = await Promise.all([
    sendOwnerEmail({ subject: `New Contact Message — ${subject}`, text: emailText, replyTo: email }),
    sendWhatsAppTemplateNotification([name, subject, email]),
  ]);

  const notified = emailResult.sent || whatsappResult.sent;

  // Actual delivery attempts (not "not configured") that failed are worth surfacing
  // to the server logs for the owner to notice — but not as a scary user-facing error,
  // since the message text itself is still visible right here in the logs either way.
  if (!notified) {
    console.warn("[contact] no notification channel delivered this message", {
      configured: { email: !emailResult.skipped, whatsapp: !whatsappResult.skipped },
      emailError: emailResult.error,
      whatsappError: whatsappResult.error,
      submittedAt,
    });
  } else {
    console.log("[contact] message notified", {
      emailSent: emailResult.sent,
      whatsappSent: whatsappResult.sent,
      submittedAt,
    });
  }

  // IMPORTANT: this message is not stored anywhere else. If neither channel above
  // delivered it, it only ever existed in this one request/response — surfaced
  // honestly via `notified` so the frontend can tell the user to also reach out
  // directly, rather than claiming a clean success.
  return NextResponse.json({
    ok: true,
    notified,
    email: { sent: emailResult.sent, skipped: Boolean(emailResult.skipped) },
    whatsapp: { sent: whatsappResult.sent, skipped: Boolean(whatsappResult.skipped) },
  });
}
