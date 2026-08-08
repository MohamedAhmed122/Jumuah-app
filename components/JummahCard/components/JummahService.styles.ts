import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  label: { color: Colors.textSecondary, fontSize: 10, marginBottom: 4 },
  service: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  time: { color: Colors.accentSoft, fontSize: 18, fontWeight: '700' },
});
