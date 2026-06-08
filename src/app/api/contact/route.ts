import { sendEmail, getFromAddress, getAdminEmails } from '@/lib/email';

export const runtime = 'nodejs';

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

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `;

    const result = await sendEmail({
      from: getFromAddress(),
      to: getAdminEmails(),
      subject: `Contact: ${subject} from ${name}`,
      html,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    if (result.error) {
      console.error('Contact email error:', result.error);
      return Response.json({ success: false, error: 'Failed to send email. Please try again later.' }, { status: 500 });
    }

    return Response.json({ success: true, id: result.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
