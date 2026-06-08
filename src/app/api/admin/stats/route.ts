import { getDb } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  // Simple auth
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.AUTOMATION_SECRET;
  if (expectedToken && authHeader !== 'Bearer ' + expectedToken) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();

  const totalSubscribers = (db.prepare('SELECT COUNT(*) as c FROM subscribers WHERE subscribed = 1').get() as any).c;
  const exitIntentSubs = (db.prepare("SELECT COUNT(*) as c FROM subscribers WHERE source = 'exit-intent'").get() as any).c;
  const websiteSubs = (db.prepare("SELECT COUNT(*) as c FROM subscribers WHERE source = 'website' OR source = 'footer' OR source = 'banner'").get() as any).c;
  const totalEmails = (db.prepare('SELECT COUNT(*) as c FROM email_logs').get() as any).c;
  const pendingJobs = (db.prepare('SELECT COUNT(*) as c FROM automation_queue WHERE sent = 0').get() as any).c;
  const recentEmails = db.prepare('SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 20').all() as any[];
  const recentSubs = db.prepare('SELECT id, email, source, created_at FROM subscribers ORDER BY created_at DESC LIMIT 20').all() as any[];

  return Response.json({
    success: true,
    stats: {
      totalSubscribers,
      exitIntentSubs,
      websiteSubs,
      totalEmails,
      pendingJobs,
    },
    recentEmails,
    recentSubscribers: recentSubs,
  });
}
