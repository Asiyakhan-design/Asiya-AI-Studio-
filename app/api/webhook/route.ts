import { NextRequest, NextResponse } from "next/server";

/**
 * Meta WhatsApp Cloud API webhook.
 *
 * STATUS: REQUIRES EXTERNAL CONFIGURATION.
 * This endpoint is ready to receive Meta's verification handshake and incoming events,
 * but nothing is "live" until you:
 *   1. Set WHATSAPP_VERIFY_TOKEN in your deployment's environment variables (a string you
 *      choose yourself — it is not issued by Meta).
 *   2. In Meta App Dashboard → WhatsApp → Configuration, set the Callback URL to
 *      https://<your-deployed-domain>/api/webhook and the Verify Token to the same value.
 *   3. Subscribe to the webhook fields you need (e.g. "messages").
 *
 * Until that's done, this route simply exists and responds correctly to verification
 * pings — it does not send or receive real WhatsApp traffic.
 *
 * SECURITY NOTES:
 *   - No access token, API secret, or verify token value is ever logged or returned in a
 *     response body — only whether verification succeeded or failed.
 *   - POST logging is limited to non-sensitive shape/metadata (object type, entry count,
 *     change field names, timestamp). Message content, phone numbers, contact names, and
 *     media/media IDs are intentionally NOT logged here. Wire your own storage/processing
 *     below once you're ready, and apply the same care there.
 */

// Meta expects a fast 200 on every POST, and will retry/disable the webhook if it doesn't
// get one — do not perform slow work before responding.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (!verifyToken) {
    // Fails closed: if the server has no configured token, verification cannot succeed.
    console.warn("[webhook] WHATSAPP_VERIFY_TOKEN is not set — verification requests will be rejected.");
    return new NextResponse("Webhook not configured", { status: 403 });
  }

  if (mode === "subscribe" && token === verifyToken && challenge) {
    // Meta requires the raw challenge string echoed back, as plain text, with 200.
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// Minimal shape checks for a Meta WhatsApp Cloud API payload — enough to avoid crashing
// on malformed/unexpected input without trying to fully validate business logic here.
function isPlausibleWhatsAppPayload(body: unknown): body is {
  object?: string;
  entry?: Array<{ id?: string; changes?: Array<{ field?: string; value?: unknown }> }>;
} {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (typeof b.object !== "string") return false;
  if (!Array.isArray(b.entry)) return false;
  return true;
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    // Malformed JSON — acknowledge with 200 so Meta doesn't retry a request that will
    // never parse, but don't process it further.
    console.warn("[webhook] Received POST with invalid JSON body.");
    return NextResponse.json({ received: true }, { status: 200 });
  }

  if (!isPlausibleWhatsAppPayload(body)) {
    console.warn("[webhook] Received POST with unexpected payload shape.");
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // Safe, non-sensitive summary only — never log message text, phone numbers, names,
  // media IDs, or any token/credential.
  const changeFields = body.entry
    ?.flatMap((entry) => entry.changes?.map((c) => c.field) ?? [])
    .filter(Boolean);

  console.log("[webhook] event received", {
    object: body.object,
    entryCount: body.entry?.length ?? 0,
    changeFields,
    receivedAt: new Date().toISOString(),
  });

  // REQUIRES EXTERNAL CONFIGURATION / IMPLEMENTATION:
  // This is the integration point for actually acting on incoming events — e.g. verifying
  // the payload signature against META_APP_SECRET (X-Hub-Signature-256 header), then
  // queueing/storing the event or notifying your team. None of that exists yet; add it
  // deliberately once you're ready to process real messages, and keep any secret
  // comparison using a timing-safe check server-side only.
  //
  // Example (not wired up):
  // const signature = request.headers.get("x-hub-signature-256");
  // verifySignature(rawBody, signature, process.env.WHATSAPP_APP_SECRET);

  // Always acknowledge quickly with 200, even if downstream processing is deferred.
  return NextResponse.json({ received: true }, { status: 200 });
}
