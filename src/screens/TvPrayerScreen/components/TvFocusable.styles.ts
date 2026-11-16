import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  ring: {
    borderColor: 'transparent',
    borderRadius: 26,
    borderWidth: 4,
    padding: 4,
  },
  ringFocused: {
    borderColor: colors.textPrimary,
  },
  ringPill: {
    borderRadius: 52,
  },
  ringRound: {
    borderRadius: 44,
  },
}));
