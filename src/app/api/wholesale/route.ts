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
  const businessName = typeof data.businessName === 'string' ? data.businessName.trim() : '';
  const contactName = typeof data.contactName === 'string' ? data.contactName.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const phone = typeof data.phone === 'string' ? data.phone.trim() : '';
  const businessType = typeof data.businessType === 'string' ? data.businessType.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  const address = typeof data.address === 'string' ? data.address.trim() : '';
  const city = typeof data.city === 'string' ? data.city.trim() : '';
  const state = typeof data.state === 'string' ? data.state.trim() : '';
  const zip = typeof data.zip === 'string' ? data.zip.trim() : '';
  const website = typeof data.website === 'string' ? data.website.trim() : '';
  const ein = typeof data.ein === 'string' ? data.ein.trim() : '';
  const resaleLicense = typeof data.resaleLicense === 'string' ? data.resaleLicense.trim() : '';
  const productsInterest = typeof data.productsInterest === 'string' ? data.productsInterest.trim() : '';

  if (!businessName || !contactName || !email || !phone) {
    return { valid: false, error: 'Business name, contact name, email, and phone are required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }
  if (message.length > 5000) {
    return { valid: false, error: 'Message is too long.' };
  }
  return { valid: true, businessName, contactName, email, phone, businessType, message, address, city, state, zip, website, ein, resaleLicense, productsInterest };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateFields(body);

    if (!validation.valid) {
      return Response.json({ success: false, error: (validation as { error: string }).error }, { status: 400 });
    }

    const fields = validation as { businessName: string; contactName: string; email: string; phone: string; businessType: string; message: string; address: string; city: string; state: string; zip: string; website: string; ein: string; resaleLicense: string; productsInterest: string };

    const to = process.env.WHOLESALE_EMAIL || 'wholesale@oceanahemp.com';

    // If no Resend API key is set, return success so the site doesn't break
    const resend = getResend();
    if (!resend) {
      console.log('Wholesale form (no email service configured):', { businessName: fields.businessName, contactName: fields.contactName, email: fields.email });
      return Response.json({
        success: true,
        message: 'Application recorded. Configure RESEND_API_KEY in .env.local to enable email delivery.',
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'OceanaHemp Wholesale <onboarding@resend.dev>',
      to: [to],
      replyTo: fields.email,
      subject: `Wholesale Application: ${fields.businessName}`,
      text: `Business: ${fields.businessName}
Contact: ${fields.contactName}
Email: ${fields.email}
Phone: ${fields.phone}
Business Type: ${fields.businessType}
Website: ${fields.website || 'N/A'}
EIN: ${fields.ein || 'N/A'}
Address: ${fields.address || ''}, ${fields.city || ''}, ${fields.state || ''} ${fields.zip || ''}
Resale License: ${fields.resaleLicense || 'N/A'}
Products of Interest: ${fields.productsInterest || 'N/A'}

Message:
${fields.message}`,
      html: `
        <h2>New Wholesale Application</h2>
        <p><strong>Business:</strong> ${fields.businessName}</p>
        <p><strong>Contact:</strong> ${fields.contactName}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Phone:</strong> ${fields.phone}</p>
        <p><strong>Business Type:</strong> ${fields.businessType || 'N/A'}</p>
        <p><strong>Website:</strong> ${fields.website || 'N/A'}</p>
        <p><strong>EIN:</strong> ${fields.ein || 'N/A'}</p>
        <p><strong>Address:</strong> ${fields.address || ''}, ${fields.city || ''}, ${fields.state || ''} ${fields.zip || ''}</p>
        <p><strong>Resale License:</strong> ${fields.resaleLicense || 'N/A'}</p>
        <p><strong>Products of Interest:</strong> ${fields.productsInterest || 'N/A'}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${fields.message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ success: false, error: 'Failed to send application. Please try again later.' }, { status: 500 });
    }

    // Send confirmation to applicant
    try {
      await resend.emails.send({
        from: 'OceanaHemp Wholesale <onboarding@resend.dev>',
        to: [fields.email],
        subject: 'We received your wholesale application — OceanaHemp',
        text: `Hi ${fields.contactName},\n\nThanks for applying to become an OceanaHemp wholesale partner! We have received your application for ${fields.businessName}.\n\nOur wholesale team will review your application and get back to you within 2 business days.\n\nWarm regards,\nThe OceanaHemp Wholesale Team\nwholesale@oceanahemp.com`,
        html: `
          <p>Hi ${fields.contactName},</p>
          <p>Thanks for applying to become an OceanaHemp wholesale partner! We have received your application for <strong>${fields.businessName}</strong>.</p>
          <p>Our wholesale team will review your application and get back to you within 2 business days.</p>
          <p>Warm regards,<br/>The OceanaHemp Wholesale Team<br/><a href="mailto:wholesale@oceanahemp.com">wholesale@oceanahemp.com</a></p>
        `,
      });
    } catch (autoReplyErr) {
      console.error('Wholesale confirmation email failed:', autoReplyErr);
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Wholesale API error:', err);
    return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
