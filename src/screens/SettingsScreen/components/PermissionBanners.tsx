import { PermissionBanner } from '@components/PermissionBanner';
import type { PermissionState } from '../SettingsScreen.types';

export function PermissionBanners({ locationDenied, notificationDenied }: PermissionState) {
  return (
    <>
      {locationDenied && <PermissionBanner type="location" />}
      {notificationDenied && <PermissionBanner type="notification" />}
    </>
  );
}
