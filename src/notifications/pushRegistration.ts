import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { registerPushToken } from '@src/api/push';

const DEVICE_ID_KEY = 'pushDeviceId';

async function getDeviceId(): Promise<string> {
  const stored = await SecureStore.getItemAsync(DEVICE_ID_KEY);
  if (stored) return stored;

  const generated = `device-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  await SecureStore.setItemAsync(DEVICE_ID_KEY, generated);
  return generated;
}

export async function syncPushRegistration(
  mosqueId: string | null,
  lang: 'en' | 'ru',
): Promise<void> {
  try {
    const permission = await Notifications.getPermissionsAsync();
    if (permission.status !== 'granted') return;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Community announcements',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    const projectId = process.env.EXPO_PUBLIC_EAS_PROJECT_ID
      ?? Constants.easConfig?.projectId
      ?? (Constants.expoConfig?.extra?.eas as { projectId?: string } | undefined)?.projectId;
    const token = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);
    await registerPushToken({
      token: token.data,
      deviceId: await getDeviceId(),
      lang,
      mosqueIds: mosqueId ? [mosqueId] : [],
    });
  } catch {
    // Retry automatically when language or preferred mosque changes.
  }
}
