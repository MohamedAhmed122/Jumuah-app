import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  date: { fontSize: 13, color: colors.textSecondary },
  event: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.accent + '22',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  eventText: { fontSize: 11, color: colors.accent, fontWeight: '600' },
  pinned: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.accent,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  pinnedText: {
    fontSize: 10, fontWeight: '800', color: colors.onAccent, textTransform: 'uppercase',
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.textPrimary, lineHeight: 32 },
}));
