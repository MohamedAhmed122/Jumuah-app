import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const createInsetStyle = (top: number) => StyleSheet.create({ inset: { paddingTop: top } }).inset;

export const themedStyles = createThemedStyles((colors) => ({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 },
  error: { color: colors.textSecondary, fontSize: 15, textAlign: 'center' },
  button: {
    marginTop: 4, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20,
    backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.border,
  },
  buttonText: { color: colors.textPrimary, fontWeight: '600', fontSize: 14 },
}));
