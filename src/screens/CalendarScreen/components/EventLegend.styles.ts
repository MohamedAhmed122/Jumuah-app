import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

import { EVENT_COLORS } from '../CalendarScreen.constants';

export const styles = StyleSheet.create({
  item: { alignItems: 'center', flexDirection: 'row', gap: 6 },
  label: { color: Colors.textSecondary, fontSize: 11 },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dot: { borderRadius: 4, height: 8, width: 8 },
});

export const legendDotStyles = StyleSheet.create({
  arafah: { backgroundColor: EVENT_COLORS.arafah },
  ashura: { backgroundColor: EVENT_COLORS.ashura },
  dhul_hijjah: { backgroundColor: EVENT_COLORS.dhul_hijjah },
  eid_adha: { backgroundColor: EVENT_COLORS.eid_adha },
  eid_fitr: { backgroundColor: EVENT_COLORS.eid_fitr },
  ramadan: { backgroundColor: EVENT_COLORS.ramadan },
});
