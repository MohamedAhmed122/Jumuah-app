import { Text, View } from 'react-native';
import type { SettingsSectionProps } from '../SettingsScreen.types';
import { styles } from './SettingsSection.styles';

export function SettingsSection({ label, children }: SettingsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.body}>{children}</View>
    </View>
  );
}
