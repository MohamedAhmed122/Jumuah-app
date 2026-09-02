import { Platform, StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  activeLabel: {
    color: Colors.accent,
    fontFamily: Platform.select({ android: 'sans-serif', default: undefined }),
    fontSize: 11,
    lineHeight: 14,
  },
  inactiveLabel: {
    color: Colors.textSecondary,
    fontFamily: Platform.select({ android: 'sans-serif', default: undefined }),
    fontSize: 11,
    lineHeight: 14,
  },
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
  },
});
