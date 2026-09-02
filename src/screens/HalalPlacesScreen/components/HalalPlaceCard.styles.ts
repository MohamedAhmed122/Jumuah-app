import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createOpenStyle = (open: boolean) => StyleSheet.create({
  color: { color: open ? Colors.accent : Colors.error },
}).color;

export const styles = StyleSheet.create({
  card: {
    minHeight: 132, flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    borderRadius: 16, padding: 11, overflow: 'hidden',
  },
  cardOffer: { borderColor: Colors.accent + '88' },
  offerRail: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, backgroundColor: Colors.accent },
  image: { width: 92, height: 108, borderRadius: 12, backgroundColor: Colors.surfaceElevated },
  imageFallback: {
    width: 92, height: 108, borderRadius: 12, backgroundColor: Colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  body: { flex: 1, minWidth: 0, gap: 4 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { flex: 1, color: Colors.textPrimary, fontSize: 15, fontWeight: '700' },
  discountBadge: { backgroundColor: Colors.accent, borderRadius: 7, paddingHorizontal: 6, paddingVertical: 3 },
  discountText: { color: Colors.background, fontSize: 9, fontWeight: '800' },
  type: { color: Colors.accentSoft, fontSize: 11, fontWeight: '600' },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  address: { flex: 1, color: Colors.textSecondary, fontSize: 11 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  distance: { color: Colors.textSecondary, fontSize: 10 },
  open: { fontSize: 10, fontWeight: '700' },
  foodMeta: { gap: 1 },
  foodCategories: { color: Colors.textPrimary, fontSize: 10 },
  price: { color: Colors.accentSoft, fontSize: 10, fontWeight: '600' },
  promo: { color: Colors.accent, fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
});
