import { ADHKAR_TOTAL_MS } from './TvPrayerScreen.adhkar';
import { getAdhkarPosition, getPrayerDurationMs } from './TvPrayerScreen.adhkarTimeline';
import { ALERT_DURATION_MS } from './TvPrayerScreen.constants';
import type { TvAlertEvent, TvAlertState } from './TvPrayerScreen.types';

function windowEnd(event: TvAlertEvent): number {
  if (!event.iqama) return event.adhan.getTime() + ALERT_DURATION_MS;
  return event.iqama.getTime() + ALERT_DURATION_MS + getPrayerDurationMs(event) + ADHKAR_TOTAL_MS;
}

function afterIqama(event: TvAlertEvent, prayerStart: number, now: number): TvAlertState {
  const prayerMs = getPrayerDurationMs(event);
  const base = { event, witnessed: false, totalMs: prayerMs };
  if (now < prayerStart + prayerMs) {
    return { ...base, phase: 'praying', remainingMs: prayerStart + prayerMs - now, adhkar: null };
  }
  const position = getAdhkarPosition(now - prayerStart - prayerMs);
  const remainingMs = position.durationMs - position.elapsedMs;
  return { ...base, phase: position.index < 0 ? 'adhkarBreak' : 'adhkar', remainingMs, adhkar: position };
}

export function getAlertState(events: TvAlertEvent[], now: number, sessionStart: number): TvAlertState | null {
  const started = events.filter((item) => item.adhan.getTime() <= now);
  const event = started[started.length - 1];
  if (!event || now >= windowEnd(event)) return null;
  const adhan = event.adhan.getTime();
  const iqama = event.iqama?.getTime() ?? null;
  const totalMs = iqama === null ? 0 : Math.max(0, iqama - adhan);

  if (sessionStart < adhan && now < adhan + ALERT_DURATION_MS) {
    return { phase: 'adhan', event, remainingMs: adhan + ALERT_DURATION_MS - now, totalMs, witnessed: true, adhkar: null };
  }
  if (iqama === null) return null;
  if (now < iqama) {
    return { phase: 'countdown', event, remainingMs: iqama - now, totalMs, witnessed: sessionStart < adhan, adhkar: null };
  }
  if (now < iqama + ALERT_DURATION_MS) {
    const remainingMs = iqama + ALERT_DURATION_MS - now;
    return { phase: 'iqama', event, remainingMs, totalMs, witnessed: sessionStart < iqama, adhkar: null };
  }
  return afterIqama(event, iqama + ALERT_DURATION_MS, now);
}
