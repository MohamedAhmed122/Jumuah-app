import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createRootInset = (top: number) => StyleSheet.create({ inset: { paddingTop: top } }).inset;

export const themedStyles = createThemedStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
}));
