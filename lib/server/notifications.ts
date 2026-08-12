import { BUSINESS_EMAIL, WHATSAPP_NUMBER } from "@/lib/data";

/**
 * Server-only helpers. Import ONLY from app/api/** route handlers — never from a
 * "use client" component.
 */

/* ------------------------------- sanitization ------------------------------- */

export function sanitizeText(input: unknown, maxLen = 2000): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "") // strip control chars
    .trim()
    .slice(0, maxLen);
}

/* ------------------------------- request ID ------------------------------- */

/**
 * HONESTY NOTE: without a database this cannot guarantee global uniqueness — it's a
 * random 4-digit suffix, not a sequence. Once a real database is connected, replace
 * this with a DB-enforced unique sequence/UUID.
 */
export function generateRequestId(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(1000 + Math.random() * 9000);
  return `AAS-${year}-${n}`;
}

/* ------------------------------- rate limiting ------------------------------- */

/**
 * Best-effort in-memory rate limiter, keyed by caller-supplied string (e.g. `ip:contact`).
 *
 * HONESTY NOTE: this only limits requests within a single warm serverless instance —
 * on Vercel it is NOT a reliable global rate limit. For real protection at scale, use
 * a shared store (e.g. Upstash Ratelimit) or your host's built-in abuse protection.
 */
const submissionLog = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(key, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

/* ------------------------------- file validation ------------------------------- */

export const ALLOWED_FILE_TYPES: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};
export const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB

export type FileValidationResult =
  | { ok: true; safeName: string }
  | { ok: false; error: string };

/**
 * Validates a File's declared MIME type + extension + size. This is defense-in-depth,
 * not a guarantee — the browser can lie about MIME type, so anything accepted here is
 * still only ever used as an email attachment, never executed, never written to a
 * public path, and never persisted to disk.
 */
export function validateFile(file: File): FileValidationResult {
  if (file.size > MAX_FILE_BYTES) {
    return { ok: false, error: `File is too large (max ${MAX_FILE_BYTES / (1024 * 1024)}MB).` };
  }
  const allowedExts = ALLOWED_FILE_TYPES[file.type];
  if (!allowedExts) {
    return { ok: false, error: "Unsupported file type. Allowed: PDF, JPG, PNG, WEBP, DOC, DOCX." };
  }
  const originalName = file.name || "reference";
  const ext = "." + (originalName.split(".").pop() || "").toLowerCase();
  if (!allowedExts.includes(ext)) {
    return { ok: false, error: "File extension doesn't match its type." };
  }
  // Randomized, sanitized filename — never trust the client-supplied name for storage
  // or for the attachment filename shown downstream. No path separators possible.
  const safeName = `reference-${Date.now()}-${Math.floor(Math.random() * 1e6)}${ext}`;
  return { ok: true, safeName };
}

/* ------------------------------- generic email sender ------------------------------- */

export type EmailAttachment = { filename: string; content: string /* base64 */ };

export async function sendOwnerEmail(opts: {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BUSINESS_EMAIL || BUSINESS_EMAIL;

  if (!apiKey) {
    return { sent: false, skipped: true, error: "RESEND_API_KEY not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Asiya AI Studio <onboarding@resend.dev>",
        to: [to],
        reply_to: opts.replyTo,
        subject: opts.subject,
        text: opts.text,
        attachments: opts.attachments,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { sent: false, error: `Resend API responded ${res.status}: ${body.slice(0, 200)}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : "Unknown email error" };
  }
}

/* ------------------------------- WhatsApp template notification ------------------------------- */

/**
 * Sends a business-notification WhatsApp message via Meta's Cloud API using an
 * APPROVED message template (Meta does not allow free-text business-initiated
 * messages outside a customer's 24h session window). `params` are filled into the
 * template's body variables in order — adjust to match your approved template.
 */
export async function sendWhatsAppTemplateNotification(
  params: string[]
): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION || "v20.0";
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const notifyNumber = (process.env.WHATSAPP_NOTIFY_NUMBER || WHATSAPP_NUMBER).replace(/\D/g, "");

  if (!token || !phoneNumberId || !templateName) {
    return {
      sent: false,
      skipped: true,
      error:
        "WhatsApp Cloud API not configured (requires WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, and an approved WHATSAPP_TEMPLATE_NAME)",
    };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: notifyNumber,
        type: "template",
        template: {
          name: templateName,
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: params.map((text) => ({ type: "text", text })),
            },
          ],
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { sent: false, error: `WhatsApp Cloud API responded ${res.status}: ${body.slice(0, 200)}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : "Unknown WhatsApp error" };
  }
}
