import { useAppearanceSync } from './useAppearanceSync';
import { useAppHydration } from './useAppHydration';
import { useNotificationNavigation } from './useNotificationNavigation';
import { useNotificationScheduleSync } from './useNotificationScheduleSync';
import { usePushRegistrationSync } from './usePushRegistrationSync';

export function useRootLayout() {
  const hydrated = useAppHydration();
  useAppearanceSync();
  usePushRegistrationSync();
  useNotificationNavigation();
  useNotificationScheduleSync();

  return { hydrated };
}
