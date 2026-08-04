import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@constants/Colors';

import type { PrayerStatus } from '../PrayerCard.types';

interface PrayerStatusIconProps {
  status: PrayerStatus;
}

export function PrayerStatusIcon({ status }: PrayerStatusIconProps) {
  if (status === 'prayed') {
    return <MaterialCommunityIcons name="check-circle" size={22} color={Colors.accent} />;
  }
  if (status === 'missed') {
    return <MaterialCommunityIcons name="close-circle" size={22} color={Colors.error} />;
  }
  return null;
}
