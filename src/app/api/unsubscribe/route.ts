import { getDb } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return Response.json({ success: false, error: 'Email required' }, { status: 400 });
  }

  const db = getDb();
  const stmt = db.prepare('UPDATE subscribers SET subscribed = 0, updated_at = datetime("now") WHERE email = ?');
  const result = stmt.run(email.toLowerCase());

  if (result.changes === 0) {
    return Response.json({ success: false, error: 'Email not found' }, { status: 404 });
  }

  return Response.json({ success: true, message: 'You have been unsubscribed.' });
}
