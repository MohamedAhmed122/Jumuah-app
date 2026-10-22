import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  back: { padding: 16 },
  title: {
    fontSize: 22, fontWeight: '700', color: colors.textPrimary,
    paddingHorizontal: 20, marginBottom: 16,
  },
}));
