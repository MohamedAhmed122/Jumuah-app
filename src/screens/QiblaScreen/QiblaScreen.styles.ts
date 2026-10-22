import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  root: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
  },
}));

export function createSafeAreaStyle(top: number, bottom: number) {
  return StyleSheet.create({ root: { paddingBottom: bottom, paddingTop: top } }).root;
}
