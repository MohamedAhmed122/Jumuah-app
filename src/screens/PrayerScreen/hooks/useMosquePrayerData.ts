import { useCallback, useState } from 'react';
import { format } from 'date-fns';
import { fetchLocationBundle, fetchMosquePrayerTimes, type Mosque } from '@src/api/locations';
import { usePrayerTimes } from '@src/hooks/usePrayerTimes';
import type { PrayerTimes } from '@src/prayer/calculator';
import { calculatePrayerTimes } from '@src/prayer/calculator';
import { applyMosquePrayerTimes, calculateIqamaTimes, type IqamaTimes } from '@src/prayer/mosqueTimes';
import type { PrayerSource } from '../PrayerScreen.types';

export function useMosquePrayerData(preferredMosqueId: string | null) {
  const [refreshNonce, setRefreshNonce] = useState(0);
  const calculatedTimes = usePrayerTimes(new Date(), refreshNonce);
  const [overrideTimes, setOverrideTimes] = useState<PrayerTimes | null>(null);
  const [iqamaTimes, setIqamaTimes] = useState<IqamaTimes>({});
  const [mosque, setMosque] = useState<Mosque | null>(null);
  const [source, setSource] = useState<PrayerSource>('calculated');
  const today = format(new Date(), 'yyyy-MM-dd');

  const loadPrayerData = useCallback(async () => {
    if (!preferredMosqueId) {
      setOverrideTimes(null);
      setIqamaTimes({});
      setMosque(null);
      setSource('calculated');
      return;
    }
    let baseTimes = calculatedTimes;
    let selectedMosque: Mosque | null = null;
    try {
      const bundle = await fetchLocationBundle(refreshNonce > 0);
      selectedMosque = bundle.mosques.find((item) => item.id === preferredMosqueId) ?? null;
      if (selectedMosque) {
        baseTimes = calculatePrayerTimes(new Date(), { lat: selectedMosque.lat, lng: selectedMosque.lng });
      }
    } catch {
      baseTimes = calculatedTimes;
    }
    try {
      const items = await fetchMosquePrayerTimes(preferredMosqueId, today, today);
      const override = items.find((item) => item.date === today);
      const resolved = override ? applyMosquePrayerTimes(baseTimes, new Date(), override.times) : baseTimes;
      applyResolvedData(resolved, selectedMosque, override ? 'mosque' : 'calculated');
    } catch {
      applyResolvedData(baseTimes, selectedMosque, 'calculated');
    }
  }, [preferredMosqueId, today, calculatedTimes, refreshNonce]);

  const applyResolvedData = (times: PrayerTimes, selectedMosque: Mosque | null, nextSource: PrayerSource) => {
    setOverrideTimes(times);
    setIqamaTimes(calculateIqamaTimes(times, selectedMosque));
    setMosque(selectedMosque);
    setSource(nextSource);
  };

  return {
    today, times: overrideTimes ?? calculatedTimes, iqamaTimes, mosque, source,
    loadPrayerData, refresh: () => setRefreshNonce((value) => value + 1), refreshNonce,
  };
}
