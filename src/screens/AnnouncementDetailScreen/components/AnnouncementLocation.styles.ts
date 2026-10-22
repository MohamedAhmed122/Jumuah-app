import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { flex: 1, fontSize: 14, color: colors.accentSoft, lineHeight: 20 },
  endDate: { fontSize: 12, color: colors.textSecondary },
}));
