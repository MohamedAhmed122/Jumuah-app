import { StyleSheet } from 'react-native';

import type { ThemeColors } from '@constants/Colors';
import { createThemedStyles } from '@src/theme';

export const createSheetStyle = (bottomInset: number) => StyleSheet.create({
  inset: { paddingBottom: bottomInset + 18 },
}).inset;

export const createTrackColors = (colors: ThemeColors) => ({ false: colors.border, true: colors.accent + '88' });

export const themedFilterStyles = createThemedStyles((colors) => ({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000088' },
  backdrop: StyleSheet.absoluteFillObject,
  sheet: {
    maxHeight: '88%', backgroundColor: colors.surface, borderTopLeftRadius: 26,
    borderTopRightRadius: 26, paddingHorizontal: 20, paddingTop: 10,
  },
  handle: { width: 42, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: 14 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { color: colors.textPrimary, fontSize: 22, fontWeight: '800' },
  reset: { color: colors.accent, fontSize: 14, fontWeight: '600' },
  sectionTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  sectionHint: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  choiceChip: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 11,
    paddingHorizontal: 13, paddingVertical: 9, backgroundColor: colors.background,
  },
  choiceChipActive: { borderColor: colors.accent, backgroundColor: colors.accent },
  choiceText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  choiceTextActive: { color: colors.onAccent },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 20 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceRange: { color: colors.accent, fontSize: 15, fontWeight: '800' },
  showButton: { backgroundColor: colors.accent, borderRadius: 15, paddingVertical: 15, alignItems: 'center', marginTop: 18 },
  showButtonText: { color: colors.onAccent, fontSize: 15, fontWeight: '800' },
}));
