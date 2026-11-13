import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  grid: { gap: 10 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12,
    paddingHorizontal: 14, borderRadius: 12, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
  },
  text: { flex: 1, color: colors.textPrimary, fontSize: 14 },
}));
