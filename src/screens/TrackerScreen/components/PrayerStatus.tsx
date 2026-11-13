import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColors } from '@src/hooks/useTheme';
import { PRAYER_STATUS_ICONS } from '../TrackerScreen.constants';
import type { PrayerLogStatus } from '../TrackerScreen.types';

interface PrayerStatusProps {
  locked: boolean;
  status: PrayerLogStatus;
}

export function PrayerStatus({ locked, status }: PrayerStatusProps) {
  const colors = useThemeColors();
  if (locked) {
    return <MaterialCommunityIcons name={PRAYER_STATUS_ICONS.locked} size={20} color={colors.border} />;
  }
  if (status === 'prayed') {
    return <MaterialCommunityIcons name={PRAYER_STATUS_ICONS.prayed} size={22} color={colors.accent} />;
  }
  if (status === 'missed') {
    return <MaterialCommunityIcons name={PRAYER_STATUS_ICONS.missed} size={22} color={colors.error} />;
  }
  return <MaterialCommunityIcons name={PRAYER_STATUS_ICONS.pending} size={22} color={colors.border} />;
}
