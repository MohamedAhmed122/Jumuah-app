import { db } from './index';
import { prayerLogs, qadaCounters, quizScores } from './schema';

export async function clearUserDatabaseData() {
  await db.delete(prayerLogs);
  await db.delete(qadaCounters);
  await db.delete(quizScores);
}
