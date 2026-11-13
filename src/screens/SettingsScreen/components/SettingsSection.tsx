import { Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import type { SettingsSectionProps } from '../SettingsScreen.types';
import { themedStyles } from './SettingsSection.styles';

export function SettingsSection({ label, children }: SettingsSectionProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.body}>{children}</View>
    </View>
  );
}
