import { StyleSheet } from 'react-native';
import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  arabic: { color: colors.textPrimary, fontWeight: '700', textAlign: 'center', writingDirection: 'rtl' },
  card: {
    alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 40, borderWidth: 2,
    bottom: 0, gap: 28, justifyContent: 'center', left: 0, paddingHorizontal: 88, paddingVertical: 48,
    position: 'absolute', top: 0, width: 1776,
  },
  repeat: { borderColor: colors.accent, borderRadius: 24, borderWidth: 2, paddingHorizontal: 26, paddingVertical: 8 },
  repeatText: { color: colors.accent, fontSize: 26, fontWeight: '700' },
  tag: { backgroundColor: colors.selectedFill, borderRadius: 24, paddingHorizontal: 26, paddingVertical: 10 },
  tagText: { color: colors.accent, fontSize: 26, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  tags: { alignItems: 'center', flexDirection: 'row', gap: 16 },
  translation: { color: colors.textSecondary, maxWidth: 1500, textAlign: 'center' },
}));

export const arabicSizes = StyleSheet.create({
  'as-salam': { fontSize: 76, lineHeight: 122 },
  'ayat-al-kursi': { fontSize: 50, lineHeight: 95 },
  dua: { fontSize: 80, lineHeight: 128 },
  istighfar: { fontSize: 120, lineHeight: 192 },
  tahlil: { fontSize: 58, lineHeight: 93 },
  tasbih: { fontSize: 54, lineHeight: 86 },
});

export const translationSizes = StyleSheet.create({
  'as-salam': { fontSize: 38, lineHeight: 55 },
  'ayat-al-kursi': { fontSize: 30, lineHeight: 42 },
  dua: { fontSize: 38, lineHeight: 55 },
  istighfar: { fontSize: 44, lineHeight: 64 },
  tahlil: { fontSize: 32, lineHeight: 46 },
  tasbih: { fontSize: 30, lineHeight: 42 },
});
