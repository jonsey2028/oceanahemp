import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const to = process.env.CONTACT_EMAIL || 'hello@oceanahemp.com';

    const { data, error } = await resend.emails.send({
      from: 'OceanaHemp <hello@oceanahemp.com>',
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

    // Send auto-reply to the user
    try {
      await resend.emails.send({
        from: 'OceanaHemp <hello@oceanahemp.com>',
        to: [email],
        subject: 'We received your message — OceanaHemp',
        text: `Hi ${name},\n\nThanks for reaching out to OceanaHemp! We have received your message about "${subject}" and will get back to you within 24 hours.\n\nWarm regards,\nThe OceanaHemp Team\nhello@oceanahemp.com`,
        html: `
          <p>Hi ${name},</p>
          <p>Thanks for reaching out to OceanaHemp! We have received your message about "<strong>${subject}</strong>" and will get back to you within 24 hours.</p>
          <p>Warm regards,<br/>The OceanaHemp Team<br/><a href="mailto:hello@oceanahemp.com">hello@oceanahemp.com</a></p>
        `,
      });
    } catch (autoReplyErr) {
      // Auto-reply failure should not break the main response
      console.error('Auto-reply failed:', autoReplyErr);
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
