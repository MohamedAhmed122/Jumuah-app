import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  backButton: {
    alignSelf: 'flex-start',
    padding: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 32,
  },
}));
