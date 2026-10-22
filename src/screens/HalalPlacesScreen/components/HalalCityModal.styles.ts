import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  overlay: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#00000099', paddingHorizontal: 20,
  },
  backdrop: StyleSheet.absoluteFillObject,
  modal: {
    width: '100%', maxHeight: '72%', backgroundColor: colors.surface,
    borderRadius: 22, padding: 18, borderWidth: 1, borderColor: colors.border,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { color: colors.textPrimary, fontSize: 22, fontWeight: '800' },
  currentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14,
    borderRadius: 12, backgroundColor: colors.accent + '18', marginBottom: 8,
  },
  currentText: { color: colors.accent, fontWeight: '700' },
  list: { flexGrow: 0 },
  row: {
    minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: 4,
  },
  city: { color: colors.textSecondary, fontSize: 15 },
  cityActive: { color: colors.accent, fontWeight: '700' },
}));
