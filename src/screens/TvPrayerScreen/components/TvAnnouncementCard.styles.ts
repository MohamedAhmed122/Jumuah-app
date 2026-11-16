import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  body: { color: colors.textPrimary, fontSize: 46, lineHeight: 64, maxWidth: 1400 },
  card: {
    backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 40, borderWidth: 2, bottom: 0,
    gap: 32, justifyContent: 'center', left: 0, paddingHorizontal: 96, paddingVertical: 72, position: 'absolute', top: 0, width: 1776,
  },
  detail: {
    alignItems: 'center', borderColor: colors.border, borderRadius: 20, borderWidth: 2,
    flexDirection: 'row', gap: 12, paddingHorizontal: 28, paddingVertical: 14,
  },
  detailDot: { backgroundColor: colors.accent, borderRadius: 6, height: 12, width: 12 },
  detailText: { color: colors.textSecondary, fontSize: 34, fontWeight: '500' },
  details: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 8 },
  tag: {
    alignSelf: 'flex-start', backgroundColor: colors.selectedFill, borderRadius: 24, paddingHorizontal: 26, paddingVertical: 10,
  },
  tagText: { color: colors.accent, fontSize: 28, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  title: { color: colors.textPrimary, fontSize: 96, fontWeight: '900', lineHeight: 104 },
}));
