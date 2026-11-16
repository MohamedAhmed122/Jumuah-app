import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  again: { color: colors.textPrimary, fontSize: 56, fontWeight: '500', marginTop: 24 },
  countdown: { color: colors.accent, fontSize: 240, fontVariant: ['tabular-nums'], fontWeight: '900', lineHeight: 250 },
  fill: { backgroundColor: colors.accent, height: 16 },
  icon: {
    alignItems: 'center', backgroundColor: colors.accent, borderRadius: 100, height: 200,
    justifyContent: 'center', marginBottom: 12, width: 200,
  },
  round: { color: colors.textSecondary, fontSize: 40, fontWeight: '500' },
  screen: { alignItems: 'center', backgroundColor: colors.background, flex: 1, gap: 20, justifyContent: 'center' },
  title: { color: colors.textPrimary, fontSize: 96, fontWeight: '900', lineHeight: 104 },
  track: { backgroundColor: colors.surface, bottom: 0, height: 16, left: 0, position: 'absolute', right: 0 },
}));
