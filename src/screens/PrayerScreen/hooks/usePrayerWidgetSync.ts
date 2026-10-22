import { useEffect } from 'react';
import type { TFunction } from 'i18next';
import { formatHijriNumeric } from '@src/prayer/hijri';
import { useSettingsStore } from '@src/stores/settingsStore';
import { updatePrayerWidget } from '@src/widgets/prayerWidget';
import type { PrayerWidgetDetails, ScheduledPrayer } from '../PrayerScreen.types';

export function usePrayerWidgetSync(
  next: ScheduledPrayer | null,
  previous: ScheduledPrayer | null,
  progress: number,
  schedule: ScheduledPrayer[],
  details: PrayerWidgetDetails,
  t: TFunction,
) {
  const scheduleKey = schedule.map((prayer) => `${prayer.name}@${prayer.time.getTime()}`).join('|');
  const hijriDate = formatHijriNumeric(details.hijriDate);
  const sunriseAt = details.sunrise.toISOString();
  const { mosqueName } = details;
  useEffect(() => {
    if (!next) return;
    void updatePrayerWidget({
      prayerName: next.name,
      prayerLabel: t(`prayer.${next.name}`),
      nextPrayerAt: next.time.toISOString(),
      previousPrayerAt: previous?.time.toISOString() ?? null,
      progress,
      language: useSettingsStore.getState().appLanguage,
      mosqueName,
      sunriseAt,
      hijriDate,
      schedule: schedule.map((prayer) => {
        const label = t(`prayer.${prayer.name}`);
        return {
          at: prayer.time.toISOString(),
          headline: t('widget.next_in', { prayer: label }),
          label,
          name: prayer.name,
        };
      }),
    });
  }, [next?.name, next?.time.getTime(), previous?.time.getTime(), scheduleKey, mosqueName, sunriseAt, hijriDate, t]);
}
