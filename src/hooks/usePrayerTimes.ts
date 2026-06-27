import { useMemo } from 'react';
import { useSettingsStore } from '@src/stores/settingsStore';
import { calculatePrayerTimes } from '@src/prayer/calculator';

export const usePrayerTimes = (date: Date = new Date(), refreshKey = 0) => {
  const { userCoordinates } = useSettingsStore();

  const times = useMemo(
    () =>
      calculatePrayerTimes(date, userCoordinates),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date.toDateString(), userCoordinates, refreshKey]
  );

  return times;
};
