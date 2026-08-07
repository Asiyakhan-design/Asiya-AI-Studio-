import { BUSINESS_EMAIL, WHATSAPP_NUMBER } from "@/lib/data";

/**
 * Server-only helpers for the project-request notification pipeline.
 * Import this ONLY from app/api/** route handlers — never from a "use client" component.
 */

export type ProjectRequestPayload = {
  requestId: string;
  submittedAt: string;
  name: string;
  brandName?: string;
  email: string;
  whatsapp?: string;
  country?: string;
  city?: string;
  service: string;
  serviceName: string;
  pkg: string;
  projectTitle?: string;
  description: string;
  brandDescription?: string;
  audience?: string;
  mainGoal?: string;
  style?: string;
  tone?: string;
  deadline?: string;
  preferredDeliveryDate?: string;
  requirements?: string;
  notes?: string;
  importantLinks?: string;
};

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
 * Generates a request ID in the AAS-YYYY-NNNN format.
 *
 * HONESTY NOTE: without a database, this cannot guarantee global uniqueness — it's a
 * random 4-digit suffix, not a sequence. Collisions are unlikely but possible. Once a
 * real database is connected (see DATABASE_URL in .env.example), replace this with a
 * DB-enforced unique sequence/UUID and treat any collision as a hard error.
 */
export function generateRequestId(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(1000 + Math.random() * 9000);
  return `AAS-${year}-${n}`;
}

/* ------------------------------- rate limiting ------------------------------- */

/**
 * Best-effort in-memory rate limiter.
 *
 * HONESTY NOTE: this only limits requests within a single warm serverless instance.
 * On Vercel, concurrent/cold-started instances each get their own memory, so this is
 * NOT a reliable global rate limit — it only blocks obvious rapid-fire abuse from the
 * same instance. For real protection, put this behind Vercel's built-in abuse
 * protections or a dedicated service (e.g. Upstash Ratelimit, Cloudflare).
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

/* ------------------------------- email notification ------------------------------- */

export async function sendBusinessEmail(
  payload: ProjectRequestPayload
): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BUSINESS_EMAIL || BUSINESS_EMAIL;

  if (!apiKey) {
    return { sent: false, skipped: true, error: "RESEND_API_KEY not configured" };
  }

  const lines = [
    `Request ID: ${payload.requestId}`,
    `Submitted: ${payload.submittedAt}`,
    ``,
    `Client: ${payload.name}`,
    payload.brandName ? `Business/Brand: ${payload.brandName}` : null,
    `Email: ${payload.email}`,
    payload.whatsapp ? `WhatsApp: ${payload.whatsapp}` : null,
    payload.country ? `Country: ${payload.country}` : null,
    payload.city ? `City/Region: ${payload.city}` : null,
    ``,
    `Service: ${payload.serviceName}`,
    `Package: ${payload.pkg}`,
    payload.projectTitle ? `Project Title: ${payload.projectTitle}` : null,
    `Deadline: ${payload.deadline || "Not specified"}`,
    payload.preferredDeliveryDate ? `Preferred Delivery Date: ${payload.preferredDeliveryDate}` : null,
    ``,
    `Description: ${payload.description}`,
    payload.brandDescription ? `Business Description: ${payload.brandDescription}` : null,
    payload.audience ? `Target Audience: ${payload.audience}` : null,
    payload.mainGoal ? `Main Goal: ${payload.mainGoal}` : null,
    payload.style ? `Preferred Style: ${payload.style}` : null,
    payload.tone ? `Preferred Tone: ${payload.tone}` : null,
    payload.importantLinks ? `Important Links: ${payload.importantLinks}` : null,
    payload.requirements ? `Requirements: ${payload.requirements}` : null,
    payload.notes ? `Additional Notes: ${payload.notes}` : null,
  ].filter(Boolean);

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
        reply_to: payload.email,
        subject: `New Project Request - ${payload.requestId}`,
        text: lines.join("\n"),
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

/* ------------------------------- WhatsApp notification ------------------------------- */

export async function sendWhatsAppNotification(
  payload: ProjectRequestPayload
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
        "WhatsApp Cloud API not configured (requires WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, and an approved WHATSAPP_TEMPLATE_NAME in Meta Business Manager)",
    };
  }

  // Business-initiated notifications outside a 24h customer session require an
  // approved Meta message template — a free-text message is not permitted here.
  // The template must already be approved in Meta Business Manager; this only
  // fills in its variables. Adjust the parameter list to match your template.
  try {
    const res = await fetch(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
      {
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
                parameters: [
                  { type: "text", text: payload.requestId },
                  { type: "text", text: payload.name },
                  { type: "text", text: payload.serviceName },
                  { type: "text", text: payload.pkg },
                  { type: "text", text: payload.deadline || "Not specified" },
                ],
              },
            ],
          },
        }),
      }
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { sent: false, error: `WhatsApp Cloud API responded ${res.status}: ${body.slice(0, 200)}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : "Unknown WhatsApp error" };
  }
}
