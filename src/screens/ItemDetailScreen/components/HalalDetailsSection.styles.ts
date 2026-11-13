import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  section: { gap: 12 },
  title: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  body: { color: colors.textSecondary, fontSize: 14, lineHeight: 21 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  category: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
    backgroundColor: colors.accent + '22', color: colors.accent,
    fontSize: 12, fontWeight: '700',
  },
  offer: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 14, backgroundColor: colors.accent,
  },
  offerText: { flex: 1 },
  offerTitle: { color: colors.onAccent, fontSize: 16, fontWeight: '800' },
  offerCode: { color: colors.onAccent, fontSize: 12, fontWeight: '600', marginTop: 2 },
  price: {
    flexDirection: 'row', alignItems: 'center', gap: 9, borderWidth: 1,
    borderColor: colors.border, backgroundColor: colors.surface, borderRadius: 12, padding: 12,
  },
  priceValue: { color: colors.accentSoft, fontSize: 13, fontWeight: '700' },
}));
