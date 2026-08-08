import { useEffect } from 'react';
import type { PrayerTimes } from '@src/prayer/calculator';
import { scheduleAlKahfReminder, scheduleDailyNotifications } from '@src/notifications/scheduler';
import type { NotificationToggles } from '@src/stores/settingsStore';

export function usePrayerNotifications(
  times: PrayerTimes,
  coordinates: { lat: number; lng: number },
  toggles: NotificationToggles,
  kahfEnabled: boolean,
) {
  useEffect(() => {
    const schedule = async () => {
      try {
        await scheduleDailyNotifications(new Date(), coordinates, toggles, times);
        await scheduleAlKahfReminder(kahfEnabled);
      } catch {}
    };
    void schedule();
  }, [coordinates, toggles, kahfEnabled, times]);
}
