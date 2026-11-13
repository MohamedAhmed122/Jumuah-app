import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createAgendaInset = (top: number) => StyleSheet.create({ inset: { paddingTop: top } }).inset;

export const themedStyles = createThemedStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.background },
}));
