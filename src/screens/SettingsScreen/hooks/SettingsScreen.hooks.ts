import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMosqueSettings } from './useMosqueSettings';
import { usePermissionStatus } from './usePermissionStatus';
import { useSettingsActions } from './useSettingsActions';

export function useSettingsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const permissions = usePermissionStatus();
  const mosque = useMosqueSettings();
  const actions = useSettingsActions();
  const [modal, setModal] = useState<'notifications' | 'customize' | null>(null);
  return {
    t, insets, permissions, mosque, actions, modal,
    openNotifications: () => setModal('notifications'),
    openCustomize: () => setModal('customize'),
    closeModal: () => setModal(null),
  };
}
import { useState } from 'react';
