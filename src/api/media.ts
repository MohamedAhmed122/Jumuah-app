import { Platform } from 'react-native';

import { API_BASE_URL } from './client.constants';

const LOOPBACK_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

export function resolveMediaUrl(value: string): string {
  try {
    const url = new URL(value, API_BASE_URL);
    if (Platform.OS === 'android' && LOOPBACK_HOSTS.has(url.hostname)) {
      url.hostname = '10.0.2.2';
    }
    return url.toString();
  } catch {
    return value;
  }
}
