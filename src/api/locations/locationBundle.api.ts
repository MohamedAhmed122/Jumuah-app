import { readLocationsCache, writeLocationsCache } from '../cache';
import { apiClient } from '../client';
import { LOCATION_CACHE_VERSION, LOCATION_ENDPOINTS } from './locations.constants';
import type {
  CachedLocationBundle,
  HalalPlace,
  LocationBundle,
  Mosque,
} from './locations.types';

export async function fetchLocationBundle(forceRefresh = false): Promise<LocationBundle> {
  if (!forceRefresh) {
    const cached = await readLocationsCache<CachedLocationBundle>();
    if (cached?.version === LOCATION_CACHE_VERSION) return cached.bundle;
  }

  const [mosqueResponse, halalResponse] = await Promise.all([
    apiClient.get<Mosque[]>(LOCATION_ENDPOINTS.mosques),
    apiClient.get<HalalPlace[]>(LOCATION_ENDPOINTS.halal),
  ]);
  const bundle: LocationBundle = {
    halal: halalResponse.data,
    mosques: mosqueResponse.data,
  };

  await writeLocationsCache<CachedLocationBundle>({
    bundle,
    version: LOCATION_CACHE_VERSION,
  });
  return bundle;
}
