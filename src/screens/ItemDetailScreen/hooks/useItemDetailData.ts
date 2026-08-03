import { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { fetchLocationBundle, type HalalPlace, type Mosque } from '@src/api/locations';
import type { ItemDetailRouteParams } from '../ItemDetailScreen.types';
import { findItem, narrowItem } from '../ItemDetailScreen.utils';

export function useItemDetailData() {
  const { type, id } = useLocalSearchParams<ItemDetailRouteParams>();
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [halalPlaces, setHalalPlaces] = useState<HalalPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || !type) return;
    void (async () => {
      try {
        const bundle = await fetchLocationBundle();
        setMosques(bundle.mosques);
        setHalalPlaces(bundle.halal);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, type]);

  const item = useMemo(
    () => id && type ? findItem(type, id, mosques, halalPlaces) : null,
    [id, type, mosques, halalPlaces],
  );
  const narrowed = narrowItem(item, type);
  return { item, type, loading, error, ...narrowed };
}
