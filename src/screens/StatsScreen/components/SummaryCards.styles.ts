import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createProgressStyle = (percentage: number) => StyleSheet.create({
  opacity: { opacity: percentage / 100 },
}).opacity;

export const themedStyles = createThemedStyles((colors) => ({
  row: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  card: {
    flex: 1, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1,
    borderColor: colors.border, alignItems: 'center', paddingVertical: 20, gap: 8,
  },
  ring: {
    width: 90, height: 90, borderRadius: 45, borderWidth: 8, borderColor: colors.accent,
    alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  ringFill: {
    ...StyleSheet.absoluteFillObject, borderRadius: 45, backgroundColor: colors.accentRing,
  },
  percentage: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  label: { fontSize: 12, color: colors.textSecondary },
  streakCard: {
    flex: 1, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1,
    borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 20, gap: 4,
  },
  streak: { fontSize: 42, fontWeight: '700', color: colors.textPrimary },
}));
