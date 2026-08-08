import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    paddingVertical: 24,
  },
  label: { color: Colors.textSecondary, fontSize: 14, marginTop: 4 },
  total: { color: Colors.accent, fontSize: 52, fontWeight: '200' },
});
