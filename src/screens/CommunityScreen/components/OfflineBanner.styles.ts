import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.surfaceElevated,
    paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  text: { fontSize: 12, color: colors.textSecondary },
}));
