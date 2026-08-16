import { apiClient } from '../client';
import { LOCATION_ENDPOINTS } from './locations.constants';

export async function fetchHalalCategories(): Promise<string[]> {
  const response = await apiClient.get<string[]>(LOCATION_ENDPOINTS.halalCategories);
  return Array.isArray(response.data) ? response.data : [];
}
