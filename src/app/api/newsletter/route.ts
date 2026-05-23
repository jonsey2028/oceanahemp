import { Resend } from 'resend';

export const runtime = 'nodejs';

let resend: Resend | null = null;
function getResend(): Resend | null {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key || key === 're_YOUR_RESEND_API_KEY_HERE') return null;
    resend = new Resend(key);
  }
  return resend;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // If no Resend API key is set, return success so the site doesn't break
    // This allows testing the form without a real email provider
    const resend = getResend();
    if (!resend) {
      console.log('Newsletter signup (no email service configured):', email);
      return Response.json({
        success: true,
        message: 'Signup recorded. Configure RESEND_API_KEY in .env.local to enable email delivery.',
      });
    }

    // NOTE: Resend sandbox only allows sending to the account owner email.
    // Skip customer welcome email. Only notify admin.
    try {
      await resend.emails.send({
        from: 'OceanaHemp \u003conboarding@resend.dev\u003e',
        to: ['misterjones.kj@gmail.com'],
        subject: 'New Newsletter Subscriber',
        text: `New subscriber: ${email}`,
        html: `\u003ch2\u003eNew Newsletter Subscriber\u003c/h2\u003e\u003cp\u003e\u003cstrong\u003eEmail:\u003c/strong\u003e ${email}\u003c/p\u003e`,
      });
    } catch (err) {
      console.error('Admin notification failed:', err);
      return Response.json({ success: false, error: 'Failed to record signup. Please try again later.' }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('Newsletter API error:', err);
    return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
