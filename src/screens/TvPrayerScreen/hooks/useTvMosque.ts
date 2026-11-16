import { useCallback, useEffect, useState } from 'react';
import { fetchLocationBundle, type Mosque } from '@src/api/locations';
import { useSettingsStore } from '@src/stores/settingsStore';
import { useRefreshLoop } from './useRefreshLoop';

export function useTvMosque() {
  const preferredMosqueId = useSettingsStore((state) => state.preferredMosqueId);
  const setPreferredMosque = useSettingsStore((state) => state.setPreferredMosque);
  const [mosques, setMosques] = useState<Mosque[]>([]);

  const load = useCallback(async (isActive: () => boolean) => {
    try {
      const bundle = await fetchLocationBundle();
      if (isActive()) setMosques(bundle.mosques);
      return bundle.mosques.length > 0;
    } catch {
      return false;
    }
  }, []);

  useRefreshLoop(load, true);

  useEffect(() => {
    if (preferredMosqueId || mosques.length === 0) return;
    void setPreferredMosque(mosques[0].id);
  }, [preferredMosqueId, mosques, setPreferredMosque]);

  const mosque = mosques.find((item) => item.id === preferredMosqueId) ?? null;
  return { mosques, mosque, mosqueId: preferredMosqueId };
}
