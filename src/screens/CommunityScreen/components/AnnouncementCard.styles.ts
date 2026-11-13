import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  card: {
    flex: 1, position: 'relative', backgroundColor: colors.surface, borderRadius: 12,
    overflow: 'hidden', borderWidth: 1, borderColor: colors.border,
  },
  pinnedCard: { borderColor: colors.accent + '88' },
  pinRail: {
    position: 'absolute', zIndex: 2, top: 0, bottom: 0,
    left: 0, width: 3, backgroundColor: colors.accent,
  },
  image: { width: '100%', aspectRatio: 4 / 3 },
  placeholder: {
    width: '100%', aspectRatio: 4 / 3, backgroundColor: colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  body: { padding: 10, gap: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  date: { fontSize: 10, color: colors.textSecondary },
  pinnedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.accent,
    paddingHorizontal: 5, paddingVertical: 2, borderRadius: 7,
  },
  pinnedText: { fontSize: 10, fontWeight: '800', color: colors.onAccent, textTransform: 'uppercase' },
  event: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  eventText: { fontSize: 10, color: colors.accent, fontWeight: '600' },
  title: { fontSize: 14, fontWeight: '700', color: colors.textPrimary, lineHeight: 18 },
  description: { fontSize: 11, color: colors.textSecondary, lineHeight: 15 },
  location: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  locationText: { flex: 1, fontSize: 10, color: colors.accentSoft },
}));
