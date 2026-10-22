import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  pill: {
    alignItems: 'center',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    width: 56,
  },
  pillFocused: { backgroundColor: colors.tabPill },
}));
