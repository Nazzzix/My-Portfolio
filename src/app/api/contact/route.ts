import { NextResponse } from "next/server";
import { Resend } from "resend";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// In-memory rate limiting (per IP, max 5 submissions per 10 minutes)
const ipRateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 5;

  const timestamps = (ipRateLimitMap.get(ip) || []).filter((time) => now - time < windowMs);
  if (timestamps.length >= maxRequests) {
    return true;
  }
  timestamps.push(now);
  ipRateLimitMap.set(ip, timestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    // Same-origin check
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host) {
      const originHost = new URL(origin).host;
      if (originHost !== host && !originHost.includes("localhost")) {
        return NextResponse.json({ error: "Cross-origin submission rejected." }, { status: 403 });
      }
    }

    // Rate limit before doing any work
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      company,
      opportunity,
      message,
      website,
      organisation,
      opportunityType,
      honeypot,
    } = body;

    // Accept the current field names and the previous ones.
    const organisationValue = company ?? organisation;
    const opportunityValue = opportunity ?? opportunityType;
    const honeypotValue = website ?? honeypot;

    // Honeypot: real people leave this hidden field empty
    if (honeypotValue) {
      return NextResponse.json({ ok: true });
    }

    // Server-side validation
    if (!name || !email || !organisationValue || !opportunityValue || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof organisationValue !== "string" ||
      typeof opportunityValue !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 200 || organisationValue.length > 150) {
      return NextResponse.json(
        { error: "One of the fields is too long." },
        { status: 400 }
      );
    }

    if (message.length > 3000) {
      return NextResponse.json(
        { error: "Your message is too long." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      console.error(
        "[Contact API] RESEND_API_KEY or CONTACT_TO_EMAIL is not defined in environment variables."
      );
      return NextResponse.json(
        {
          error:
            "The contact form is not configured. Please email umeakukachinazor@gmail.com directly.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "Nazor Portfolio <onboarding@resend.dev>";

    const safeName = name
      .replace(/[\r\n\t]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80);
    const safeOpportunity = opportunityValue
      .replace(/[\r\n\t]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New inquiry: ${safeOpportunity} from ${safeName}`,
      html: `
        <h2>New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Organisation:</strong> ${escapeHtml(organisationValue)}</p>
        <p><strong>Opportunity:</strong> ${escapeHtml(opportunityValue)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Something went wrong sending your message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
