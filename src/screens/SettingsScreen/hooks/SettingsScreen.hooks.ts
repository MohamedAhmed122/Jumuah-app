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
  return { t, insets, permissions, mosque, actions };
}
