import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  section: { gap: 12 },
  title: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  pill: {
    paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, minWidth: 130,
  },
  label: { color: colors.textSecondary, fontSize: 12 },
  time: { marginTop: 4, color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
}));
