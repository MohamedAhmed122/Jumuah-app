import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColors } from '@src/hooks/useTheme';
import { styles } from './PrayerNotificationToggles.styles';

interface PrayerNotificationTogglesProps {
  adhanEnabled: boolean;
  onAdhanToggle: () => void;
  onReminderToggle: () => void;
  reminderEnabled: boolean;
}

export function PrayerNotificationToggles(props: PrayerNotificationTogglesProps) {
  const colors = useThemeColors();
  return (
    <View style={styles.row}>
      <TouchableOpacity hitSlop={8} onPress={props.onAdhanToggle} style={styles.button}>
        <MaterialCommunityIcons
          color={props.adhanEnabled ? colors.iconOn : colors.iconMuted}
          name={props.adhanEnabled ? 'bell' : 'bell-off'}
          size={18}
        />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={8} onPress={props.onReminderToggle} style={styles.button}>
        <MaterialCommunityIcons
          color={props.reminderEnabled ? colors.iconOnSoft : colors.iconMuted}
          name={props.reminderEnabled ? 'clock' : 'clock-outline'}
          size={18}
        />
      </TouchableOpacity>
    </View>
  );
}
