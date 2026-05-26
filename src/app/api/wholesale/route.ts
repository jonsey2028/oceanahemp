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

    // NOTE: Resend sandbox only allows sending to the account owner email.
    const to = 'misterjones.kj@gmail.com';

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
      from: 'OceanaHemp Wholesale \u003cwholesale@oceanahemp.com\u003e',
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
        \u003ch2\u003eNew Wholesale Application\u003c/h2\u003e
        \u003cp\u003e\u003cstrong\u003eBusiness:\u003c/strong\u003e ${fields.businessName}\u003c/p\u003e
        \u003cp\u003e\u003cstrong\u003eContact:\u003c/strong\u003e ${fields.contactName}\u003c/p\u003e
        \u003cp\u003e\u003cstrong\u003eEmail:\u003c/strong\u003e ${fields.email}\u003c/p\u003e
        \u003cp\u003e\u003cstrong\u003ePhone:\u003c/strong\u003e ${fields.phone}\u003c/p\u003e
        \u003cp\u003e\u003cstrong\u003eBusiness Type:\u003c/strong\u003e ${fields.businessType || 'N/A'}\u003c/p\u003e
        \u003cp\u003e\u003cstrong\u003eWebsite:\u003c/strong\u003e ${fields.website || 'N/A'}\u003c/p\u003e
        \u003cp\u003e\u003cstrong\u003eEIN:\u003c/strong\u003e ${fields.ein || 'N/A'}\u003c/p\u003e
        \u003cp\u003e\u003cstrong\u003eAddress:\u003c/strong\u003e ${fields.address || ''}, ${fields.city || ''}, ${fields.state || ''} ${fields.zip || ''}\u003c/p\u003e
        \u003cp\u003e\u003cstrong\u003eResale License:\u003c/strong\u003e ${fields.resaleLicense || 'N/A'}\u003c/p\u003e
        \u003cp\u003e\u003cstrong\u003eProducts of Interest:\u003c/strong\u003e ${fields.productsInterest || 'N/A'}\u003c/p\u003e
        \u003chr/\u003e
        \u003cp\u003e\u003cstrong\u003eMessage:\u003c/strong\u003e\u003c/p\u003e
        \u003cp\u003e${fields.message.replace(/\\n/g, '\u003cbr/\u003e')}\u003c/p\u003e
      `,
    }).catch(async (err) => {
      console.log('Domain send failed, falling back to sandbox:', err);
      return resend.emails.send({
        from: 'OceanaHemp Wholesale \u003conboarding@resend.dev\u003e',
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
          \u003ch2\u003eNew Wholesale Application\u003c/h2\u003e
          \u003cp\u003e\u003cstrong\u003eBusiness:\u003c/strong\u003e ${fields.businessName}\u003c/p\u003e
          \u003cp\u003e\u003cstrong\u003eContact:\u003c/strong\u003e ${fields.contactName}\u003c/p\u003e
          \u003cp\u003e\u003cstrong\u003eEmail:\u003c/strong\u003e ${fields.email}\u003c/p\u003e
          \u003cp\u003e\u003cstrong\u003ePhone:\u003c/strong\u003e ${fields.phone}\u003c/p\u003e
          \u003cp\u003e\u003cstrong\u003eBusiness Type:\u003c/strong\u003e ${fields.businessType || 'N/A'}\u003c/p\u003e
          \u003cp\u003e\u003cstrong\u003eWebsite:\u003c/strong\u003e ${fields.website || 'N/A'}\u003c/p\u003e
          \u003cp\u003e\u003cstrong\u003eEIN:\u003c/strong\u003e ${fields.ein || 'N/A'}\u003c/p\u003e
          \u003cp\u003e\u003cstrong\u003eAddress:\u003c/strong\u003e ${fields.address || ''}, ${fields.city || ''}, ${fields.state || ''} ${fields.zip || ''}\u003c/p\u003e
          \u003cp\u003e\u003cstrong\u003eResale License:\u003c/strong\u003e ${fields.resaleLicense || 'N/A'}\u003c/p\u003e
          \u003cp\u003e\u003cstrong\u003eProducts of Interest:\u003c/strong\u003e ${fields.productsInterest || 'N/A'}\u003c/p\u003e
          \u003chr/\u003e
          \u003cp\u003e\u003cstrong\u003eMessage:\u003c/strong\u003e\u003c/p\u003e
          \u003cp\u003e${fields.message.replace(/\\n/g, '\u003cbr/\u003e')}\u003c/p\u003e
        `,
      });
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ success: false, error: 'Failed to send application. Please try again later.' }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Wholesale API error:', err);
    return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
