import type { AppLanguage } from '@src/i18n/languages';
import { apiClient } from '../client';
import { EVENT_ENDPOINTS } from './events.constants';
import type { CommunityEvent, EventAttendanceResult } from './events.types';

export function fetchEvents(mosqueIds: string[], language: AppLanguage, deviceId: string) {
  return apiClient.get<CommunityEvent[]>(EVENT_ENDPOINTS.feed, {
    params: { mosqueIds: mosqueIds.join(','), lang: language, deviceId },
  });
}

export function fetchEventById(id: string, mosqueId: string, language: AppLanguage, deviceId: string) {
  return apiClient.get<CommunityEvent>(EVENT_ENDPOINTS.detail(id), {
    params: { mosqueId, lang: language, deviceId },
  });
}

export function joinEvent(id: string, deviceId: string, language: AppLanguage, mosqueId: string) {
  return apiClient.post<EventAttendanceResult>(EVENT_ENDPOINTS.join(id), { deviceId, lang: language, mosqueId });
}

export function leaveEvent(id: string, deviceId: string) {
  return apiClient.post<EventAttendanceResult>(EVENT_ENDPOINTS.leave(id), { deviceId });
}
