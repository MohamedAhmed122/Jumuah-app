import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  date: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  dateText: { color: colors.accent, fontSize: 13, fontWeight: '700' },
  title: { color: colors.textPrimary, fontSize: 27, lineHeight: 34, fontWeight: '800' },
  location: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  locationText: { flex: 1, color: colors.accentSoft, fontSize: 14 },
  endDate: { color: colors.textSecondary, fontSize: 12 },
}));
