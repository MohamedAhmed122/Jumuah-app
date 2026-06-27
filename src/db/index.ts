import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';

const sqlite = openDatabaseSync('jumuah.db', { enableChangeListener: true });

// Run CREATE TABLE IF NOT EXISTS synchronously at module load — no .sql import needed
sqlite.execSync(`
  CREATE TABLE IF NOT EXISTS prayer_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    date TEXT NOT NULL,
    prayer TEXT NOT NULL,
    prayed INTEGER NOT NULL,
    logged_at TEXT NOT NULL
  );
`);
sqlite.execSync(`
  CREATE TABLE IF NOT EXISTS qada_counters (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    prayer TEXT NOT NULL,
    count INTEGER DEFAULT 0 NOT NULL
  );
`);
sqlite.execSync(`
  CREATE TABLE IF NOT EXISTS quiz_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    date TEXT NOT NULL,
    score INTEGER NOT NULL,
    total INTEGER DEFAULT 20 NOT NULL
  );
`);
sqlite.execSync(`
  CREATE TABLE IF NOT EXISTS cached_locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    data TEXT NOT NULL,
    fetched_at TEXT NOT NULL
  );
`);
sqlite.execSync(`
  CREATE TABLE IF NOT EXISTS cached_announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    data TEXT NOT NULL,
    fetched_at TEXT NOT NULL
  );
`);

export const db = drizzle(sqlite, { schema });
