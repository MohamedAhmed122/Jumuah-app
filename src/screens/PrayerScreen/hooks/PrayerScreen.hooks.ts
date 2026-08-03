import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getActiveJummahTimes } from '@src/prayer/mosqueTimes';
import { toHijri } from '@src/prayer/hijri';
import { useSettingsStore } from '@src/stores/settingsStore';
import { getActivePrayer, getNextPrayer, getPrayerProgress, getPreviousPrayer } from '../PrayerScreen.utils';
import { useMosquePrayerData } from './useMosquePrayerData';
import { usePrayerCountdown } from './usePrayerCountdown';
import { usePrayerLogs } from './usePrayerLogs';
import { usePrayerNotifications } from './usePrayerNotifications';
import { usePrayerWarnings } from './usePrayerWarnings';
import { usePrayerWidgetSync } from './usePrayerWidgetSync';

export function usePrayerScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const settings = useSettingsStore();
  const prayerData = useMosquePrayerData(settings.preferredMosqueId);
  const prayerLogs = usePrayerLogs(prayerData.today);
  const warnings = usePrayerWarnings();
  const [refreshing, setRefreshing] = useState(false);
  const jummahTimes = getActiveJummahTimes(prayerData.mosque, new Date());
  const activePrayer = getActivePrayer(prayerData.times);
  const nextPrayer = getNextPrayer(prayerData.times, jummahTimes);
  const previousPrayer = getPreviousPrayer(prayerData.times, jummahTimes);
  const progress = getPrayerProgress(previousPrayer, nextPrayer);
  const countdown = usePrayerCountdown(nextPrayer, t);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await prayerData.loadPrayerData();
      await prayerLogs.loadLogs();
      if (!cancelled) setRefreshing(false);
    })();
    return () => { cancelled = true; };
  }, [prayerData.refreshNonce, prayerData.loadPrayerData, prayerLogs.loadLogs]);
  usePrayerNotifications(
    prayerData.times, settings.userCoordinates, settings.notificationToggles, settings.kahfReminderEnabled,
  );
  usePrayerWidgetSync(nextPrayer, previousPrayer, progress, t);

  const refresh = useCallback(() => {
    setRefreshing(true);
    prayerData.refresh();
  }, [prayerData.refresh]);
  const gregorianDate = new Date().toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric',
  });

  return {
    t, insets, settings, prayerData, prayerLogs, warnings, refreshing, refresh,
    hijriDate: toHijri(new Date()), gregorianDate, jummahTimes, activePrayer,
    nextPrayer, countdown,
  };
}
