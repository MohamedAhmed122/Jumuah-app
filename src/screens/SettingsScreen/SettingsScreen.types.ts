import type { ReactNode } from 'react';

export interface SettingsSectionProps {
  label: string;
  children: ReactNode;
}

export interface PermissionState {
  locationDenied: boolean;
  notificationDenied: boolean;
}
