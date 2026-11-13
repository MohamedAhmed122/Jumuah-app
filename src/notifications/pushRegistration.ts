import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { registerPushToken } from '@src/api/push';
import { getDeviceId } from '@src/device/deviceIdentity';
import type { AppLanguage } from '@src/i18n/languages';

export async function syncPushRegistration(
  mosqueId: string | null,
  lang: AppLanguage,
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
    return;
  }
}
