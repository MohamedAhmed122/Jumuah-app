import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createBarHeight = (prayed: number) => StyleSheet.create({
  height: { height: `${Math.max(4, (prayed / 5) * 100)}%` },
}).height;

export const themedStyles = createThemedStyles((colors) => ({
  chart: { flexDirection: 'row', height: 100, alignItems: 'flex-end', gap: 6 },
  column: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 4 },
  track: {
    width: '80%', flex: 1, backgroundColor: colors.surfaceElevated,
    borderRadius: 4, justifyContent: 'flex-end', overflow: 'hidden',
  },
  fill: { width: '100%', backgroundColor: colors.border, borderRadius: 4 },
  todayFill: { backgroundColor: colors.accent },
  label: { fontSize: 11, color: colors.textSecondary },
  todayLabel: { color: colors.accent, fontWeight: '700' },
  count: { fontSize: 10, color: colors.textSecondary },
}));
