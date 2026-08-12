# Security Self-Audit — Asiya AI Studio

This is a working checklist, not a certification. It reflects what was actually
reviewed and implemented as of this pass, and is honest about what still depends on
external configuration or hasn't been tested against real traffic. **Nothing here
claims the site is "hack-proof" — there is no such thing.**

## Forms & API routes

| Area | Status | Notes |
|---|---|---|
| Server-side validation | ✅ | `app/api/contact/route.ts` and `app/api/project-request/route.ts` both re-validate every field — client-side validation is UX only, never trusted alone |
| Input sanitization | ✅ | `sanitizeText()` in `lib/server/notifications.ts` strips HTML tags and control characters, caps length, on every text field |
| Honeypot anti-spam | ✅ | Both forms include a hidden `website` field; a filled value is treated as a bot and silently no-op'd (no error revealed to the bot) |
| Rate limiting | ⚠️ Partial | `isRateLimited()` is in-memory, per warm serverless instance — real protection at scale needs a shared store (e.g. Upstash Ratelimit) or your host's abuse protection. Documented as a known limitation, not hidden. |
| CSRF | ⚠️ Not implemented | Both routes are same-origin JSON/FormData POSTs with no cookie-based session to forge, which limits classic CSRF risk, but no explicit token check exists. Low priority given there's no authenticated session, but worth adding if that changes. |
| File upload validation | ✅ | `validateFile()` checks MIME type against an allow-list, cross-checks the file extension, enforces an 8MB size cap, and generates a random server-side filename. Client also pre-checks type/size for UX, but the server check is what's actually trusted. |
| Executable/dangerous file protection | ✅ | Only PDF/JPG/JPEG/PNG/WEBP/DOC/DOCX are accepted; nothing else passes the allow-list. No `.zip`, `.exe`, `.js`, `.html`, etc. |
| Path traversal protection | ✅ | Uploaded filenames are never used for storage paths — a random name is generated instead, and the file itself is never written to disk at all (see below) |
| Request size limits | ⚠️ Partial | The 8MB cap is enforced in application code after the file is read; there's no platform-level request size limit configured. Most serverless hosts (Vercel included) impose their own body-size ceiling regardless, but confirm your specific host's limit. |
| Secrets never sent to the browser | ✅ | `RESEND_API_KEY`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_APP_SECRET`, `WHATSAPP_VERIFY_TOKEN` are only read via `process.env` inside server-only files (`app/api/**/route.ts`, `lib/server/*.ts`) — never imported into a `"use client"` component |
| Secrets never logged | ✅ | Server logs (`console.log`/`console.warn`/`console.error`) only include request IDs, service/package names, and boolean/error-message metadata — never token values, never full client message content in error logs |
| No sensitive data to analytics | ✅ | `trackEvent()` calls after form submission only ever pass `service`, `pkg`, and `requestId` — never name, email, WhatsApp number, or message/description text |

## Data storage

- **No database.** By design (per explicit instruction) — nothing is persisted. A submitted request/message exists only for the lifetime of the HTTP request that processes it.
- **Uploaded files are never written to disk.** They're read into memory, validated, base64-encoded, attached directly to the outbound notification email, and then go out of scope. No public upload folder exists.
- **Consequence, stated plainly:** if a request comes in while `RESEND_API_KEY` and the WhatsApp credentials are both unset (or both fail), that submission is not recoverable — it was never stored anywhere. The API response says so (`notified: false`) rather than hiding it.

## HTTP security headers (`next.config.mjs`)

| Header | Set to | Why |
|---|---|---|
| `Content-Security-Policy` | restrictive, `'self'` by default | Limits script/style/font/connect sources to this origin plus Google Tag Manager/Analytics (only relevant once `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set) |
| `X-Content-Type-Options` | `nosniff` | Stops browsers from MIME-sniffing responses |
| `X-Frame-Options` | `DENY` | Prevents this site from being framed (clickjacking protection) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Avoids leaking full URLs to third-party origins |
| `Permissions-Policy` | camera/microphone/geolocation all disabled | None of these are used by the site |

**Known CSP compromise:** `script-src` includes `'unsafe-inline'`, required because the Google Analytics initialization script (`components/Analytics.tsx`) is an inline `<Script>` block. A stricter setup would use a per-request nonce via middleware — not implemented here to avoid adding middleware complexity for a feature (GA) that's optional and off by default. If GA is not configured, tighten this line.

## What genuinely still needs external configuration

None of the following are faked — they simply don't do anything until configured:

- Real email delivery → `RESEND_API_KEY` (Resend account)
- Real WhatsApp business notifications → `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TEMPLATE_NAME` (Meta Developer App + an **approved** message template)
- Persistent storage of any kind → `DATABASE_URL` (nothing wired to it yet even if set)
- Distributed rate limiting → not configured; current limiter is best-effort only
- CSP nonce-based script hardening → not implemented

## Before deploying to production

- [ ] Set real values for `RESEND_API_KEY` / `RESEND_FROM_EMAIL` if you want email notifications to actually work
- [ ] Set up and get Meta to approve a WhatsApp message template if you want WhatsApp business notifications
- [ ] Confirm your hosting platform's own request-size and abuse-protection settings (don't rely on this app alone)
- [ ] Re-run this checklist after any change to `app/api/**` or `lib/server/**`
