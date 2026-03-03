import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

const recentRequests = new Map<string, number[]>();

function getClientId(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const times = recentRequests.get(clientId) ?? [];
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = times.filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  recentRequests.set(clientId, recent);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, website } = body as {
      name?: string;
      email?: string;
      message?: string;
      website?: string;
    };

    // Honeypot: se "website" vier preenchido, é provável bot
    if (website && String(website).trim().length > 0) {
      return NextResponse.json(
        { error: "invalid" },
        { status: 400 }
      );
    }

    const nameStr = name != null ? String(name).trim() : "";
    const emailStr = email != null ? String(email).trim() : "";
    const messageStr = message != null ? String(message).trim() : "";

    if (nameStr.length < 2) {
      return NextResponse.json(
        { error: "validation", field: "name" },
        { status: 400 }
      );
    }
    if (!EMAIL_REGEX.test(emailStr)) {
      return NextResponse.json(
        { error: "validation", field: "email" },
        { status: 400 }
      );
    }
    if (messageStr.length < 20) {
      return NextResponse.json(
        { error: "validation", field: "message" },
        { status: 400 }
      );
    }

    const clientId = getClientId(req);
    if (isRateLimited(clientId)) {
      return NextResponse.json(
        { error: "rate_limit" },
        { status: 429 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromRaw = (process.env.CONTACT_EMAIL_FROM ?? process.env.FROM_EMAIL ?? "").trim();
    const toEmail = process.env.CONTACT_EMAIL_TO;

    if (!apiKey || !fromRaw || !toEmail) {
      console.error("Contact API: missing RESEND_API_KEY, CONTACT_EMAIL_FROM (or FROM_EMAIL), or CONTACT_EMAIL_TO");
      return NextResponse.json(
        { error: "server_config" },
        { status: 500 }
      );
    }

    // Resend exige formato email@dominio ou "Nome <email@dominio>"; se for só domínio, usa noreply@dominio
    const fromEmail = fromRaw.includes("@")
      ? fromRaw.trim()
      : `noreply@${fromRaw.replace(/^@+/, "").trim()}`;

    if (!EMAIL_REGEX.test(fromEmail.replace(/^[^<]*<([^>]+)>$/, "$1"))) {
      const plain = fromEmail.replace(/^[^<]*<([^>]+)>$/, "$1").trim();
      if (!EMAIL_REGEX.test(plain)) {
        console.error("Contact API: CONTACT_EMAIL_FROM/FROM_EMAIL must be a full email (e.g. noreply@mail.gecesaas.com)");
        return NextResponse.json(
          { error: "server_config" },
          { status: 500 }
        );
      }
    }

    const resend = new Resend(apiKey);
    const subject = `Portifolio contact — ${nameStr}`;
    const text = `Name: ${nameStr}\nEmail: ${emailStr}\n\nMessage:\n${messageStr}`;
    const html = `
      <p><strong>Name:</strong> ${escapeHtml(nameStr)}</p>
      <p><strong>Email:</strong> ${escapeHtml(emailStr)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(messageStr)}</pre>
    `.trim();

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: emailStr,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "send_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "server_error" },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
