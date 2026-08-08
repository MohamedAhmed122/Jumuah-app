import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  section: { gap: 12 },
  title: { color: Colors.textPrimary, fontSize: 16, fontWeight: '700' },
  body: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  category: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
    backgroundColor: Colors.accent + '22', color: Colors.accent,
    fontSize: 12, fontWeight: '700',
  },
  offer: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 14, backgroundColor: Colors.accent,
  },
  offerText: { flex: 1 },
  offerTitle: { color: Colors.background, fontSize: 16, fontWeight: '800' },
  offerCode: { color: Colors.background, fontSize: 12, fontWeight: '600', marginTop: 2 },
  price: {
    flexDirection: 'row', alignItems: 'center', gap: 9, borderWidth: 1,
    borderColor: Colors.border, backgroundColor: Colors.surface, borderRadius: 12, padding: 12,
  },
  priceValue: { color: Colors.accentSoft, fontSize: 13, fontWeight: '700' },
});
