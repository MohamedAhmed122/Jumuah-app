import { Platform, StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  activeLabel: {
    color: colors.accent,
    fontFamily: Platform.select({ android: 'sans-serif', default: undefined }),
    fontSize: 11,
    lineHeight: 14,
  },
  inactiveLabel: {
    color: colors.textSecondary,
    fontFamily: Platform.select({ android: 'sans-serif', default: undefined }),
    fontSize: 11,
    lineHeight: 14,
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
}));
