import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createTopInset = (top: number) => StyleSheet.create({ inset: { paddingTop: top } }).inset;

export const themedStyles = createThemedStyles((colors) => ({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
}));
