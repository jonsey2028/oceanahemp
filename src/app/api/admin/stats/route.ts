import { getDb } from '@/lib/db';
import { sendEmail, getFromAddress, getAdminEmails } from '@/lib/email';

export const runtime = 'nodejs';

function getAuth(request: Request): { ok: boolean; token?: string } {
  const expected = process.env.AUTOMATION_SECRET;
  if (!expected) return { ok: true }; // no auth configured, allow
  const auth = request.headers.get('authorization');
  const token = auth?.replace('Bearer ', '');
  if (token !== expected) return { ok: false };
  return { ok: true, token };
}

export async function GET(request: Request) {
  const auth = getAuth(request);
  if (!auth.ok) {
    return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Bearer' } });
  }

  const db = getDb();
  const total = (db.prepare('SELECT COUNT(*) as c FROM subscribers WHERE subscribed = 1').get() as any).c;
  const today = (db.prepare("SELECT COUNT(*) as c FROM subscribers WHERE date(created_at) = date('now')").get() as any).c;
  const recentSubs = db.prepare('SELECT id, email, source, created_at FROM subscribers ORDER BY created_at DESC LIMIT 25').all() as any[];
  const recentLogs = db.prepare('SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 25').all() as any[];

  const html = `
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>OceanaHemp Admin</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#f7fafc;color:#1a202c;padding:24px;max-width:960px;margin:0 auto}
  h1{margin:0 0 6px;font-size:24px} .sub{color:#718096;font-size:14px;margin-bottom:20px}
  .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px}
  .card{background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:16px}
  .card b{display:block;font-size:28px;color:#0d4f6a}
  .card span{font-size:12px;color:#718096;text-transform:uppercase;letter-spacing:.5px}
  table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;font-size:13px}
  th,td{padding:10px 12px;text-align:left;border-bottom:1px solid #e2e8f0}
  th{background:#f7fafc;font-size:11px;text-transform:uppercase;color:#718096;letter-spacing:.5px}
  tr:hover{background:#f7fafc}
  .tag{display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#edf2f7;color:#4a5568}
  .tag.newsletter{background:#c6f6d5;color:#22543d}
  .tag.exit-intent{background:#fefcbf;color:#744210}
  .status{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:4px}
  .status.sent{background:#48bb78}
  .status.failed{background:#f56565}
  .section{margin-bottom:28px}
  .section h2{margin:0 0 10px;font-size:18px}
</style>
</head>
<body>
<h1>OceanaHemp Tracker</h1>
<p class="sub">Live subscriber and email activity</p>

<div class="cards">
  <div class="card"><b>${total}</b><span>Total Subscribers</span></div>
  <div class="card"><b>${today}</b><span>Today</span></div>
  <div class="card"><b>${recentLogs.length}</b><span>Recent Emails</span></div>
</div>

<div class="section">
  <h2>Recent Subscribers</h2>
  <table>
    <tr><th>Email</th><th>Source</th><th>Time</th></tr>
    ${recentSubs.map(s => `
      <tr>
        <td>${s.email}</td>
        <td><span class="tag ${s.source === 'exit-intent' ? 'exit-intent' : 'newsletter'}">${s.source || 'website'}</span></td>
        <td>${new Date(s.created_at).toLocaleString()}</td>
      </tr>
    `).join('')}
  </table>
</div>

<div class="section">
  <h2>Recent Emails</h2>
  <table>
    <tr><th>Type</th><th>Subject</th><th>Status</th><th>Resend ID</th><th>Time</th></tr>
    ${recentLogs.map(l => `
      <tr>
        <td>${l.type}</td>
        <td>${l.subject}</td>
        <td><span class="status ${l.status}"></span>${l.status}</td>
        <td><code>${l.resend_id || '-'}</code></td>
        <td>${new Date(l.sent_at).toLocaleString()}</td>
      </tr>
    `).join('')}
  </table>
</div>

</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
