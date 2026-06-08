import { getDb } from '@/lib/db';
import { sendEmail, getFromAddress } from '@/lib/email';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.AUTOMATION_SECRET;
  if (expectedToken && authHeader !== 'Bearer ' + expectedToken) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const jobs = db.prepare(`
    SELECT * FROM automation_queue
    WHERE sent = 0 AND scheduled_at <= datetime('now')
    ORDER BY scheduled_at ASC
    LIMIT 10
  `).all() as any[];

  const results = [];
  for (const job of jobs) {
    let success = false;
    let error = null;
    try {
      if (job.type === 'abandoned_cart') {
        success = await processAbandonedCart(job);
      } else if (job.type === 'welcome_followup') {
        success = await processWelcomeFollowup(job.email);
      } else if (job.type === 're_engagement') {
        success = await processReEngagement(job.email);
      }
    } catch (err: any) {
      error = err.message;
    }
    db.prepare('UPDATE automation_queue SET sent = ?, error = ? WHERE id = ?').run(success ? 1 : 0, error, job.id);
    results.push({ id: job.id, type: job.type, success, error });
  }

  return Response.json({ success: true, processed: results.length, jobs: results });
}

async function processAbandonedCart(job: any): Promise<boolean> {
  const db = getDb();
  const payload = JSON.parse(job.payload || '{}');
  const email = job.email;

  // Check if purchased since
  const purchased = db.prepare(
    'SELECT 1 FROM cart_events WHERE email = ? AND event = "purchase" AND created_at > datetime(?, "-30 minutes") LIMIT 1'
  ).get(email, payload.lastEventTime || 'now');

  if (purchased) {
    db.prepare('UPDATE automation_queue SET sent = 1 WHERE id = ?').run(job.id);
    return true;
  }

  const cart = payload.cartData ? JSON.parse(payload.cartData) : { items: [] };
  let itemList = 'Your selected items';
  if (cart.items?.length) {
    itemList = cart.items.map((i: any) => '• ' + i.name + ' - $' + i.price).join('\n');
  }

  const result = await sendEmail({
    from: getFromAddress(),
    to: [email],
    subject: 'Did something go wrong with your order?',
    html: [
      '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;"\u003e',
      '<div style="background:#0d4f6a;padding:30px;text-align:center;"\u003e',
      '<h1 style="color:#fff;margin:0;"\u003eStill thinking it over?</h1\u003e',
      '</div\u003e',
      '<div style="padding:30px;background:#fff;"\u003e',
      '<p style="font-size:17px;"\u003eHi there,</p\u003e',
      '<p\u003eWe noticed you were checking out but did not complete your order:</p\u003e',
      '<pre style="background:#f7fafc;padding:15px;border-radius:8px;font-size:14px;"\u003e' + itemList + '</pre\u003e',
      '<p\u003eQuestions about shipping, dosing, or anything else? Just reply to this email.</p\u003e',
      '<div style="text-align:center;margin:25px 0;"\u003e',
      '<a href="https://oceanahemp.com/cart" style="background:#0d4f6a;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;"\u003eComplete My Order</a\u003e',
      '</div\u003e',
      '</div\u003e',
      '</div\u003e',
    ].join(''),
  });

  if (result.id && payload.subscriberId) {
    db.prepare(
      'INSERT INTO email_logs (subscriber_id, type, subject, status, resend_id) VALUES (?, ?, ?, ?, ?)'
    ).run(payload.subscriberId, 'abandoned_cart', 'Abandoned cart', 'sent', result.id);
  }

  return !!result.id;
}

async function processWelcomeFollowup(email: string): Promise<boolean> {
  const result = await sendEmail({
    from: getFromAddress(),
    to: [email],
    subject: 'How are you enjoying OceanaHemp so far?',
    html: [
      '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;"\u003e',
      '<p\u003eHi there,</p\u003e',
      '<p\u003eIt has been a few days since you joined us. Have you had a chance to explore our products?</p\u003e',
      '<p\u003eIf you have any questions about CBD dosing, our farming practices, or anything else, just hit reply.</p\u003e',
      '<div style="text-align:center;margin:25px 0;"\u003e',
      '<a href="https://oceanahemp.com/shop" style="background:#0d4f6a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;"\u003eBrowse Products</a\u003e',
      '</div\u003e',
      '</div\u003e',
    ].join(''),
  });
  return !!result.id;
}

async function processReEngagement(email: string): Promise<boolean> {
  const result = await sendEmail({
    from: getFromAddress(),
    to: [email],
    subject: 'We miss you at OceanaHemp',
    html: [
      '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;"\u003e',
      '<p\u003eHi there,</p\u003e',
      '<p\u003eIt has been a while since we heard from you. We have been busy growing the best hemp on the California coast, and we would love to share what is new.</p\u003e',
      '<div style="background:#f7fafc;padding:20px;border-radius:8px;text-align:center;margin:20px 0;"\u003e',
      '<p style="margin:0;font-size:18px;font-weight:bold;color:#0d4f6a;"\u003eCome back with 15% off</p\u003e',
      '<p style="margin:8px 0 0;font-size:24px;font-weight:bold;letter-spacing:3px;"\u003eRETURN15</p\u003e',
      '</div\u003e',
      '<div style="text-align:center;"\u003e',
      '<a href="https://oceanahemp.com/shop" style="background:#0d4f6a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;"\u003eShop Now</a\u003e',
      '</div\u003e',
      '</div\u003e',
    ].join(''),
  });
  return !!result.id;
}
