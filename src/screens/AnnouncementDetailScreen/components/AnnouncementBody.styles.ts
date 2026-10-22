import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 4 },
  paragraph: { fontSize: 15, color: colors.textSecondary, lineHeight: 24 },
}));
