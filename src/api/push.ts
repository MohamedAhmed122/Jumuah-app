import { apiClient } from './client';
import type { AppLanguage } from '@src/i18n/languages';

export interface PushRegistrationPayload {
  token: string;
  deviceId: string;
  lang: AppLanguage;
  mosqueIds: string[];
}

export const registerPushToken = (payload: PushRegistrationPayload) =>
  apiClient.post('/push/register', payload);
