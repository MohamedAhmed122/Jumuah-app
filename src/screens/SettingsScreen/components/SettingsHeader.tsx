import { Text } from 'react-native';
import type { TFunction } from 'i18next';
import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './SettingsHeader.styles';

export function SettingsHeader({ t }: { t: TFunction }) {
  const styles = useThemedStyles(themedStyles);
  return <Text style={styles.title}>{t('settings.title')}</Text>;
}
