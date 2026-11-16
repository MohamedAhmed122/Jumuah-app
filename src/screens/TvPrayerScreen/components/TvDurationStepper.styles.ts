import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  note: { color: colors.textSecondary, flexShrink: 1, fontSize: 24, lineHeight: 31 },
  row: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  step: {
    alignItems: 'center', borderColor: colors.border, borderRadius: 18, borderWidth: 2,
    height: 64, justifyContent: 'center', width: 72,
  },
  stepText: { color: colors.textPrimary, fontSize: 40, fontWeight: '500', lineHeight: 46 },
  value: {
    alignItems: 'center', backgroundColor: colors.selectedFill, borderColor: colors.accent, borderRadius: 18,
    borderWidth: 2, height: 64, justifyContent: 'center', minWidth: 160, paddingHorizontal: 12,
  },
  valueText: { color: colors.accent, fontSize: 34, fontVariant: ['tabular-nums'], fontWeight: '700' },
}));
