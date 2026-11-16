import type { TFunction } from 'i18next';
import { ADHKAR_ITEMS, ADHKAR_ROUNDS } from './TvPrayerScreen.adhkar';
import type { TvAdhkarBreakView, TvAdhkarView, TvPrayingView } from './TvPrayerScreen.adhkar.types';
import { formatMs, toPercent } from './TvPrayerScreen.format';
import type { TvAlertState } from './TvPrayerScreen.types';
import { prayerLabel } from './TvPrayerScreen.view';

function roundLabel(round: number, t: TFunction): string {
  return t('tv.round_of', { round, total: ADHKAR_ROUNDS });
}

export function toPrayingView(alert: TvAlertState, t: TFunction): TvPrayingView {
  return {
    prayerName: prayerLabel(alert.event.name, t),
    countdown: formatMs(alert.remainingMs),
    percentElapsed: toPercent(alert.totalMs - alert.remainingMs, alert.totalMs),
  };
}

export function toAdhkarView(alert: TvAlertState, t: TFunction): TvAdhkarView | null {
  const position = alert.adhkar;
  if (!position || position.index < 0) return null;
  return {
    prayerName: prayerLabel(alert.event.name, t),
    roundLabel: roundLabel(position.round, t),
    item: ADHKAR_ITEMS[position.index],
    index: position.index,
    count: ADHKAR_ITEMS.length,
    progressPercent: toPercent(position.elapsedMs, position.durationMs),
    counter: `${position.index + 1} / ${ADHKAR_ITEMS.length}`,
  };
}

export function toAdhkarBreakView(alert: TvAlertState, t: TFunction): TvAdhkarBreakView | null {
  const position = alert.adhkar;
  if (!position || position.index >= 0) return null;
  return {
    roundLabel: roundLabel(position.round, t),
    secondsLeft: String(Math.max(1, Math.ceil(alert.remainingMs / 1000))),
    remainingMs: alert.remainingMs,
  };
}
