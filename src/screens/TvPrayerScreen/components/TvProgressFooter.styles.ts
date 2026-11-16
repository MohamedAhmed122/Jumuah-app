import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  bar: { backgroundColor: colors.accent, borderRadius: 6, height: 12 },
  counter: { color: colors.textSecondary, fontSize: 32, fontVariant: ['tabular-nums'], fontWeight: '700' },
  dot: { backgroundColor: colors.border, borderRadius: 8, height: 16, width: 16 },
  dotActive: { backgroundColor: colors.accent, width: 64 },
  dots: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  footer: { alignItems: 'center', flexDirection: 'row', gap: 32, justifyContent: 'space-between' },
  right: { alignItems: 'center', flexDirection: 'row', gap: 24 },
  track: { backgroundColor: colors.surface, borderRadius: 6, height: 12, overflow: 'hidden', width: 520 },
}));
