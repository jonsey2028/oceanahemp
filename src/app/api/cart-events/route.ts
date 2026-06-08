import { getDb } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
    const event = typeof body.event === 'string' ? body.event : '';
    const cartData = typeof body.cartData === 'object' ? JSON.stringify(body.cartData) : null;

    if (!email || !event) {
      return Response.json({ success: false, error: 'Email and event required' }, { status: 400 });
    }

    const db = getDb();

    // Find or create subscriber
    let stmt = db.prepare('SELECT id FROM subscribers WHERE email = ?');
    let sub = stmt.get(email) as { id: string } | undefined;
    let subscriberId = sub?.id ?? null;

    if (!subscriberId) {
      const idStmt = db.prepare(
        "INSERT INTO subscribers (id, email, source, tags, subscribed) VALUES (lower(hex(randomblob(16))), ?, 'cart-anonymous', 'cart-abandon', 1) RETURNING id"
      );
      subscriberId = (idStmt.get(email) as { id: string }).id;
    }

    // Record cart event
    const insert = db.prepare(`
      INSERT INTO cart_events (subscriber_id, email, session_id, event, cart_data)
      VALUES (?, ?, ?, ?, ?)
    `);
    insert.run(subscriberId, email, sessionId || null, event, cartData);

    // Check for abandon trigger (checkout_start with no purchase within 30 min)
    if (event === 'checkout_start') {
      // Schedule abandoned cart email for 30 minutes later
      const schedule = db.prepare(`
        INSERT INTO automation_queue (type, email, payload, scheduled_at)
        VALUES ('abandoned_cart', ?, ?, datetime('now', '+30 minutes'))
      `);
      schedule.run(email, JSON.stringify({ sessionId, cartData, subscriberId }));
    }

    return Response.json({ success: true, subscriberId });
  } catch (err: any) {
    console.error('Cart event error:', err);
    return Response.json({ success: false, error: 'Failed to record event' }, { status: 500 });
  }
}
