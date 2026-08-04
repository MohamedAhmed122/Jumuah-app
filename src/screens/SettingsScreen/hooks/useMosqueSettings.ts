import { useEffect, useState } from 'react';
import { fetchLocationBundle, type Mosque } from '@src/api/locations';
import { useSettingsStore } from '@src/stores/settingsStore';

export function useMosqueSettings() {
  const preferredMosqueId = useSettingsStore((state) => state.preferredMosqueId);
  const setPreferredMosque = useSettingsStore((state) => state.setPreferredMosque);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadMosques = async (forceRefresh = false) => {
    try {
      const bundle = await fetchLocationBundle(forceRefresh);
      setMosques(bundle.mosques);
      setError(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => { void loadMosques(); }, []);

  const refresh = async () => {
    setRefreshing(true);
    await loadMosques(true);
    setRefreshing(false);
  };

  return { preferredMosqueId, mosques, error, refreshing, selectMosque: setPreferredMosque, refresh };
}
