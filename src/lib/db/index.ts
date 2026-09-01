import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { initSchema } from './schema'

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DATA_DIR, 'lexi.db')

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (db) return db

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  db.pragma('busy_timeout = 5000')
  db.pragma('foreign_keys = ON')
  initSchema(db)

  return db
}
