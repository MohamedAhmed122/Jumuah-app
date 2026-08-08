import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  cell: { alignItems: 'center', flex: 1, gap: 6 },
  cellDisabled: { opacity: 0.35 },
  dayLabel: { color: Colors.textSecondary, fontSize: 13, marginBottom: 10 },
  dayLabelToday: { color: Colors.accent, fontWeight: '700' },
  prayerName: { color: Colors.textSecondary, fontSize: 11 },
  prayerNameDisabled: { color: Colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});
