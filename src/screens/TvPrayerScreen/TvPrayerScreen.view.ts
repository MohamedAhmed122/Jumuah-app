import type { TFunction } from 'i18next';
import { PRAYER_LABEL_KEYS } from './TvPrayerScreen.constants';
import { formatHms, formatMs, formatTime, toPercent } from './TvPrayerScreen.format';
import { isCardNext, isCardPassed } from './TvPrayerScreen.schedule';
import type {
  TvAlertEvent, TvAlertState, TvAlertView, TvCardView, TvNextView, TvPrayerCard, TvPrayerKey,
} from './TvPrayerScreen.types';

export function prayerLabel(name: TvPrayerKey, t: TFunction): string {
  return t(PRAYER_LABEL_KEYS[name]);
}

export function toCardViews(cards: TvPrayerCard[], next: TvAlertEvent | null, now: Date, t: TFunction): TvCardView[] {
  return cards.map((card) => {
    const isNext = isCardNext(card, next);
    const secondaryLabel = card.secondaryKind === 'iqama'
      ? t('tv.iqama')
      : card.secondaryKind === 'jummah' ? t('prayer.second_jummah') : null;
    return {
      key: card.key,
      name: prayerLabel(card.name, t),
      primaryLabel: t(card.primaryKind === 'time' ? 'tv.time' : 'tv.adhan'),
      primaryTime: formatTime(card.primary),
      secondaryLabel,
      secondaryTime: card.secondary.map(formatTime).join(' · '),
      isNext,
      isPassed: !isNext && isCardPassed(card, now),
    };
  });
}

export function toNextView(next: TvAlertEvent | null, now: Date, t: TFunction): TvNextView {
  if (!next) return { name: '', adhanTime: '', countdown: formatHms(0) };
  return {
    name: prayerLabel(next.name, t),
    adhanTime: formatTime(next.adhan),
    countdown: formatHms(next.adhan.getTime() - now.getTime()),
  };
}

export function toAlertView(alert: TvAlertState, t: TFunction): TvAlertView {
  return {
    name: prayerLabel(alert.event.name, t),
    adhanTime: formatTime(alert.event.adhan),
    iqamaTime: alert.event.iqama ? formatTime(alert.event.iqama) : '',
    countdown: formatMs(alert.remainingMs),
    percentRemaining: toPercent(alert.remainingMs, alert.totalMs),
    remainingMs: alert.remainingMs,
  };
}
