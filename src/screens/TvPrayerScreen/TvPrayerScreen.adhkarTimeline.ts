import {
  ADHKAR_BREAK_MS, ADHKAR_ITEMS, ADHKAR_ROUND_MS, ADHKAR_ROUNDS, ISHA_PRAYER_DURATION_MS, PRAYER_DURATION_MS,
} from './TvPrayerScreen.adhkar';
import type { TvAdhkarPosition } from './TvPrayerScreen.adhkar.types';
import type { TvAlertEvent } from './TvPrayerScreen.types';

export function getPrayerDurationMs(event: TvAlertEvent): number {
  return event.name === 'isha' ? ISHA_PRAYER_DURATION_MS : PRAYER_DURATION_MS;
}

function positionInRound(offsetMs: number, round: number): TvAdhkarPosition {
  let start = 0;
  for (let index = 0; index < ADHKAR_ITEMS.length; index += 1) {
    const durationMs = ADHKAR_ITEMS[index].durationMs;
    if (offsetMs < start + durationMs) return { round, index, elapsedMs: offsetMs - start, durationMs };
    start += durationMs;
  }
  const last = ADHKAR_ITEMS.length - 1;
  return { round, index: last, elapsedMs: ADHKAR_ITEMS[last].durationMs, durationMs: ADHKAR_ITEMS[last].durationMs };
}

export function getAdhkarPosition(offsetMs: number): TvAdhkarPosition {
  const cycleMs = ADHKAR_ROUND_MS + ADHKAR_BREAK_MS;
  const round = Math.min(Math.floor(offsetMs / cycleMs), ADHKAR_ROUNDS - 1);
  const withinCycle = offsetMs - round * cycleMs;
  if (withinCycle >= ADHKAR_ROUND_MS && round < ADHKAR_ROUNDS - 1) {
    return { round: round + 1, index: -1, elapsedMs: withinCycle - ADHKAR_ROUND_MS, durationMs: ADHKAR_BREAK_MS };
  }
  return positionInRound(withinCycle, round + 1);
}
