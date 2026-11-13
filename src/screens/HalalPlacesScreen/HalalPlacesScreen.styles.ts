import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createContainerStyle = (topInset: number) => StyleSheet.create({
  inset: { paddingTop: topInset },
}).inset;

export const themedStyles = createThemedStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.background },
  resultHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 18, marginBottom: 10,
  },
  resultCount: { color: colors.textSecondary, fontSize: 12 },
  activeFilter: { color: colors.accent, fontSize: 12, fontWeight: '700' },
}));
