import { format } from 'date-fns';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import type { TvAlertEvent, TvDay, TvPrayerCard } from './TvPrayerScreen.types';

function dayKey(day: TvDay): string {
  return format(day.date, 'yyyy-MM-dd');
}

export function buildAlertEvents(day: TvDay): TvAlertEvent[] {
  const key = dayKey(day);
  const events = PRAYER_NAMES.flatMap((prayer): TvAlertEvent[] => {
    if (prayer === 'dhuhr' && day.jummahTimes.length > 0) {
      return day.jummahTimes.map((time, index) => ({
        key: `${key}:jummah:${index}`, name: 'jummah' as const, adhan: time, iqama: null,
      }));
    }
    return [{ key: `${key}:${prayer}`, name: prayer, adhan: day.times[prayer], iqama: day.iqamaTimes[prayer] ?? null }];
  });
  return events.sort((first, second) => first.adhan.getTime() - second.adhan.getTime());
}

export function buildPrayerCards(day: TvDay): TvPrayerCard[] {
  const key = dayKey(day);
  const cards: TvPrayerCard[] = PRAYER_NAMES.map((prayer) => {
    if (prayer === 'dhuhr' && day.jummahTimes.length > 0) {
      const [first, ...later] = day.jummahTimes;
      return {
        key: `${key}:jummah`, name: 'jummah', primary: first, primaryKind: 'adhan',
        secondary: later, secondaryKind: later.length > 0 ? 'jummah' : null,
      };
    }
    const iqama = day.iqamaTimes[prayer];
    return {
      key: `${key}:${prayer}`, name: prayer, primary: day.times[prayer], primaryKind: 'adhan',
      secondary: iqama ? [iqama] : [], secondaryKind: iqama ? 'iqama' : null,
    };
  });
  cards.splice(1, 0, {
    key: `${key}:sunrise`, name: 'sunrise', primary: day.times.sunrise, primaryKind: 'time',
    secondary: [], secondaryKind: null,
  });
  return cards;
}

export function findNextEvent(days: TvDay[], now: Date): TvAlertEvent | null {
  for (const day of days) {
    const next = buildAlertEvents(day).find((event) => event.adhan.getTime() > now.getTime());
    if (next) return next;
  }
  return null;
}

export function isCardNext(card: TvPrayerCard, next: TvAlertEvent | null): boolean {
  if (!next) return false;
  if (card.name === 'jummah') return next.name === 'jummah' && next.key.startsWith(card.key);
  return next.key === card.key;
}

export function isCardPassed(card: TvPrayerCard, now: Date): boolean {
  const last = card.secondaryKind === 'jummah' ? card.secondary[card.secondary.length - 1] : card.primary;
  return last.getTime() <= now.getTime();
}

export function selectCardDay(days: TvDay[], next: TvAlertEvent | null): TvDay {
  const [, today, tomorrow] = days;
  if (next && dayKey(tomorrow) === format(next.adhan, 'yyyy-MM-dd')) return tomorrow;
  return today;
}
