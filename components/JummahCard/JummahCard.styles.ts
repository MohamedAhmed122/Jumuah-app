import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardNext: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.accent,
  },
}));
