import { Text } from 'react-native';
import type { TFunction } from 'i18next';
import { styles } from './SettingsHeader.styles';

export function SettingsHeader({ t }: { t: TFunction }) {
  return <Text style={styles.title}>{t('settings.title')}</Text>;
}
