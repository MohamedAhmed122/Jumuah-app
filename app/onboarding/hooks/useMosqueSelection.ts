import { useState } from 'react';
import { fetchLocationBundle, type Mosque } from '@src/api/locations';
import { useSettingsStore } from '@src/stores/settingsStore';

export function useMosqueSelection() {
  const preferredMosqueId = useSettingsStore((state) => state.preferredMosqueId);
  const setPreferredMosque = useSettingsStore((state) => state.setPreferredMosque);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMosques = async () => {
    try {
      setError(false);
      setLoading(true);
      const bundle = await fetchLocationBundle();
      setMosques(bundle.mosques);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    mosques,
    loading,
    error,
    selectedMosqueId: preferredMosqueId,
    selectMosque: setPreferredMosque,
    loadMosques,
  };
}
