import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createTopInset = (top: number) => StyleSheet.create({ inset: { paddingTop: top } }).inset;

export const themedStyles = createThemedStyles((colors) => ({
  root: { backgroundColor: colors.background, flex: 1 },
  content: { paddingBottom: 40, paddingHorizontal: 20 },
  footer: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 8 },
}));
