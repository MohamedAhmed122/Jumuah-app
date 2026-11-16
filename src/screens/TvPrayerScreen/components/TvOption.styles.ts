import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  compact: { alignItems: 'center', borderRadius: 18, justifyContent: 'center', minHeight: 64, paddingHorizontal: 12 },
  fill: { flex: 1 },
  label: { color: colors.textPrimary, flexShrink: 1, fontSize: 26, fontWeight: '500' },
  labelRow: { alignItems: 'baseline', flexDirection: 'row', flexShrink: 1, gap: 14 },
  labelSelected: { color: colors.accent, fontWeight: '700' },
  list: {
    alignItems: 'center', borderRadius: 16, flexDirection: 'row', gap: 16,
    justifyContent: 'space-between', minHeight: 56, paddingHorizontal: 24,
  },
  listLabel: { fontSize: 28 },
  option: { backgroundColor: 'transparent', borderColor: colors.border, borderWidth: 2 },
  selected: { backgroundColor: colors.selectedFill, borderColor: colors.accent },
  sub: { color: colors.textSecondary, flexShrink: 0, fontSize: 22 },
}));
