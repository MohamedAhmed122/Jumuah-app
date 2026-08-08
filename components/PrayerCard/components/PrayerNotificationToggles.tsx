import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@constants/Colors';

import { styles } from './PrayerNotificationToggles.styles';

interface PrayerNotificationTogglesProps {
  adhanEnabled: boolean;
  onAdhanToggle: () => void;
  onReminderToggle: () => void;
  reminderEnabled: boolean;
}

export function PrayerNotificationToggles(props: PrayerNotificationTogglesProps) {
  return (
    <View style={styles.row}>
      <TouchableOpacity hitSlop={8} onPress={props.onAdhanToggle} style={styles.button}>
        <MaterialCommunityIcons
          color={props.adhanEnabled ? Colors.accent : Colors.border}
          name={props.adhanEnabled ? 'bell' : 'bell-off'}
          size={18}
        />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={8} onPress={props.onReminderToggle} style={styles.button}>
        <MaterialCommunityIcons
          color={props.reminderEnabled ? Colors.accentSoft : Colors.border}
          name={props.reminderEnabled ? 'clock' : 'clock-outline'}
          size={18}
        />
      </TouchableOpacity>
    </View>
  );
}
