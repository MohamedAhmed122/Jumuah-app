import { useEffect, useState } from 'react';
import type { TFunction } from 'i18next';
import { EMPTY_COUNTDOWN } from '../PrayerScreen.constants';
import type { ScheduledPrayer } from '../PrayerScreen.types';
import { formatCountdown } from '../PrayerScreen.utils';

export function usePrayerCountdown(nextPrayer: ScheduledPrayer | null, t: TFunction) {
  const [countdown, setCountdown] = useState(EMPTY_COUNTDOWN);
  useEffect(() => {
    if (!nextPrayer) return;
    const tick = () => {
      setCountdown(formatCountdown(nextPrayer.time) ?? t('prayer.duration_m', { minutes: 0 }));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [nextPrayer?.time.getTime(), t]);
  return countdown;
}
