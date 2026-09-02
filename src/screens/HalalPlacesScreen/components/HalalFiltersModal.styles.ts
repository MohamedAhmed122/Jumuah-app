import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createSheetStyle = (bottomInset: number) => StyleSheet.create({
  inset: { paddingBottom: bottomInset + 18 },
}).inset;

export const createTrackColors = () => ({ false: Colors.border, true: Colors.accent + '88' });

export const filterStyles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000088' },
  backdrop: StyleSheet.absoluteFillObject,
  sheet: {
    maxHeight: '88%', backgroundColor: Colors.surface, borderTopLeftRadius: 26,
    borderTopRightRadius: 26, paddingHorizontal: 20, paddingTop: 10,
  },
  handle: { width: 42, height: 4, borderRadius: 2, backgroundColor: Colors.border, alignSelf: 'center', marginBottom: 14 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { color: Colors.textPrimary, fontSize: 22, fontWeight: '800' },
  reset: { color: Colors.accent, fontSize: 14, fontWeight: '600' },
  sectionTitle: { color: Colors.textPrimary, fontSize: 16, fontWeight: '700' },
  sectionHint: { color: Colors.textSecondary, fontSize: 10, marginTop: 2 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  choiceChip: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: 11,
    paddingHorizontal: 13, paddingVertical: 9, backgroundColor: Colors.background,
  },
  choiceChipActive: { borderColor: Colors.accent, backgroundColor: Colors.accent },
  choiceText: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600' },
  choiceTextActive: { color: Colors.background },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 20 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceRange: { color: Colors.accent, fontSize: 15, fontWeight: '800' },
  showButton: { backgroundColor: Colors.accent, borderRadius: 15, paddingVertical: 15, alignItems: 'center', marginTop: 18 },
  showButtonText: { color: Colors.background, fontSize: 15, fontWeight: '800' },
});
