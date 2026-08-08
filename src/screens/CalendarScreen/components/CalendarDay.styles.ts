import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

import { EVENT_COLORS } from '../CalendarScreen.constants';

export const styles = StyleSheet.create({
  cell: { alignItems: 'center', minHeight: 56, paddingVertical: 4, width: '14.28%' },
  cellRamadan: { backgroundColor: 'rgba(61, 214, 140, 0.06)', borderRadius: 8 },
  dayCircle: { alignItems: 'center', borderRadius: 15, height: 30, justifyContent: 'center', width: 30 },
  dayCircleToday: { backgroundColor: Colors.accent },
  dayNumber: { color: Colors.textPrimary, fontSize: 14, fontWeight: '600' },
  dayNumberToday: { color: Colors.background, fontWeight: '700' },
  eventDot: { borderRadius: 3, height: 5, marginTop: 2, width: 5 },
  hijriNumber: { color: Colors.textSecondary, fontSize: 10, marginTop: 1 },
});

export const eventDotStyles = StyleSheet.create({
  arafah: { backgroundColor: EVENT_COLORS.arafah },
  ashura: { backgroundColor: EVENT_COLORS.ashura },
  dhul_hijjah: { backgroundColor: EVENT_COLORS.dhul_hijjah },
  eid_adha: { backgroundColor: EVENT_COLORS.eid_adha },
  eid_fitr: { backgroundColor: EVENT_COLORS.eid_fitr },
  ramadan: { backgroundColor: EVENT_COLORS.ramadan },
});
