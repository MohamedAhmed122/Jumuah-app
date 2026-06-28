import { apiClient } from './client';
import { readLocationsCache, writeLocationsCache } from './cache';

export interface Mosque {
  id: string;
  name: string;
  address: string;
  phone?: string;
  hours?: string;
  image?: string;
  lat: number;
  lng: number;
  jumuahTimes?: { first?: string; second?: string };
  iqamaOffsets?: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
  jummahSchedule?: {
    allFridays: boolean;
    startDate?: string;
    endDate?: string;
    times: string[];
  };
}

export interface MosquePrayerTime {
  id: string;
  mosqueId: string;
  date: string;
  times: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

export interface HalalPlace {
  id: string;
  name: string;
  category: 'restaurant' | 'grocery' | 'fast_food' | 'supermarket_halal';
  address: string;
  phone?: string;
  hours?: string;
  image: string;
  descriptionHtml: string;
  lat: number;
  lng: number;
  city?: string;
}

export interface LocationBundle {
  mosques: Mosque[];
  halal: HalalPlace[];
}

export async function fetchLocationBundle(forceRefresh = false): Promise<LocationBundle> {
  if (!forceRefresh) {
    const cached = await readLocationsCache<LocationBundle>();
    if (cached) return cached;
  }

  const [mRes, hRes] = await Promise.all([
    apiClient.get<Mosque[]>('/locations/mosques'),
    apiClient.get<HalalPlace[]>('/locations/halal'),
  ]);

  const bundle: LocationBundle = { mosques: mRes.data, halal: hRes.data };
  await writeLocationsCache(bundle);
  return bundle;
}

export async function fetchMosquePrayerTimes(
  mosqueId: string,
  from: string,
  to: string
): Promise<MosquePrayerTime[]> {
  const res = await apiClient.get<MosquePrayerTime[]>(`/locations/mosques/${mosqueId}/prayer-times`, {
    params: { from, to },
  });
  return res.data;
}
