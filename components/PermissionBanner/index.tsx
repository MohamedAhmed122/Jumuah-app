import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useThemedStyles } from '@src/hooks/useTheme';

import { themedStyles } from './PermissionBanner.styles';

interface Props {
  message?: string;
  type: 'location' | 'notification';
}

export function PermissionBanner({ message: customMessage, type }: Props) {
  const styles = useThemedStyles(themedStyles);
  const { t } = useTranslation();
  const message = customMessage
    ?? (type === 'location'
      ? t('settings.location_permission_banner')
      : t('settings.notification_permission_banner'));

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={() => Linking.openSettings()} style={styles.button}>
        <Text style={styles.buttonText}>{t('settings.open_settings')}</Text>
      </TouchableOpacity>
    </View>
  );
}
