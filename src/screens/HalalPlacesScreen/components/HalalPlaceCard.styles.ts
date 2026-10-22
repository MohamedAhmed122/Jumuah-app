import { StyleSheet } from 'react-native';

import type { ThemeColors } from '@constants/Colors';
import { createThemedStyles } from '@src/theme';

export const createOpenStyle = (colors: ThemeColors, open: boolean) => StyleSheet.create({
  color: { color: open ? colors.accent : colors.error },
}).color;

export const themedStyles = createThemedStyles((colors) => ({
  card: {
    minHeight: 132, flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: 16, padding: 11, overflow: 'hidden',
  },
  cardOffer: { borderColor: colors.accent + '88' },
  offerRail: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, backgroundColor: colors.accent },
  image: { width: 92, height: 108, borderRadius: 12, backgroundColor: colors.surfaceElevated },
  imageFallback: {
    width: 92, height: 108, borderRadius: 12, backgroundColor: colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  body: { flex: 1, minWidth: 0, gap: 4 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { flex: 1, color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  discountBadge: { backgroundColor: colors.accent, borderRadius: 7, paddingHorizontal: 6, paddingVertical: 3 },
  discountText: { color: colors.onAccent, fontSize: 9, fontWeight: '800' },
  type: { color: colors.accentSoft, fontSize: 11, fontWeight: '600' },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  address: { flex: 1, color: colors.textSecondary, fontSize: 11 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  distance: { color: colors.textSecondary, fontSize: 10 },
  open: { fontSize: 10, fontWeight: '700' },
  foodMeta: { gap: 1 },
  foodCategories: { color: colors.textPrimary, fontSize: 10 },
  price: { color: colors.accentSoft, fontSize: 10, fontWeight: '600' },
  promo: { color: colors.accent, fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
}));
