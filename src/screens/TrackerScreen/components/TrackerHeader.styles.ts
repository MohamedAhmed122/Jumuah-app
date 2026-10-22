import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  backButton: { padding: 16 },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
}));
