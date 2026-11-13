import axios from 'axios';
import { useSettingsStore } from '@src/stores/settingsStore';
import { API_BASE_URL } from './client.constants';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const lang = useSettingsStore.getState().appLanguage;
  config.params = { ...config.params, lang };
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
