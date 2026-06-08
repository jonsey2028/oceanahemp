import Database from 'better-sqlite3';
import path from 'path';

const isVercel = process.env.VERCEL === '1';
const DB_PATH = process.env.DATABASE_PATH || (isVercel ? '/tmp/subscribers.db' : './data/subscribers.db');

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initTables();
  }
  return db;
}

function initTables() {
  const d = getDb();

  d.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      email TEXT NOT NULL UNIQUE,
      first_name TEXT,
      last_name TEXT,
      source TEXT DEFAULT 'website',
      tags TEXT,
      discount_code TEXT,
      subscribed INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
    CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed ON subscribers(subscribed);

    CREATE TABLE IF NOT EXISTS email_logs (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      subscriber_id TEXT,
      type TEXT NOT NULL,
      subject TEXT NOT NULL,
      sent_at TEXT DEFAULT (datetime('now')),
      status TEXT DEFAULT 'sent',
      resend_id TEXT,
      error TEXT,
      FOREIGN KEY (subscriber_id) REFERENCES subscribers(id)
    );

    CREATE INDEX IF NOT EXISTS idx_email_logs_subscriber ON email_logs(subscriber_id);

    CREATE TABLE IF NOT EXISTS cart_events (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      subscriber_id TEXT,
      email TEXT NOT NULL,
      session_id TEXT,
      event TEXT NOT NULL,
      cart_data TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      triggered_email INTEGER DEFAULT 0,
      FOREIGN KEY (subscriber_id) REFERENCES subscribers(id)
    );

    CREATE INDEX IF NOT EXISTS idx_cart_events_email ON cart_events(email);
    CREATE INDEX IF NOT EXISTS idx_cart_events_session ON cart_events(session_id);

    CREATE TABLE IF NOT EXISTS automation_queue (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      type TEXT NOT NULL,
      email TEXT NOT NULL,
      payload TEXT,
      scheduled_at TEXT NOT NULL,
      sent INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_automation_queue_scheduled ON automation_queue(sent, scheduled_at);
  `);
}

export { getDb };
