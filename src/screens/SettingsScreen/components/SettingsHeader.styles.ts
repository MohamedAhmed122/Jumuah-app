import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  title: {
    fontSize: 26, fontWeight: '700', color: colors.textPrimary,
    paddingHorizontal: 20, paddingBottom: 16, paddingTop: 8,
  },
}));
