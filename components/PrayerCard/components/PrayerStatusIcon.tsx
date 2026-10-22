import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColors } from '@src/hooks/useTheme';
import type { PrayerStatus } from '../PrayerCard.types';

interface PrayerStatusIconProps {
  status: PrayerStatus;
}

export function PrayerStatusIcon({ status }: PrayerStatusIconProps) {
  const colors = useThemeColors();
  if (status === 'prayed') {
    return <MaterialCommunityIcons name="check-circle" size={22} color={colors.accent} />;
  }
  if (status === 'missed') {
    return <MaterialCommunityIcons name="close-circle" size={22} color={colors.error} />;
  }
  return null;
}
