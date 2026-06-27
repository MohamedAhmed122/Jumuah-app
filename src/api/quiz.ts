import { apiClient } from './client';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'aqeedah' | 'fiqh' | 'seerah' | 'quran' | 'hadith';
}

export const fetchDailyQuiz = (deviceId: string) =>
  apiClient.get<QuizQuestion[]>('/quiz/daily', { params: { deviceId } });

export const registerPushToken = (payload: {
  token: string;
  deviceId: string;
  lang: 'en' | 'ru';
}) => apiClient.post('/push/register', payload);
