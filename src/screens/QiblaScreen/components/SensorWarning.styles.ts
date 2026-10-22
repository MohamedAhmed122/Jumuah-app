import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 10,
    marginBottom: 24,
    marginHorizontal: 24,
    padding: 12,
  },
  text: {
    color: colors.error,
    fontSize: 13,
    textAlign: 'center',
  },
}));
