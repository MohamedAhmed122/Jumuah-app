import { useCallback, useEffect, useState } from 'react';
import { fetchHalalCategories, fetchLocationBundle, type HalalPlace } from '@src/api/locations';

export function useHalalPlacesData() {
  const [places, setPlaces] = useState<HalalPlace[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const loadData = useCallback(async (forceRefresh = false) => {
    try {
      setError(false);
      const [bundle, remoteCategories] = await Promise.all([
        fetchLocationBundle(forceRefresh),
        fetchHalalCategories().catch(() => []),
      ]);
      setPlaces(bundle.halal);
      setCategories([...new Set([
        ...remoteCategories,
        ...bundle.halal.flatMap((place) => place.foodCategories ?? []),
      ])].sort((a, b) => a.localeCompare(b)));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { void loadData(); }, [loadData]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    void loadData(true);
  }, [loadData]);

  return { places, categories, loading, refreshing, error, loadData, refresh };
}
