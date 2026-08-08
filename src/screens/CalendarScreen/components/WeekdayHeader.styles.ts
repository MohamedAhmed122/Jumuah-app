import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  friday: { color: Colors.accent },
  label: {
    color: Colors.textSecondary,
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  row: { flexDirection: 'row', marginBottom: 6, paddingHorizontal: 10 },
});
