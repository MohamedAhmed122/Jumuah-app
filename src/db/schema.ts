import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const prayerLogs = sqliteTable('prayer_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  date: text('date').notNull(),
  prayer: text('prayer', { enum: ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] }).notNull(),
  prayed: integer('prayed', { mode: 'boolean' }).notNull(),
  loggedAt: text('logged_at').notNull(),
});

export const qadaCounters = sqliteTable('qada_counters', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  prayer: text('prayer', { enum: ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] }).notNull(),
  count: integer('count').notNull().default(0),
});

export const quizScores = sqliteTable('quiz_scores', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  date: text('date').notNull(),
  score: integer('score').notNull(),
  total: integer('total').notNull().default(20),
});

export const cachedLocations = sqliteTable('cached_locations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  data: text('data').notNull(),
  fetchedAt: text('fetched_at').notNull(),
});

export const cachedAnnouncements = sqliteTable('cached_announcements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  data: text('data').notNull(),
  fetchedAt: text('fetched_at').notNull(),
});
