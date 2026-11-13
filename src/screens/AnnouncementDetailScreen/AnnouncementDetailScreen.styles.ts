import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createScreenStyles = (top: number, bottom: number) => StyleSheet.create({
  container: { paddingTop: top },
  scroll: { paddingBottom: bottom + 32 },
});

export const themedStyles = createThemedStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 12 },
}));
