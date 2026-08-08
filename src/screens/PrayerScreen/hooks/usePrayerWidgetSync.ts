import { useEffect } from 'react';
import type { TFunction } from 'i18next';
import { useSettingsStore } from '@src/stores/settingsStore';
import { updatePrayerWidget } from '@src/widgets/prayerWidget';
import type { ScheduledPrayer } from '../PrayerScreen.types';

export function usePrayerWidgetSync(
  next: ScheduledPrayer | null,
  previous: ScheduledPrayer | null,
  progress: number,
  t: TFunction,
) {
  useEffect(() => {
    if (!next) return;
    void updatePrayerWidget({
      prayerName: next.name,
      prayerLabel: t(`prayer.${next.name}`),
      nextPrayerAt: next.time.toISOString(),
      previousPrayerAt: previous?.time.toISOString() ?? null,
      progress,
      language: useSettingsStore.getState().appLanguage,
    });
  }, [next?.name, next?.time.getTime(), previous?.time.getTime(), t]);
}
