import { apiClient } from '../client';
import { LOCATION_ENDPOINTS } from './locations.constants';
import type { MosquePrayerTime } from './locations.types';

export async function fetchMosquePrayerTimes(
  mosqueId: string,
  from: string,
  to: string,
): Promise<MosquePrayerTime[]> {
  const response = await apiClient.get<MosquePrayerTime[]>(
    LOCATION_ENDPOINTS.mosquePrayerTimes(mosqueId),
    { params: { from, to } },
  );
  return response.data;
}
