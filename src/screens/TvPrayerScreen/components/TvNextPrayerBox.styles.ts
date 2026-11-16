import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  box: {
    alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.accent, borderRadius: 32, borderWidth: 3,
    flexDirection: 'row', gap: 32, paddingHorizontal: 40, paddingVertical: 20,
  },
  countdown: { color: colors.textPrimary, fontSize: 64, fontVariant: ['tabular-nums'], fontWeight: '700', lineHeight: 68 },
  divider: { alignSelf: 'stretch', backgroundColor: colors.border, width: 2 },
  label: { color: colors.textSecondary, fontSize: 22, fontWeight: '500', letterSpacing: 2, textTransform: 'uppercase' },
  name: { color: colors.accent, fontSize: 52, fontWeight: '900' },
  row: { alignItems: 'baseline', flexDirection: 'row', gap: 16 },
  stack: { gap: 2 },
  time: { color: colors.textPrimary, fontSize: 36, fontVariant: ['tabular-nums'], fontWeight: '500' },
}));
