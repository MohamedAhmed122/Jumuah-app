import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createRootInsets = (top: number, bottom: number) => StyleSheet.create({
  insets: { paddingTop: top, paddingBottom: bottom },
}).insets;

export const themedStyles = createThemedStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.background },
  pager: { flex: 1 },
}));
