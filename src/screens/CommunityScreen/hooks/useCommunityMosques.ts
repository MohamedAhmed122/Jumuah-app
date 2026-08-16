import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchLocationBundle, type Mosque } from '@src/api/locations';
import { useSettingsStore } from '@src/stores/settingsStore';

export function useCommunityMosques() {
  const preferredCity = useSettingsStore((state) => state.preferredHalalCity);
  const preferredMosqueId = useSettingsStore((state) => state.preferredMosqueId);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchLocationBundle()
      .then((bundle) => setMosques(bundle.mosques))
      .catch(() => setMosques([]))
      .finally(() => setLoading(false));
  }, []);

  const preferredMosque = mosques.find((mosque) => mosque.id === preferredMosqueId);
  const city = preferredCity ?? preferredMosque?.city ?? 'Vilnius';
  const normalizedCity = city.trim().toLocaleLowerCase();
  const cityMosques = useMemo(() => {
    if (!normalizedCity) return mosques.slice(0, 20);
    return mosques.filter((mosque) => {
      const mosqueCity = typeof mosque.city === 'string' ? mosque.city.trim().toLocaleLowerCase() : '';
      if (mosqueCity) return mosqueCity === normalizedCity;
      return mosque.address.toLocaleLowerCase().includes(normalizedCity);
    }).slice(0, 20);
  }, [mosques, normalizedCity]);

  useEffect(() => {
    if (!cityMosques.length) return;
    setSelectedIds((current) => {
      const valid = current.filter((id) => cityMosques.some((mosque) => mosque.id === id));
      return valid.length ? valid : cityMosques.map((mosque) => mosque.id);
    });
  }, [cityMosques]);

  const toggleMosque = useCallback((id: string) => {
    setSelectedIds((current) => current.includes(id)
      ? current.length > 1 ? current.filter((item) => item !== id) : current
      : [...current, id].slice(0, 20));
  }, []);

  return { city, cityMosques, selectedIds, toggleMosque, loading };
}
