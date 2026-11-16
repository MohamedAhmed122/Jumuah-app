import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  bar: { backgroundColor: colors.accent, borderRadius: 7, height: 14 },
  begins: { color: colors.textSecondary, fontSize: 48, fontVariant: ['tabular-nums'], fontWeight: '500' },
  center: { alignItems: 'center', flexGrow: 1, gap: 20, justifyContent: 'center' },
  icon: {
    alignItems: 'center', backgroundColor: colors.selectedFill, borderRadius: 100, height: 200,
    justifyContent: 'center', marginBottom: 16, width: 200,
  },
  name: { color: colors.accent, fontSize: 140, fontWeight: '900', lineHeight: 148 },
  screen: { backgroundColor: colors.background, flex: 1, paddingBottom: 72, paddingHorizontal: 72, paddingTop: 56 },
  status: { color: colors.textPrimary, fontSize: 80, fontWeight: '700' },
  track: { backgroundColor: colors.surface, borderRadius: 7, height: 14, marginTop: 20, overflow: 'hidden', width: 900 },
}));
