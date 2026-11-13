import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  notice: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  noticeText: { color: colors.error, fontSize: 13 },
  option: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1,
    borderBottomColor: colors.border, gap: 10,
  },
  optionActive: { backgroundColor: colors.accentTint },
  optionText: { flex: 1 },
  optionLabel: { fontSize: 15, color: colors.textSecondary },
  optionLabelActive: { color: colors.textPrimary, fontWeight: '600' },
  optionSub: { fontSize: 11, color: colors.textSecondary, marginTop: 2, opacity: 0.75 },
}));
