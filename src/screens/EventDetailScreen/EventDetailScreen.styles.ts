import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createEventScreenStyles = (top: number, bottom: number) => StyleSheet.create({
  container: { paddingTop: top },
  scroll: { paddingBottom: bottom + 32 },
});

export const themedStyles = createThemedStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 14 },
  divider: { height: 1, backgroundColor: colors.border },
  paragraph: { color: colors.textSecondary, fontSize: 15, lineHeight: 23 },
}));
