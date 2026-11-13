import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  card: { flex: 1, backgroundColor: colors.surface, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  pinnedCard: { borderColor: colors.accent + '88' },
  image: { width: '100%', aspectRatio: 4 / 3 },
  placeholder: { width: '100%', aspectRatio: 4 / 3, backgroundColor: colors.surfaceElevated, alignItems: 'center', justifyContent: 'center' },
  body: { padding: 10, gap: 6 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  date: { flex: 1, fontSize: 10, color: colors.accent, fontWeight: '700' },
  title: { fontSize: 14, lineHeight: 18, fontWeight: '700', color: colors.textPrimary },
  description: { fontSize: 11, lineHeight: 15, color: colors.textSecondary },
  location: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { flex: 1, fontSize: 10, color: colors.accentSoft },
  attendance: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 2 },
  attendanceText: { fontSize: 10, color: colors.textSecondary, fontWeight: '700' },
}));
