import { Text, View } from 'react-native';

import type { PrayerStatus } from '../PrayerCard.types';
import { PrayerLogActions } from './PrayerLogActions';
import { PrayerNotificationToggles } from './PrayerNotificationToggles';
import { PrayerStatusIcon } from './PrayerStatusIcon';
import { styles } from './PrayerCardHeader.styles';

interface PrayerCardHeaderProps {
  adhanEnabled: boolean;
  isActive: boolean;
  missedLabel: string;
  onAdhanToggle: () => void;
  onMissed: () => void;
  onPrayed: () => void;
  onReminderToggle: () => void;
  prayerLabel: string;
  prayedLabel: string;
  reminderEnabled: boolean;
  showLogActions: boolean;
  status: PrayerStatus;
}

export function PrayerCardHeader(props: PrayerCardHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.name, props.isActive && styles.nameActive]}>{props.prayerLabel}</Text>
      <View style={styles.right}>
        {props.showLogActions && <PrayerLogActions {...props} />}
        <PrayerStatusIcon status={props.status} />
        <PrayerNotificationToggles {...props} />
      </View>
    </View>
  );
}
