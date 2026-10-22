import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  root: { backgroundColor: colors.background, flex: 1 },
}));

export function createSafeAreaStyle(top: number) {
  return StyleSheet.create({ root: { paddingTop: top } }).root;
}
