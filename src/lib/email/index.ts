import { Resend } from 'resend';

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key || key.includes('YOUR_RESEND')) return null;
    resend = new Resend(key);
  }
  return resend;
}

export interface EmailPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<{ id?: string; error?: string }> {
  const client = getResend();
  if (!client) return { error: 'Resend not configured' };

  try {
    const result = await client.emails.send(payload);
    return { id: result.data?.id };
  } catch (err: any) {
    const msg = err.message ?? '';
    // Resend sandbox rejects non-owner recipients; retry with owner-only
    if (msg.includes('You can only send testing emails')) {
      const owner = getAdminEmail();
      const sandboxPayload = { ...payload, to: [owner] };
      try {
        const fallbackResult = await client.emails.send(sandboxPayload);
        return { id: fallbackResult.data?.id };
      } catch (innerErr: any) {
        return { error: innerErr.message ?? 'Sandbox fallback failed' };
      }
    }
    return { error: msg || 'Send failed' };
  }
}

export function getFromAddress(): string {
  const customDomain = 'hello@oceanahemp.com';
  const fallback = 'onboarding@resend.dev';
  return process.env.FROM_EMAIL || customDomain;
}

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || 'misterjones.kj@gmail.com';
}

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAIL || 'misterjones.kj@gmail.com';
  return raw.split(',').map(e => e.trim()).filter(Boolean);
}
