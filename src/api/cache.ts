import { db } from '@src/db';
import { cachedLocations, cachedAnnouncements } from '@src/db/schema';
import { differenceInHours } from 'date-fns';

const TTL_HOURS = 24;

function isStale(fetchedAt: string): boolean {
  return differenceInHours(new Date(), new Date(fetchedAt)) >= TTL_HOURS;
}

export async function readLocationsCache<T>(): Promise<T | null> {
  const rows = await db.select().from(cachedLocations).limit(1);
  if (!rows.length || isStale(rows[0].fetchedAt)) return null;
  return JSON.parse(rows[0].data) as T;
}

export async function writeLocationsCache<T>(data: T): Promise<void> {
  await db.delete(cachedLocations);
  await db.insert(cachedLocations).values({
    data: JSON.stringify(data),
    fetchedAt: new Date().toISOString(),
  });
}

export async function readAnnouncementsCache<T>(ignoreExpiry = false): Promise<T | null> {
  const rows = await db.select().from(cachedAnnouncements).limit(1);
  if (!rows.length) return null;
  if (!ignoreExpiry && isStale(rows[0].fetchedAt)) return null;
  return JSON.parse(rows[0].data) as T;
}

export async function writeAnnouncementsCache<T>(data: T): Promise<void> {
  await db.delete(cachedAnnouncements);
  await db.insert(cachedAnnouncements).values({
    data: JSON.stringify(data),
    fetchedAt: new Date().toISOString(),
  });
}
