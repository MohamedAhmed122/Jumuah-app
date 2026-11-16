import { ALERT_DURATION_MS } from './TvPrayerScreen.constants';
import type { TvAlertEvent, TvAlertState } from './TvPrayerScreen.types';

function windowEnd(event: TvAlertEvent): number {
  return (event.iqama ?? event.adhan).getTime() + ALERT_DURATION_MS;
}

export function getAlertState(events: TvAlertEvent[], now: number, sessionStart: number): TvAlertState | null {
  const started = events.filter((item) => item.adhan.getTime() <= now);
  const event = started[started.length - 1];
  if (!event || now >= windowEnd(event)) return null;
  const adhan = event.adhan.getTime();
  const iqama = event.iqama?.getTime() ?? null;
  const totalMs = iqama === null ? 0 : Math.max(0, iqama - adhan);

  if (sessionStart < adhan && now < adhan + ALERT_DURATION_MS) {
    return { phase: 'adhan', event, remainingMs: adhan + ALERT_DURATION_MS - now, totalMs, witnessed: true };
  }
  if (iqama === null) return null;
  if (now < iqama) {
    return { phase: 'countdown', event, remainingMs: iqama - now, totalMs, witnessed: sessionStart < adhan };
  }
  return { phase: 'iqama', event, remainingMs: iqama + ALERT_DURATION_MS - now, totalMs, witnessed: sessionStart < iqama };
}
