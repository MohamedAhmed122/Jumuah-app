import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createBarHeight = (prayed: number) => StyleSheet.create({
  height: { height: `${Math.max(4, (prayed / 5) * 100)}%` },
}).height;

export const styles = StyleSheet.create({
  chart: { flexDirection: 'row', height: 100, alignItems: 'flex-end', gap: 6 },
  column: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 4 },
  track: {
    width: '80%', flex: 1, backgroundColor: Colors.surfaceElevated,
    borderRadius: 4, justifyContent: 'flex-end', overflow: 'hidden',
  },
  fill: { width: '100%', backgroundColor: Colors.border, borderRadius: 4 },
  todayFill: { backgroundColor: Colors.accent },
  label: { fontSize: 11, color: Colors.textSecondary },
  todayLabel: { color: Colors.accent, fontWeight: '700' },
  count: { fontSize: 10, color: Colors.textSecondary },
});
