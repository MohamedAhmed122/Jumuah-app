import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  cell: { alignItems: 'center', flex: 1, gap: 6 },
  cellDisabled: { opacity: 0.35 },
  dayLabel: { color: colors.textSecondary, fontSize: 13, marginBottom: 10 },
  dayLabelToday: { color: colors.accent, fontWeight: '700' },
  prayerName: { color: colors.textSecondary, fontSize: 11 },
  prayerNameDisabled: { color: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
}));
