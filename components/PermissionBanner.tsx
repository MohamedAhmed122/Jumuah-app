import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { Colors } from '@constants/Colors';

interface Props {
  type: 'location' | 'notification';
}

export function PermissionBanner({ type }: Props) {
  const { t } = useTranslation();
  const message =
    type === 'location'
      ? t('settings.location_permission_banner')
      : t('settings.notification_permission_banner');

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={() => Linking.openSettings()} style={styles.button}>
        <Text style={styles.buttonText}>{t('settings.open_settings')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    gap: 10,
  },
  message: { color: Colors.textSecondary, fontSize: 14 },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  buttonText: { color: Colors.background, fontWeight: '600', fontSize: 13 },
});
