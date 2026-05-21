import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // If no Resend API key is set, return success so the site doesn't break
    // This allows testing the form without a real email provider
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_YOUR_RESEND_API_KEY_HERE') {
      console.log('Newsletter signup (no email service configured):', email);
      return Response.json({
        success: true,
        message: 'Signup recorded. Configure RESEND_API_KEY in .env.local to enable email delivery.',
      });
    }

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: 'OceanaHemp <hello@oceanahemp.com>',
      to: [email],
      subject: 'Welcome to the OceanaHemp Inner Circle',
      text: `Welcome to the OceanaHemp family!\n\nYou have joined our Inner Circle. You will be the first to hear about:\n\n- New product drops\n- Exclusive subscriber-only offers\n- Holistic wellness tips and CBD education\n- Behind-the-scenes stories from our lab and farm\n\nWarm regards,\nThe OceanaHemp Team\nhello@oceanahemp.com`,
      html: `
        <h2>Welcome to the OceanaHemp Family</h2>
        <p>You have joined our Inner Circle. You will be the first to hear about:</p>
        <ul>
          <li>New product drops</li>
          <li>Exclusive subscriber-only offers</li>
          <li>Holistic wellness tips and CBD education</li>
          <li>Behind-the-scenes stories from our lab and farm</li>
        </ul>
        <p>Warm regards,<br/>The OceanaHemp Team<br/><a href="mailto:hello@oceanahemp.com">hello@oceanahemp.com</a></p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ success: false, error: 'Failed to send welcome email. Please try again later.' }, { status: 500 });
    }

    // Also notify admin
    try {
      await resend.emails.send({
        from: 'OceanaHemp <hello@oceanahemp.com>',
        to: [process.env.CONTACT_EMAIL || 'hello@oceanahemp.com'],
        subject: 'New Newsletter Subscriber',
        text: `New subscriber: ${email}`,
        html: `<h2>New Newsletter Subscriber</h2><p><strong>Email:</strong> ${email}</p>`,
      });
    } catch (adminErr) {
      console.error('Admin notification failed:', adminErr);
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Newsletter API error:', err);
    return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
