import { getDb } from './index';
import { randomBytes } from 'crypto';

export interface Subscriber {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  source?: string;
  tags?: string;
  discount_code?: string;
  subscribed?: number;
  created_at?: string;
  updated_at?: string;
}

export function createSubscriber(data: { email: string; firstName?: string; lastName?: string; source?: string; discountCode?: string; tags?: string }): Subscriber {
  const db = getDb();
  const id = generateId();
  const stmt = db.prepare(`
    INSERT INTO subscribers (id, email, first_name, last_name, source, tags, discount_code, subscribed)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    ON CONFLICT(email) DO UPDATE SET
      updated_at = datetime('now'),
      tags = COALESCE(excluded.tags, subscribers.tags),
      discount_code = COALESCE(excluded.discount_code, subscribers.discount_code)
    RETURNING *
  `);
  return stmt.get(id, data.email.toLowerCase(), data.firstName ?? null, data.lastName ?? null, data.source ?? 'website', data.tags ?? null, data.discountCode ?? null) as Subscriber;
}

export function getSubscriberByEmail(email: string): Subscriber | undefined {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM subscribers WHERE email = ?');
  return stmt.get(email.toLowerCase()) as Subscriber | undefined;
}

export function updateSubscriber(id: string, data: Partial<Subscriber>): void {
  const db = getDb();
  const fields = [];
  const values = [];
  if (data.first_name !== undefined) { fields.push('first_name = ?'); values.push(data.first_name); }
  if (data.last_name !== undefined) { fields.push('last_name = ?'); values.push(data.last_name); }
  if (data.tags !== undefined) { fields.push('tags = ?'); values.push(data.tags); }
  if (data.discount_code !== undefined) { fields.push('discount_code = ?'); values.push(data.discount_code); }
  if (data.subscribed !== undefined) { fields.push('subscribed = ?'); values.push(data.subscribed); }
  if (fields.length === 0) return;
  values.push(id);
  const stmt = db.prepare(`UPDATE subscribers SET ${fields.join(', ')}, updated_at = datetime('now') WHERE id = ?`);
  stmt.run(...values);
}

export function listSubscribers(opts?: { subscribed?: boolean; tag?: string; limit?: number; offset?: number }): Subscriber[] {
  const db = getDb();
  let sql = 'SELECT * FROM subscribers WHERE 1=1';
  const params: (string | number)[] = [];
  if (opts?.subscribed !== undefined) { sql += ' AND subscribed = ?'; params.push(opts.subscribed ? 1 : 0); }
  if (opts?.tag) { sql += " AND tags LIKE ?"; params.push(`%${opts.tag}%`); }
  sql += ' ORDER BY created_at DESC';
  if (opts?.limit) { sql += ' LIMIT ?'; params.push(opts.limit); }
  if (opts?.offset) { sql += ' OFFSET ?'; params.push(opts.offset); }
  const stmt = db.prepare(sql);
  return stmt.all(...params) as Subscriber[];
}

export function countSubscribers(): number {
  const db = getDb();
  const stmt = db.prepare('SELECT COUNT(*) as count FROM subscribers WHERE subscribed = 1');
  return (stmt.get() as { count: number }).count;
}

function generateId(): string {
  return randomBytes(16).toString('hex');
}
