import { apiClient } from './client';

export interface PushRegistrationPayload {
  token: string;
  deviceId: string;
  lang: 'en' | 'ru';
  mosqueIds: string[];
}

export const registerPushToken = (payload: PushRegistrationPayload) =>
  apiClient.post('/push/register', payload);
