import type { PrayerName } from '@constants/prayerMethods';
import type { NotificationToggles, NotificationType } from '@src/stores/settingsStore/settingsStore.types';

import { toggleNotification } from '../settingsStore/settingsStore.utils';

export function togglePrayerNotification(
  toggles: NotificationToggles,
  prayer: PrayerName,
  type: NotificationType,
) {
  return toggleNotification(toggles, prayer, type);
}
