import { getDb } from '@/lib/db';
import { createSubscriber } from '@/lib/db/subscribers';
import { sendEmail, getFromAddress, getAdminEmail, getAdminEmails } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const source = typeof body.source === 'string' ? body.source : 'website';
    const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : undefined;
    const discountCode = typeof body.discount === 'string' ? body.discount.trim() : undefined;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Store in database
    const subscriber = createSubscriber({
      email,
      firstName,
      source,
      discountCode,
      tags: source === 'exit-intent' ? 'exit-intent,discount' : 'newsletter',
    });

    // Send admin notification
    const sourceLabel = source === 'exit-intent' ? 'Exit-Intent' : 'Newsletter';
    const adminHtml = [
      '<h2>New Subscriber</h2>',
      '<p><strong>Email:</strong> ' + email + '</p>',
      firstName ? '<p><strong>Name:</strong> ' + firstName + '</p>' : '',
      '<p><strong>Source:</strong> ' + source + '</p>',
      discountCode ? '<p><strong>Discount:</strong> ' + discountCode + '</p>' : '',
      '<p><strong>Total subscribers:</strong> ' + getTotalCount() + '</p>',
      '<p><strong>Subscriber ID:</strong> ' + subscriber.id + '</p>',
    ].join('');

    const adminResult = await sendEmail({
      from: getFromAddress(),
      to: getAdminEmails(),
      subject: 'New ' + sourceLabel + ' Signup',
      html: adminHtml,
    });

    logEmail(subscriber.id, 'admin_notify', 'New ' + source + ' signup', adminResult.id, adminResult.error);

    // Send welcome email
    const welcomeResult = await sendWelcomeEmail(email, firstName, discountCode, source);
    logEmail(subscriber.id, 'welcome', 'Welcome to OceanaHemp', welcomeResult.id, welcomeResult.error);

    return Response.json({
      success: true,
      subscriberId: subscriber.id,
      welcomeSent: !!welcomeResult.id,
      adminSent: !!adminResult.id,
    });
  } catch (err: any) {
    console.error('Newsletter API error:', err);
    return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

function getTotalCount(): number {
  const db = getDb();
  const stmt = db.prepare('SELECT COUNT(*) as count FROM subscribers WHERE subscribed = 1');
  return (stmt.get() as { count: number }).count;
}

function logEmail(subscriberId: string, type: string, subject: string, resendId?: string, error?: string) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO email_logs (subscriber_id, type, subject, status, resend_id, error) VALUES (?, ?, ?, ?, ?, ?)'
  );
  stmt.run(subscriberId, type, subject, error ? 'failed' : 'sent', resendId ?? null, error ?? null);
}

async function sendWelcomeEmail(email: string, firstName?: string, discountCode?: string, source?: string) {
  const displayName = firstName || 'there';
  const code = discountCode || 'WELCOME20';
  const isExitIntent = source === 'exit-intent';
  const greeting = isExitIntent ? 'We noticed you were browsing and wanted to make sure you did not miss out.' : 'We are excited to share our journey with you.';
  const subjectLine = isExitIntent ? 'Your 20% off code is here!' : 'Welcome to OceanaHemp';

  const html = [
    '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1a202c;"\u003e',
    '<div style="background:linear-gradient(135deg,#0d4f6a,#2d6a4f);padding:40px 20px;text-align:center;"\u003e',
    '<h1 style="color:#ffffff;margin:0;font-size:28px;"\u003eWelcome to OceanaHemp</h1\u003e',
    '<p style="color:#e2e8f0;margin:10px 0 0;"\u003ePure wellness from land and sea.</p\u003e',
    '</div\u003e',
    '<div style="padding:30px 20px;background:#ffffff;"\u003e',
    '<p style="font-size:18px;"\u003eHi ' + displayName + ',</p\u003e',
    '<p\u003eThanks for joining the OceanaHemp community. ' + greeting + '</p\u003e',
    '<div style="background:#f7fafc;border:2px dashed #0d4f6a;border-radius:12px;padding:20px;text-align:center;margin:25px 0;"\u003e',
    '<p style="margin:0 0 8px;font-size:14px;color:#718096;"\u003eYOUR EXCLUSIVE CODE</p\u003e',
    '<p style="margin:0;font-size:32px;font-weight:bold;color:#0d4f6a;letter-spacing:2px;"\u003e' + code + '</p\u003e',
    '<p style="margin:8px 0 0;font-size:14px;color:#718096;"\u003e20% off your first order</p\u003e',
    '</div\u003e',
    '<p\u003e<strong>What to expect:</strong></p\u003e',
    '<ul\u003e',
    '<li>Early access to new products</li\u003e',
    '<li>Wellness tips and CBD education</li\u003e',
    '<li>Subscriber-only promotions</li\u003e',
    '<li>No spam, unsubscribe anytime</li\u003e',
    '</ul\u003e',
    '<div style="text-align:center;margin:30px 0;"\u003e',
    '<a href="https://oceanahemp.com/shop" style="background:#0d4f6a;color:#ffffff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;"\u003eShop Now</a\u003e',
    '</div\u003e',
    '<p style="font-size:13px;color:#a0aec0;text-align:center;margin-top:30px;"\u003e',
    'OceanaHemp | 1106 2nd St #126, Encinitas, CA 92024<br\u003e',
    '<a href="https://oceanahemp.com/unsubscribe?email=' + encodeURIComponent(email) + '" style="color:#a0aec0;"\u003eUnsubscribe</a\u003e',
    '</p\u003e',
    '</div\u003e',
    '</div\u003e',
  ].join('');

  return sendEmail({
    from: getFromAddress(),
    to: [email],
    subject: subjectLine,
    html,
  });
}
