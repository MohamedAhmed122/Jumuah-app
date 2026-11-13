import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  row: {
    alignItems: 'center', flexDirection: 'row', gap: 14,
    minHeight: 58, paddingHorizontal: 16,
  },
  divider: { borderBottomColor: colors.border, borderBottomWidth: 1 },
  copy: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 16, fontWeight: '600' },
  description: { color: colors.textSecondary, fontSize: 12, marginTop: 3 },
}));
