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

function validateFields(data: Record<string, unknown>) {
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const subject = typeof data.subject === 'string' ? data.subject.trim() : 'General Inquiry';
  const message = typeof data.message === 'string' ? data.message.trim() : '';

  if (!name || !email || !message) {
    return { valid: false, error: 'Name, email, and message are required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }
  if (message.length > 5000) {
    return { valid: false, error: 'Message is too long.' };
  }
  return { valid: true, name, email, subject, message };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateFields(body);

    if (!validation.valid) {
      return Response.json({ success: false, error: (validation as { error: string }).error }, { status: 400 });
    }

    const { name, email, subject, message } = validation as { name: string; email: string; subject: string; message: string };

    // NOTE: Resend sandbox only allows sending to the account owner email.
    // Admin notifications are sent to misterjones.kj@gmail.com.
    // Auto-replies to customers are skipped until the domain is verified.
    const to = 'misterjones.kj@gmail.com';

    // If no Resend API key is set, return success so the site doesn't break
    const resend = getResend();
    if (!resend) {
      console.log('Contact form (no email service configured):', { name, email, subject, message });
      return Response.json({
        success: true,
        message: 'Message recorded. Configure RESEND_API_KEY in .env.local to enable email delivery.',
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'OceanaHemp <onboarding@resend.dev>',
      to: [to],
      replyTo: email,
      subject: `Contact: ${subject} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ success: false, error: 'Failed to send email. Please try again later.' }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
