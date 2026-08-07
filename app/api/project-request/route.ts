import { NextRequest, NextResponse } from "next/server";
import { services } from "@/lib/data";
import {
  sanitizeText,
  generateRequestId,
  isRateLimited,
  sendBusinessEmail,
  sendWhatsAppNotification,
  type ProjectRequestPayload,
} from "@/lib/server/notifications";

export const dynamic = "force-dynamic";

const MAX_FIELD_LEN = 3000;

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(request: NextRequest) {
  // --- best-effort anti-spam: rate limit + honeypot ---
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes, or contact us on WhatsApp." },
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

  // Honeypot: a hidden field real users never fill in. If present, silently "succeed"
  // without doing any real work, so bots don't learn their submission was rejected.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, requestId: generateRequestId(), email: { sent: false, skipped: true }, whatsapp: { sent: false, skipped: true } });
  }

  // --- server-side validation (never trust client-side validation alone) ---
  const service = services.find((s) => s.slug === body.service);
  if (!service) return badRequest("Please choose a valid service.");

  const pkgRaw = sanitizeText(body.pkg, 40).toLowerCase();
  const pkg = service.packages.find((p) => p.name.toLowerCase() === pkgRaw);
  if (!pkg) return badRequest("Please choose a valid package.");

  const name = sanitizeText(body.name, 120);
  if (!name) return badRequest("Full name is required.");

  const email = sanitizeText(body.email, 200);
  if (!/^\S+@\S+\.\S+$/.test(email)) return badRequest("A valid email is required.");

  const description = sanitizeText(body.description, MAX_FIELD_LEN);
  if (description.length < 15) return badRequest("Project description must be at least 15 characters.");

  const deadline = sanitizeText(body.deadline, 40);
  if (!deadline) return badRequest("A preferred deadline is required.");

  const payload: ProjectRequestPayload = {
    requestId: generateRequestId(),
    submittedAt: new Date().toISOString(),
    name,
    brandName: sanitizeText(body.brandName, 150) || undefined,
    email,
    whatsapp: sanitizeText(body.whatsapp, 40) || undefined,
    country: sanitizeText(body.country, 80) || undefined,
    city: sanitizeText(body.city, 80) || undefined,
    service: service.slug,
    serviceName: service.name,
    pkg: pkg.name,
    projectTitle: sanitizeText(body.projectTitle, 150) || undefined,
    description,
    brandDescription: sanitizeText(body.brandDescription, MAX_FIELD_LEN) || undefined,
    audience: sanitizeText(body.audience, 300) || undefined,
    mainGoal: sanitizeText(body.mainGoal, 300) || undefined,
    style: sanitizeText(body.style, 150) || undefined,
    tone: sanitizeText(body.tone, 150) || undefined,
    deadline,
    preferredDeliveryDate: sanitizeText(body.preferredDeliveryDate, 40) || undefined,
    requirements: sanitizeText(body.requirements, MAX_FIELD_LEN) || undefined,
    notes: sanitizeText(body.notes, MAX_FIELD_LEN) || undefined,
    importantLinks: sanitizeText(body.importantLinks, 500) || undefined,
  };

  // STORAGE: no database is connected yet (see DATABASE_URL in .env.example). This
  // request is NOT persisted anywhere — if both notifications below fail, it only
  // exists in this one HTTP response. That is surfaced honestly in the response body
  // rather than silently claiming the request was "saved".
  const storagePersisted = false;

  // Fire both notification channels independently — one failing must not hide the
  // other succeeding, and neither failing should make up a fake success.
  const [emailResult, whatsappResult] = await Promise.all([
    sendBusinessEmail(payload),
    sendWhatsAppNotification(payload),
  ]);

  if (!emailResult.sent && !whatsappResult.sent && !storagePersisted) {
    // Nothing actually captured this request anywhere durable. Tell the truth: the
    // client needs to also reach out directly so it isn't silently lost.
    console.error("[project-request] request could not be delivered or stored", {
      requestId: payload.requestId,
      emailError: emailResult.error,
      whatsappError: whatsappResult.error,
    });
    return NextResponse.json(
      {
        ok: false,
        requestId: payload.requestId,
        error:
          "We could not deliver or store your request right now. Please contact us directly on WhatsApp or email so nothing is lost.",
        email: emailResult,
        whatsapp: whatsappResult,
      },
      { status: 502 }
    );
  }

  console.log("[project-request] received", {
    requestId: payload.requestId,
    service: payload.service,
    pkg: payload.pkg,
    emailSent: emailResult.sent,
    whatsappSent: whatsappResult.sent,
  });

  return NextResponse.json({
    ok: true,
    requestId: payload.requestId,
    storagePersisted,
    email: emailResult,
    whatsapp: whatsappResult,
  });
}
