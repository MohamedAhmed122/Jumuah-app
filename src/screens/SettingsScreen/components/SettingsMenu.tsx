import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { SettingsSection } from './SettingsSection';
import { styles } from './SettingsMenu.styles';

interface Props { onCustomize: () => void; onNotifications: () => void; t: TFunction }

export function SettingsMenu({ onCustomize, onNotifications, t }: Props) {
  return (
    <SettingsSection label={t('settings.preferences')}>
      <MenuItem icon="bell-outline" title={t('settings.notifications')} description={t('settings.notifications_description')} onPress={onNotifications} divider />
      <MenuItem icon="tune-variant" title={t('settings.customize_app')} description={t('settings.customize_app_description')} onPress={onCustomize} />
    </SettingsSection>
  );
}

function MenuItem({ icon, title, description, onPress, divider }: { icon: 'bell-outline' | 'tune-variant'; title: string; description: string; onPress: () => void; divider?: boolean }) {
  return (
    <TouchableOpacity style={[styles.row, divider && styles.divider]} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={22} color={Colors.accent} />
      <View style={styles.copy}><Text style={styles.title}>{title}</Text><Text style={styles.description}>{description}</Text></View>
      <MaterialCommunityIcons name="chevron-right" size={22} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
}
