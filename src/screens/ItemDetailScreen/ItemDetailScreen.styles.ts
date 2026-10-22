import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createScreenStyles = (top: number, bottom: number) => StyleSheet.create({
  container: { paddingTop: top },
  content: { paddingBottom: bottom + 28 },
});

export const themedStyles = createThemedStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 18 },
}));
