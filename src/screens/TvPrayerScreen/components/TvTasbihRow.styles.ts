import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  arabic: { color: colors.textPrimary, fontSize: 80, fontWeight: '700', lineHeight: 108, writingDirection: 'rtl' },
  card: {
    alignItems: 'center', backgroundColor: colors.surfaceElevated, borderColor: colors.border, borderRadius: 28,
    borderWidth: 2, flex: 1, gap: 8, paddingHorizontal: 20, paddingVertical: 28,
  },
  count: { color: colors.accent, fontSize: 52, fontVariant: ['tabular-nums'], fontWeight: '900' },
  divider: { alignSelf: 'stretch', backgroundColor: colors.border, height: 2 },
  row: { alignSelf: 'stretch', flexDirection: 'row', gap: 28 },
  transliteration: { color: colors.textSecondary, fontSize: 34, fontWeight: '500' },
  wrapper: { alignSelf: 'stretch', gap: 28 },
}));
