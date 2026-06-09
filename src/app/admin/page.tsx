import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs';

function getAuth(searchParams: Record<string, string | undefined>): boolean {
  const expected = process.env.ADMIN_DASHBOARD_TOKEN;
  if (!expected) return false;
  const provided = searchParams?.token;
  return provided === expected;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  if (!getAuth(params)) {
    return (
      <html>
        <head>
          <title>Admin</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>{`
            body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#0d4f6a;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}
            .box{background:#fff;color:#1a202c;padding:32px;border-radius:16px;max-width:320px;width:90%;box-shadow:0 20px 40px rgba(0,0,0,.2)}
            h2{margin:0 0 16px;font-size:20px}
            input{width:100%;padding:12px;border:1px solid #e2e8f0;border-radius:8px;font-size:15px;box-sizing:border-box;margin-bottom:12px}
            button{width:100%;padding:12px;background:#0d4f6a;color:#fff;border:none;border-radius:8px;font-size:15px;cursor:pointer}
            button:hover{background:#09405a}
          `}</style>
        </head>
        <body>
          <div className="box">
            <h2>OceanaHemp Tracker</h2>
            <p style={{margin:'0 0 16px',fontSize:14,color:'#718096'}}>Enter your access token to view live subscriber data.</p>
            <form method="get">
              <input type="password" name="token" placeholder="Access token" autoFocus />
              <button type="submit">Open Dashboard</button>
            </form>
          </div>
        </body>
      </html>
    );
  }

  const db = getDb();
  const total = (db.prepare('SELECT COUNT(*) as c FROM subscribers WHERE subscribed = 1').get() as any).c;
  const today = (db.prepare("SELECT COUNT(*) as c FROM subscribers WHERE date(created_at) = date('now')").get() as any).c;
  const recentSubs = db.prepare('SELECT id, email, source, created_at FROM subscribers ORDER BY created_at DESC LIMIT 30').all() as any[];
  const recentLogs = db.prepare('SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 30').all() as any[];

  return (
    <html>
      <head>
        <title>OceanaHemp Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="refresh" content="30" />
        <style>{`
          body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#f7fafc;color:#1a202c;padding:20px;max-width:1000px;margin:0 auto}
          h1{margin:0;font-size:22px} .sub{color:#718096;font-size:13px;margin-bottom:18px}
          .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:22px}
          .card{background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px}
          .card b{display:block;font-size:26px;color:#0d4f6a}
          .card span{font-size:11px;color:#718096;text-transform:uppercase;letter-spacing:.5px}
          table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;font-size:12px;margin-bottom:24px}
          th,td{padding:8px 10px;text-align:left;border-bottom:1px solid #e2e8f0;vertical-align:top}
          th{background:#f7fafc;font-size:10px;text-transform:uppercase;color:#718096;letter-spacing:.5px}
          tr:hover{background:#f7fafc}
          .tag{display:inline-block;padding:2px 7px;border-radius:9999px;font-size:10px;font-weight:600;background:#edf2f7;color:#4a5568}
          .tag.newsletter{background:#c6f6d5;color:#22543d}
          .tag.exit-intent{background:#fefcbf;color:#744210}
          .status{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:4px}
          .status.sent{background:#48bb78}
          .status.failed{background:#f56565}
          .section{margin-bottom:24px}
          .section h2{margin:0 0 8px;font-size:16px}
          .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px}
          .badge{font-size:11px;background:#0d4f6a;color:#fff;padding:3px 10px;border-radius:6px}
        `}</style>
      </head>
      <body>
        <div className="top">
          <div>
            <h1>OceanaHemp Tracker</h1>
            <p className="sub">Live subscriber and email activity. Auto-refreshes every 30s.</p>
          </div>
          <span className="badge">{new Date().toLocaleTimeString()}</span>
        </div>

        <div className="cards">
          <div className="card"><b>{total}</b><span>Total Subscribers</span></div>
          <div className="card"><b>{today}</b><span>Today</span></div>
          <div className="card"><b>{recentLogs.length}</b><span>Recent Emails</span></div>
        </div>

        <div className="section">
          <h2>Recent Subscribers</h2>
          <table>
            <thead><tr><th>Email</th><th>Source</th><th>Time</th></tr></thead>
            <tbody>
              {recentSubs.map(s => (
                <tr key={s.id}>
                  <td>{s.email}</td>
                  <td><span className={`tag ${s.source === 'exit-intent' ? 'exit-intent' : 'newsletter'}`}>{s.source || 'website'}</span></td>
                  <td>{new Date(s.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2>Recent Emails</h2>
          <table>
            <thead><tr><th>Type</th><th>Subject</th><th>Status</th><th>Resend ID</th><th>Time</th></tr></thead>
            <tbody>
              {recentLogs.map((l,i) => (
                <tr key={i}>
                  <td>{l.type}</td>
                  <td>{l.subject}</td>
                  <td><span className={`status ${l.status}`}></span>{l.status}</td>
                  <td><code>{l.resend_id || '-'}</code></td>
                  <td>{new Date(l.sent_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );
}
