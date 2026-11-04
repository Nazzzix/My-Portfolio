import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// Input validation schema with zod
const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please provide your full name.').max(100),
  email: z.string().trim().email('Please enter a valid work email.').max(200),
  organisation: z.string().trim().min(1, 'Please provide your company or organisation.').max(150),
  opportunityType: z.enum([
    'Full-time Product Designer role',
    'Freelance or contract product design',
    'Graphic design project',
    'Branding project',
    'Social media design',
    'Other',
  ]),
  message: z
    .string()
    .trim()
    .min(15, 'Please provide a message with at least 15 characters.')
    .max(3000, 'Message cannot exceed 3,000 characters.'),
  honeypot: z.string().max(0, 'Spam trap triggered.'),
  timeMounted: z.number().optional(),
});

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

// Escape HTML characters to prevent XSS in email clients
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  try {
    // 1. Origin header check
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    if (origin && host) {
      const originHost = new URL(origin).host;
      if (originHost !== host && !originHost.includes('localhost')) {
        return NextResponse.json(
          { error: 'Cross-origin submission rejected.' },
          { status: 403 }
        );
      }
    }

    // 2. Simple IP rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    // 3. Body parsing and schema validation
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues?.[0]?.message || 'Validation error.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, organisation, opportunityType, message, timeMounted } = result.data;

    // 4. Minimum time-to-submit spam check (must take at least 2.5 seconds to fill form)
    if (timeMounted && Date.now() - timeMounted < 2500) {
      return NextResponse.json(
        { error: 'Submission rejected: Form was completed too quickly (automated spam check).' },
        { status: 400 }
      );
    }

    // 5. Subject safety: trim, collapse whitespace, strip line breaks, cap at 80 characters
    const safeName = name
      .replace(/[\r\n\t]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80);

    const emailSubject = `[Portfolio Enquiry - ${safeName}]`;

    // 6. Check Resend API configuration
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error(
        '[Contact API] RESEND_API_KEY is not defined in environment variables. Email cannot be dispatched.'
      );
      return NextResponse.json(
        {
          error:
            'The contact form service is currently not configured with an active API key. Please contact umeakukachinazor@gmail.com directly.',
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL || 'umeakukachinazor@gmail.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
    const sentAt = new Date().toUTCString();

    // Plain text content
    const textContent = `New Portfolio Inquiry Received:

Name: ${name}
Work Email: ${email}
Organisation: ${organisation}
Opportunity Type: ${opportunityType}
Timestamp: ${sentAt}

Message:
${message}
`;

    // HTML content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(emailSubject)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #16181D; background-color: #F6F3EE; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #DDD7CE; border-radius: 8px; padding: 32px;">
    <h2 style="font-size: 20px; font-weight: 600; color: #16181D; margin-top: 0; border-bottom: 2px solid #E4572E; padding-bottom: 12px;">
      Portfolio Inquiry from ${escapeHtml(name)}
    </h2>
    <table style="width: 100%; font-size: 14px; margin-bottom: 24px; border-collapse: collapse;">
      <tr>
        <td style="padding: 6px 0; color: #5E5A54; width: 140px;">Work Email:</td>
        <td style="padding: 6px 0; font-weight: 500;"><a href="mailto:${escapeHtml(email)}" style="color: #C2441F;">${escapeHtml(email)}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #5E5A54;">Organisation:</td>
        <td style="padding: 6px 0; font-weight: 500;">${escapeHtml(organisation)}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #5E5A54;">Opportunity Type:</td>
        <td style="padding: 6px 0; font-weight: 500;">${escapeHtml(opportunityType)}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #5E5A54;">Received At:</td>
        <td style="padding: 6px 0; color: #5E5A54;">${escapeHtml(sentAt)}</td>
      </tr>
    </table>
    <div style="background-color: #F6F3EE; border-left: 3px solid #16181D; padding: 16px; border-radius: 4px; font-size: 14px; white-space: pre-wrap; color: #16181D;">
${escapeHtml(message)}
    </div>
  </div>
</body>
</html>
`;

    // 7. Dispatch via Resend with visitor reply-to
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    if (resendError) {
      console.error('[Contact API] Resend email send failed:', resendError);
      return NextResponse.json(
        {
          error:
            'Unable to dispatch email through the notification service. Please contact directly at umeakukachinazor@gmail.com.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      id: resendData?.id,
      name,
      email,
    });
  } catch (err: unknown) {
    console.error('[Contact API] Unexpected error handling submission:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your inquiry.' },
      { status: 500 }
    );
  }
}
