import type Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'

export function initSchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      source TEXT,
      page_url TEXT,
      page_title TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      referrer TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS content_sections (
      section_key TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
    CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
  `)

  seedAdminUser(db)
}

function seedAdminUser(db: Database.Database): void {
  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || 'lexi-admin-change-me'
  const passwordHash = bcrypt.hashSync(password, 10)

  db.prepare(
    `INSERT INTO users (username, password_hash)
     VALUES (?, ?)
     ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash`,
  ).run(username, passwordHash)
}
