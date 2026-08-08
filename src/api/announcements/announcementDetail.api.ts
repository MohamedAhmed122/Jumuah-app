import type { AppLanguage } from '@src/i18n/languages';

import { apiClient } from '../client';
import { ANNOUNCEMENT_ENDPOINTS } from './announcements.constants';
import type { Announcement } from './announcements.types';

export function fetchAnnouncementById(id: string, mosqueId: string, language: AppLanguage) {
  return apiClient.get<Announcement>(ANNOUNCEMENT_ENDPOINTS.detail(id), {
    params: { mosqueId, lang: language },
  });
}
